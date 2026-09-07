// Small, shared rendering functions for the Rainy Days store. These are used across pages: price formatting,
// loading spinners, error messages, and product cards. 

/** Formats a price as a currency string. */
export function formatPrice(value) {
    return `$${(value).toFixed(2)}`;
}

/** 
 * Replaces the contents of a container with a loading spinner.
 * `role="status"` is for screen readers, and `aria-live="polite"` ensures that the spinner is announced politely.
 */
export function showLoading(container, message = "Loading products...") {
    container.innerHTML = `
        <div class="loading-state" role="status" aria-live="polite">
            <span class="spinner" aria-hidden="true"></span>
            <p>${message}</p>
        </div>
    `;
}

/**
 * Replaces the contents of a container with an error message.
 * "Try again" button. `role="alert" makes screen readers announce the error immediately. 
 * Call sites should wire up the `data-retry` button to a retry function.
 */
export function showError(container, message = "An error occurred. Please try again.") {
    container.innerHTML = `
<div class="error-state" role="alert">
<i class= "fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <p>${message}</p>
        <button type="button" class="retry-btn" data-retry>Try again</button>
    </div>
    `;
}

/**
 * Builds a single product card as an <article>, used in every
 * product grid (home page category pages).
 */
export function createProductCard(product, basePath = "") {
    const article = document.createElement("article");
    article.className = "product-card-item";
    
    const priceMarkup = product.onSale
        ? `<span class="sale-price">${formatPrice(product.discountedPrice)}</span>
           <span class="original-price">${formatPrice(product.price)}</span>`
        : `<span class="price">${formatPrice(product.price)}</span>`;

    article.innerHTML = `
        <a href="${basePath}product/index.html?id=${encodeURIComponent(product.id)}" class="product-card-link">
            <div class="product-card-image">
                <img src="${product.image.url}" alt="${product.image.alt || product.title}" loading="lazy">
                ${product.onSale ? '<span class="sale-badge">Sale</span>' : ""}
            </div>
            <h3 class="product-card-title">${product.title}</h3>
            <p class="product-card-price">${priceMarkup}</p>
        </a>
        <button type="button" class="add-to-cart quick-add" data-id="${product.id}" aria-label="Add ${product.title} to cart">
            <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
            Add to Cart
        </button>
    `;

    return article;
}