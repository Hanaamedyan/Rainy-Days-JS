// Client-side shopping cart state, persisted in localStorage so it 
// survives navigation between Home, Product and Checkout pages.

const CART_STORAGE_KEY = "rainyDaysCart";

/** Reads the shopping cart from localStorage.
 * @returns {Array<Object>} An array of cart items, each with a product ID and quantity.
 */
export function getCart() {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error("Error reading cart from localStorage:", error);
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart } }));
    return cart;
}

function findLineIndex(cart, id, size) {
    return cart.findIndex(line => line.id === id && line.size === size);
}

/**
 * Adds a product with size to the cart, merging quantity if the 
 * same product and size already exists.
 */
export function addToCart({id, title, price, discountedPrice, onSale, image, size = "M", quantity = 1 }) {
    const cart = getCart();
    const existingIndex = findLineIndex(cart, id, size);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ id, title, price, discountedPrice, onSale, image, size, quantity });
    }

    return saveCart(cart);
}

/** Removes a product with size from the cart. */
export function removeFromCart(id, size) {
    const cart = getCart().filter((line) => !(line.id === id && line.size === size));
    return saveCart(cart);
}

/** Sets the quantity of a product with size in the cart. */
export function updateQuantity(id, size, quantity) {
    if (quantity <= 0) {
        return removeFromCart(id, size);
    }

    const cart = getCart();
    const index = findLineIndex(cart, id, size);
    if (index === -1) return cart;

    cart[index].quantity = quantity;
    return saveCart(cart);
}

/** Empties the shopping cart, used after checkout. */
export function clearCart() {
    return saveCart([]);
}

/** Total number of items in the cart. */
export function getCartCount() {
    return getCart().reduce((total, line) => total + line.quantity, 0);
}

/** Total price of items in the cart. */
export function getCartTotal() {
    return getCart().reduce((total, line) => {
        const unitPrice = line.onSale ? line.discountedPrice : line.price;
        return total + unitPrice * line.quantity;
    }, 0);
}

