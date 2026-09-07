// Renders a single product on /product/index.html
// All product data (title, price, sizes, colour, description and image)
// comes from the API

import { fetchProductById } from "./api.js";
import { showLoading, showError, formatPrice } from "./ui.js";
import { addToCart } from "./cart.js"

function getProductId() {
    return new URLSearchParams(window.location.search).get("id");
}

async function init() {
    const container = document.querySelector("#product-detail");
    if (!container) return;

    const id = getProductId();
    if (!id) {
        showError(container, "No product was specified. Please go back and choose a product from the shop.");
        const retryBtn = container.querySelector("[data-retry]");
        if (retryBtn) {
            retryBtn.textContent = "Browse Products";
            retryBtn.addEventListener("click", () => {
                window.location.href = "../index.html";
            });
        }
        return;
    }

    showLoading(container, "Loading product...");

    try {
        const product = await fetchProductById(id);
        renderProduct(container, product);
    } catch (error) {
        console.error(error);
        showError(container, error.message || "We couldn't load this product. It may no longe be available.");
        container.querySelector("[data-retry]")?.addEventListener("click", init);
    }
}

function renderProduct(container, product) {
    document.title = `Rainy Days | ${product.title}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute("content", `${product.title} - ${product.description}`.slice(0, 155));
    }

    const genderLabel = product.gender === "Male" ? "Men's" : product.gender === "Female" ? "Women's" : "Unisex";

    const priceMarkup = product.onSale
    ? `<span class="sale-price">${formatPrice(product.discountedPrice)}</span>
       <span class ="original-price">${formatPrice(product.price)}</span>`
    :  `${formatPrice(product.price)}`;

    const sizeMarkup = product.sizes
    .map(
        (size) => `
        <label>
         <input type="radio" name="size" value="${size}">
         <span>${size}</span>
         </label>`
    )
    .join("");

    container.innerHTML = `
     <div class="image-box">
      <img src="${product.image.url}" alt="${product.image.alt || product.title}" class="image-product">
     </div>

    <div class="product-information">
      <p class="category">${genderLabel} Rain Jacket</p>
      <h1 class="title">${product.title}</h1>
      <h2 class="price">${priceMarkup}</h2>

     <p class="product-description">${product.description}</p>

     <h2 class="key-features-header">Product Details</h2>
      <ul class="key-features">
       <li><i class="fa-solid fa-check" aria-hidden="true"></i>Color: ${product.baseColor}</li>
       <li><i class="fa-solid fa-check" aria-hidden="true"></i>Gender: ${genderLabel}</li>
       <li><i class="fa-solid fa-check" aria-hidden="true"></i>Available Sizes: ${product.sizes.join(", ")}</li>
       <li><i class="fa-solid fa-check" aria-hidden="true"></i>${product.onSale ? "Currently on sale" : "Full price item"}</li>
      </ul>

     <form class="add-to-cart-form">
      <fieldset class="size-selector">
       <legend class="size-header">Select Size</legend>
       ${sizeMarkup}
      </fieldset>

     <p class="form-error" role="alert" hidden></p>

      <button type="submit" class="add-to-cart">
       <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
       Add to Cart
      </button>
     </form>
    </div>
 `;

 const form = container.querySelector(".add-to-cart-form");
 const errorEl = form.querySelector(".form-error");

 form.addEventListener("submit", (event) => {
    event.preventDefault();

    const size = new FormData(form).get("size");

    if (!size) {
        errorEl.textContent = "Please select a size before adding this item to your cart.";
        errorEl.hidden = false;
        return;
    }

    errorEl.hidden = true;

    addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discountedPrice: product.discountedPrice,
        onSale: product.onSale,
        image: product.image,
        size,
        quantity: 1,
    });

    const submitBtn = form.querySelector(".add-to-cart");
    const originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = "Added to Cart ✓";
    setTimeout(() => {
        submitBtn.innerHTML = originalLabel;
        submitBtn.disabled = false;
    }, 1500);
 });
}

document.addEventListener("DOMContentLoaded", init);
