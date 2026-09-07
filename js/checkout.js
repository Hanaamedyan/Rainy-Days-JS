//This renders the editable cart + order summary on /checkout/index.html and
// handles the simulated checkout form.

import { getCart, removeFromCart, updateQuantity, getCartTotal, clearCart } from "./cart.js";
import { formatPrice } from "./ui.js";

const SHIPPING_COST = 0; 

function renderCheckout () {
    const cart = getCart();
    const emptyState = document.querySelector("#empty-cart-state");
    const checkoutContent = document.querySelector("#checkout-content");

    if (cart.length === 0) {
        emptyState.hidden = false;
        checkoutContent.hidden = true;
        return;
    }

    emptyState.hidden = true;
    checkoutContent.hidden = false;

    renderCartItems(cart);
    renderOrderSummary(cart);
}

function renderCartItems(cart) {
    const list = document.querySelector("#cart-items");
    list.innerHTML = "";

    cart.forEach((line) => {
        const unitPrice = line.onSale ? line.discountedPrice : line.price;
        const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="cart-product">
        <img src="${line.image.url}" alt="${line.image.alt || line.title }" class="cart-image">

        <div class="cart-info">
           <h3 class="item-name">${line.title}</h3>
           <p class="item-size">Size: ${line.size}</p>
           <p class="item-price">${formatPrice(unitPrice)}</p>

           <div class="quantity">
            <button type="button" class="quantity-btn" data-action="decrease" aria-label="Decrease quantity of ${line.title}, size ${line.size}">-</button>
            <span class="quantity-number">${line.quantity}</span>
            <button type="button" class="quantity-btn" data-action="increase"  aria-label="Increase quantity of ${line.title}, size ${line.size}">+</button>
           </div>
          </div>

          <button type="button" class="remove-btn" data-action="remove" aria-label="Remove ${line.title}, size ${line.size} from cart">
           <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
          </button>
        </div>
    `;

    listItem.querySelector('[data-action="decrease"]').addEventListener("click", () => {
        updateQuantity(line.id, line.size, line.quantity - 1);
    });

    listItem.querySelector('[data-action="increase"]').addEventListener("click", () => {
        updateQuantity(line.id, line.size, line.quantity + 1);
    });

    listItem.querySelector('[data-action="remove"]').addEventListener("click", () => {
        removeFromCart(line.id, line.size);
    });

    list.appendChild(listItem);
  });
}

function renderOrderSummary(cart) {
    const subtotal = getCartTotal();
    const total = subtotal + SHIPPING_COST;

    document.querySelector("#summary-subtotal").textContent = formatPrice(subtotal);
    document.querySelector("#summary-total").textContent = formatPrice(total);

    const summaryItems = document.querySelector("#summary-items");
    summaryItems.innerHTML = cart
     .map((line) => {
        const unitPrice = line.onSale ? line.discountedPrice : line.price;
        return `
          <div class="summary-top">
            <img src="${line.image.url}" alt="${line.image.alt || line.title}" class="checkout-cart-image">
            <div class="summary-text">
              <div class="summary-item"><span>${line.title}</span></div>
              <div class="summary-item-size"><span>Size: ${line.size} | Qty: ${line.quantity}</span></div>
              <div class="summary-price"><span>${formatPrice(unitPrice * line.quantity)}</span></div>
            </div>
          </div>
        `;
      })
      .join("");
}

function initCheckoutForm() {
    const form = document.querySelector("#checkout-form");
    const formError = document.querySelector("#checkout-form-error");

    form.addEventListener("submit", (event) => { 
        event.preventDefault();

        if (!form.checkValidity()) {
            formError.textContent = "Please fill in all required fields before completing your purchase.";
            formError.hidden = false;
            form.reportValidity();
            return;
        }

        const cart = getCart();

        if (cart.length === 0) {
            formError.textContent = "Your cart is empty. Add an item before checking out.";
            formError.hidden = false;
            return;
        }

        formError.hidden = true;

        const order = {
            orderNumber: Math.floor(100000 + Math.random() * 900000),
            items: cart,
            total: getCartTotal(),
            placedAt: new Date().toISOString(),
        };

        try {
            sessionStorage.setItem("rainyDaysLastOrder", JSON.stringify(order));
        } catch (error) {
            console.error("Could not save order details:", error);
        }

        clearCart();
        window.location.href = "confirmation/index.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCheckout();
    initCheckoutForm();
});

document.addEventListener("cart:updated", renderCheckout);