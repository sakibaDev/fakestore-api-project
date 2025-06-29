const loadAllProduct = () => {

    fetch('https://fakestoreapi.com/products')
     .then(response => response.json())
     .then(data => {
        displayProduct(data)
    });
}
const displayProduct = (products) => {
    const productContainer = document.getElementById("product-container");
    
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img class="card-img" src="${product.image}">
            <h5>${product.title}</h5>
            <h3>price: ${product.price}</h3>
            <button>Description</button>
            <button class="add-to-cart">Add To Cart</button>
        `;

        // Append to container first
        productContainer.appendChild(div);

        // Add event listener to the newly created button
        const addToCartBtn = div.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => handleAddToCart(product));
    });
};

let total=0;

const handleAddToCart = (product) => {
    showMessage("Added to cart successfully!");
    // Add cart logic here if needed
    const container = document.getElementById("cart-container")

    const div = document.createElement("div")
    div.innerHTML = `
            <img class="card-img" src=${product.image}>
            <h5>${product.title}</h5>
            <h3>price: ${product.price}</h3>
    `
    container.appendChild(div)

    total+=product.price;
    updateTotalPrice();

};

const updateTotalPrice = () => {
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
};

const showMessage = (text) => {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = text;
    messageDiv.classList.remove("hidden");

    setTimeout(() => {
        messageDiv.classList.add("hidden");
    }, 1000); // Hide after 2 seconds
};

const toggleCart = () => {
    const cart = document.getElementById("cart-container");
    const products = document.getElementById("product-container");

    const isCartVisible = !cart.classList.contains("hidden");

    if (isCartVisible) {
        // Hide cart, show products
        cart.classList.add("hidden");
        products.classList.remove("hidden");
    } else {
        // Show cart, hide products
        cart.classList.remove("hidden");
        products.classList.add("hidden");
    }
};


loadAllProduct(); // Already at bottom

// Add event listener for Home button
document.getElementById("home-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("product-container").classList.remove("hidden");
  document.getElementById("cart-container").classList.add("hidden");
});

// Add event listener for Cart button
document.getElementById("cart-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("product-container").classList.add("hidden");
  document.getElementById("cart-container").classList.remove("hidden");
});

