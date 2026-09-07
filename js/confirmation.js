// This reads the simualted order that checkout.js stored in sessionStorage and displays it.
// When the user lands here directly, the page will show a graceful fallback instead of breaking.

function formatPrice(value) {
    return `$${Number(value).toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const fallback = document.querySelector("#no-order-state");
    const details = document.querySelector("#order-details");
    const raw = sessionStorage.getItem("rainyDaysLastOrder");

    if (!raw) {
        fallback.hidden = false;
        details.hidden = true;
        return;
    }

    try {
        const order = JSON.parse(raw);
        const itemCount = order.items.reduce((sum, line) => sum + line.quantity, 0);

        document.querySelector("#order-number").textContent = `#${order.orderNumber}`;
        document.querySelector("#order-total").textContent = formatPrice(order.total);
        document.querySelector("#order-item-count").textContent = itemCount;

        fallback.hidden = true;
        details.hidden = false;
    } catch (error) {
        console.error("Could not read order details:", error);
        fallback.hidden = false;
        details.hidden = true;
    }
});