// Renders a list of products in a grid, used on the home page and category pages.
// quick add-to-cart. Configured per page via initProductList({ containerSelector, basePath, filterFn }).

import { fetchProducts } from "./api.js";
import { showLoading, showError, createProductCard } from "./ui.js";
import { addToCart } from "./cart.js";

const PAGE_SIZE = 6;

/**
 * @param {Object} options
 * @param {string} options.gridSelector - CSS selector for the container where product cards will be rendered.
 * @param {string} options.basePath - Base path for product links (e.g., "" for home page, "../" for category pages).
 * @param {string} [options.filterFormSelector] - CSS selector for the filter form. 
 * @param {string} [options.countSelector] - CSS selector for the "showing X of Y products" count element.
 * @param {string} [options.loadMoreSelector] - CSS selector for the "Load more" button.
 * @param {"Male"|"Female"|null} [options.presetGender] - Locks the grid to one gender.
 * @param {string} [options.BasePath] - Relative path prefix to product/index.html
 */
export async function initProductList({
    gridSelector,
    filterFormSelector = null,
    countSelector = null,
    loadMoreSelector = null,
    presetGender = null,
    basePath = "",
}) {
    const grid = document.querySelector(gridSelector);
    if (!grid) return;

    const filterForm = filterFormSelector ? document.querySelector(filterFormSelector) : null;
    const countLabel = countSelector ? document.querySelector(countSelector) : null;
    const loadMoreBtn = loadMoreSelector ? document.querySelector(loadMoreSelector) : null;

    let allProducts = [];
    let filteredProducts = [];
    let visibleCount = PAGE_SIZE;

    async function loadProducts () {
        showLoading(grid, "Loading products...");
        if (loadMoreBtn) loadMoreBtn.hidden = true;

        try {
            allProducts = await fetchProducts();
            applyFilters();
        } catch (error) {
            console.error(error);
            showError(
                grid,
                error.message || "We could not load our products right now. Please check your connection and try again."
            );
            grid.querySelector("[data-retry]")?.addEventListener("click", loadProducts);
    }
}

function applyFilters() {
    const formData = filterForm ? new FormData(filterForm) : null;
    const gender = presetGender || formData?.get("gender") || "";
    const sort = formData?.get("sort") || "";
    const onSaleOnly = formData?.get("onSale") == "on";

    filteredProducts = allProducts.filter((product) => {
        const matchesGender = !gender || product.gender === gender;
        const matchesSale = !onSaleOnly || product.onSale;
        return matchesGender && matchesSale;
    });

    if (sort === "price-asc") {
        filteredProducts.sort(
            (a, b) => (a.onSale ? a.discountedPrice : a.price) - (b.onSale ? b.discountedPrice : b.price)
        );
    } else if (sort === "price-desc") {
        filteredProducts.sort(
            (a, b) => (b.onSale ? b.discountedPrice : b.price) - (a.onSale ? a.discountedPrice : a.price)
        );
    }

    visibleCount = PAGE_SIZE;
    renderGrid();
}

function renderGrid() {
    grid.innerHTML = "";

    if(filteredProducts.length === 0) {
        grid.innerHTML = `<p class="no-results">No products match your filters. Try adjusting them.</p>`;
        if (loadMoreBtn) loadMoreBtn.hidden = true;
        if (countLabel) countLabel.textContent = "0 items";
        return;
    }

    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const fragment = document.createDocumentFragment();
    visibleProducts.forEach((product) => fragment.appendChild(createProductCard(product, basePath)));
    grid.appendChild(fragment);

    if (countLabel) {
        countLabel.textContent = `Showing ${visibleProducts.length}/${filteredProducts.length} items`;
    }

    if (loadMoreBtn) {
        loadMoreBtn.hidden = visibleCount >= filteredProducts.length;
    }
}

grid.addEventListener("click", (event) => {
const button = event.target.closest(".quick-add");
if (!button) return;

const product = allProducts.find((P) => P.id === button.dataset.id);
if (!product) return;

addToCart ({
id: product.id,
title: product.title,
price: product.price,
discountedPrice: product.discountedPrice,
onSale: product.onSale,
image: product.image,
size: "M",
quantity: 1,  
});

const originalLabel = button.innerHTML;
button.textContent = "Added ✓";
button.disabled = true;
setTimeout(() => {
    button.innerHTML = originalLabel;
    button.disabled = false;
}, 1500);
});

filterForm?.addEventListener("change", applyFilters);
loadMoreBtn?.addEventListener("click", () => {
    visibleCount += PAGE_SIZE;
    renderGrid();
});

await loadProducts();
}

/**
 * Renders "Customer Favorites" carousel from products where
 * favorite == true in the API response
 */
export async function initFavoritesCarousel({carouselSelector, prevSelector = null, nextSelector = null, basePath = "" }) {
    const carousel = document.querySelector(carouselSelector);
    if(!carousel) return;

    const prevBtn = prevSelector ? document.querySelector(prevSelector) : null;
    const nextBtn = nextSelector ? document.querySelector(nextSelector) : null;

    function scrollStep() {
        const firstItem = carousel.querySelector("li");
        return firstItem ? firstItem.getBoundingClientRect().width + 32 : 300;
    }

    prevBtn?.addEventListener("click", () => {
        carousel.scrollBy({ left: -scrollStep(), behavior: "smooth" });
    });

     nextBtn?.addEventListener("click", () => {
        carousel.scrollBy({ left: scrollStep(), behavior: "smooth" });
    });

    try {
        const products = await fetchProducts();
        const favorites = products.filter((product) => product.favorite);

        carousel.innerHTML = "";

        if (favorites.length === 0) {
            carousel.closest("section").hidden = true;
            return;
        }

        favorites.forEach((product) => {
            const li = document.createElement("li");
            const priceText = product.onSale
            ? `${product.title} - on sale, ${(product.discountedPrice). toFixed(2)} USD`
            : `${product.title} - ${(product.price).toFixed(2)} USD`;

            const shortDescription = 
                product.description.length > 70 
                ? `${product.description.slice(0, 70)}...`
                : product.description;

            li.innerHTML = `
            <a href="${basePath}product/index.html?id=${encodeURIComponent(product.id)}" class="item">
            <img src="${product.image.url}" alt="${priceText}" loading="lazy">
            <span class="item-title">${product.title}</span>
            <span class="item-description">${shortDescription}</span>
            </a>
        `;
        carousel.appendChild(li);
        });
    } catch (error) {
        console.error("Could not load favorites carousel:", error);
        carousel.closest("section").hidden = true;
    }
}

