// MOBILE NAV
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
  navbarMenu.classList.toggle('is-active');
});

// TABS
const tabs = document.querySelectorAll('.tabs li');
const tabContentBoxes = document.querySelectorAll('#tab-content > div');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('is-active'));
    tabs.forEach(item => item.classList.remove('has-text-weight-bold'));
    tab.classList.add('is-active');
    tab.classList.add('has-text-weight-bold');

    const target = tab.dataset.target;
    tabContentBoxes.forEach(box => {
      if (box.getAttribute('id') === target) {
        box.classList.remove('is-hidden');
      } else {
        box.classList.add('is-hidden');
      }
    });
  });
});

// MODAL
const signupButton = document.querySelector('#signup');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal-close');

signupButton.addEventListener('click', () => {
  modal.classList.add('is-active');
});

modalBg.addEventListener('click', () => {
  modal.classList.remove('is-active');
});

modalCloseBtn.addEventListener('click', () => {
  modal.classList.remove('is-active');
});

// Create a variable to keep track of the cart count and cart items
let cartCount = 0;
const cartItems = [];

// Function to update the cart count and cart bar
function updateCart() {
  // Update the shopping cart link text and toggle the cart dropdown
  const shoppingCartBar = document.querySelector('#shoppingCartBar');
  if (cartCount > 0) {
    shoppingCartBarText.textContent = `Shopping Cart (${cartCount})`;
    shoppingCartBar.classList.remove('is-hidden'); // Show the cart bar
    shoppingCartLink.remove('is-hidden');
  } else {
    shoppingCartBar.classList.add('is-hidden'); // Hide the cart bar
  }

  // Update the cart dropdown content with product cards
  const cartDropdown = document.querySelector('#cartDropdown');
  cartDropdown.innerHTML = ''; // Clear previous content
  cartItems.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('cart-item');
    card.innerHTML = `
      <img src="${item.image}" alt="Product">
      <div>
        <p>${item.quantity} x £${item.price.toFixed(2)}</p>
        <p>Total: £${(item.quantity * item.price).toFixed(2)}</p>
      </div>
    `;
    cartDropdown.appendChild(card);
  });
}

// Function to find a cart item by product image
function findCartItemByImage(imageSrc) {
  return cartItems.find((item) => item.image === imageSrc);
}

// PRODUCT QUANTITY AND ADD TO CART
const quantitySelect = document.querySelector('#quantitySelect');
const addToCartButton = document.querySelector('#addToCartButton');
const shoppingCartLink = document.querySelector('.navbar-item.has-text-link');
const shoppingCartBar = document.querySelector('#shoppingCartBar'); // Get the shopping cart bar

addToCartButton.addEventListener('click', () => {
  const quantity = parseInt(quantitySelect.value);
  const price = 47.91; // The price of the product

  // Check if the same product is already in the cart
  const existingItem = findCartItemByImage('assets/product.png'); // Replace with the actual image path

  if (existingItem) {
    // If the product already exists in the cart, update its quantity and total price
    existingItem.quantity += quantity;
  } else {
    // If it's a new product, create a cart item object
    const cartItem = {
      image: 'assets/product.png', // Replace with the actual image path
      quantity: quantity,
      price: price,
    };

    // Add the cart item to the cartItems array
    cartItems.push(cartItem);
  }

  // Update the cart count and cart bar
  cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Update the cart count based on all items
  updateCart();

  // Show the shopping cart bar
  shoppingCartBar.classList.remove('is-hidden');
});

// Handle cart dropdown opening and closing
shoppingCartLink.addEventListener('click', () => {
  if (cartCount > 0) {
    cartDropdown.classList.toggle('is-active');
  }
});

document.addEventListener('click', (event) => {
  if (cartCount > 0 && !cartDropdown.contains(event.target) && !shoppingCartLink.contains(event.target)) {
    cartDropdown.classList.remove('is-active');
  }
});

// Initialize the cart count and cart bar
updateCart();
