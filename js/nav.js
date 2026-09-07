// Shared navigation menu code for store. This is used on every page, and is responsible for the mobile menu toggle and cart icon updates.
// live cart-count badge, and marking the current page in the navigation menu.

import { getCartCount } from "./cart.js";

function updateCartBadge() {
    const count= getCartCount();
    document.querySelectorAll ("[data-cart-count]").forEach((badge) => {
        badge.textContent = String(count);
        badge.classList.toggle("is-empty", count === 0);
    });                                         
}

function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#primary-navigation");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu when a link is clicked (for single-page navigation)
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });

    // Close the mobile menu when the Escape key is pressed
    menu.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.focus();
        }
    });
}

function markActiveLink() {
    const links = document.querySelectorAll("#primary-navigation a");
    const normalize = (pathname) => pathname.replace(/index\.html$/, "");
    const currentPath = normalize(window.location.pathname);

    links.forEach((link) => {
        const linkPath = normalize(new URL(link.getAttribute("href"), window.location.href).pathname);
        if (linkPath === currentPath) {
            link.setAttribute("aria-current", "page");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    initMobileMenu();
    markActiveLink();
});

document.addEventListener("cart:updated", updateCartBadge);

