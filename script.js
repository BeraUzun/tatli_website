let cart = [];

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", event => {
        const product = event.target.closest(".product");
        const id = product.getAttribute("data-id");
        const name = product.getAttribute("data-name");
        const price = parseFloat(product.getAttribute("data-price"));

        let item = cart.find(p => p.id === id);
        if (item) {
            item.qty++;
        } else {
            cart.push({ id, name, price, qty: 1 });
        }
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    cartItems.innerHTML = "";
    
    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Your added items will appear here</p>`;
    } else {
        cart.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `${item.name} (${item.qty}) <button onclick="removeFromCart('${item.id}')">❌</button>`;
            cartItems.appendChild(div);
        });
    }

    cartCount.innerText = cart.length;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

document.getElementById("confirm-order").addEventListener("click", () => {
    document.getElementById("order-modal").style.display = "block";
});

document.getElementById("new-order").addEventListener("click", () => {
    cart = [];
    updateCart();
    document.getElementById("order-modal").style.display = "none";
});
