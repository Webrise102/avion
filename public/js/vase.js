const decreaseAmount = document.getElementById("productMinus");
const increaseAmount = document.getElementById("productPlus");
const productAmount = document.getElementById("productAmount");
const productTitle = document.querySelector(".product_title").innerHTML;
const addToCart = document.querySelector(".product_add");
const cartInner = document.querySelector(".modal-body");
const productPrice = document.querySelector(".product_price").innerHTML
window.onload = productAmount.innerHTML = `1`
let cartData = localStorage.getItem("cart");
if (cartData) {
  cartData = JSON.parse(cartData);
} else {
  cartData = [];
}
const existingItemIndex2 = cartData.findIndex(item => item.productTitle === productTitle);
if (existingItemIndex2 !== -1) {
addToCart.innerHTML = `Added`
addToCart.disabled = true
}
function updateCartData() {

  const existingItemIndex = cartData.findIndex(item => item.productTitle === productTitle);

  if (existingItemIndex !== -1) {
    // If the product is already in the cart, remove it before updating
    cartData.splice(existingItemIndex, 1);
  }

  // Add the updated product to the cart
  cartData.push({
    productTitle: productTitle,
    productAmount: parseInt(productAmount.innerHTML),
    productPrice: productPrice
  });
addToCart.innerHTML = `Added`
addToCart.disabled = true
  // Save the updated cartData back to localStorage
  localStorage.setItem("cart", JSON.stringify(cartData));
  location.reload()
}

// Initialize productAmount from localStorage
const existingItemIndex = cartData.findIndex(item => item.productTitle === productTitle);
if (existingItemIndex !== -1) {
  productAmount.innerHTML = cartData[existingItemIndex].productAmount;
}

decreaseAmount.addEventListener("click", function () {
  if (productAmount.innerHTML > 1) {
    productAmount.innerHTML--;
    updateCartData();
  }
});

increaseAmount.addEventListener("click", function () {
  productAmount.innerHTML++;
  updateCartData();
});

addToCart.addEventListener("click", function () {
  updateCartData();
  // You can also update the UI here to indicate that the product was added to the cart
  addToCart.innerHTML = `Added`;
  addToCart.disabled = true;
});



cartInner.innerHTML = ``;

function updateCart() {
  // Clear the cartInner
  cartInner.innerHTML = ``;

  // Update the localStorage with the modified cartData
  localStorage.setItem("cart", JSON.stringify(cartData));

  // Loop through each item in cartData
  cartData.forEach((cartItem, index) => {
    const productTitle = cartItem.productTitle;
    const productAmount = cartItem.productAmount;

    // Create a div to hold the item information
    const divParagraph = document.createElement('div');
    divParagraph.classList.add('cart_product');

    // Create <p> elements for the title and amount
    const titleParagraph = document.createElement('p');
    const amountParagraph = document.createElement('p');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete");
    deleteButton.textContent = `x`;

    // Set the text content of the <p> elements
    titleParagraph.textContent = productTitle;
    amountParagraph.textContent = productAmount;

    // Add a click event listener to the delete button
    deleteButton.addEventListener('click', () => {
      // Remove the item from cartData
      cartData.splice(index, 1);

      // Update the cart on the webpage and localStorage
      updateCart();
      location.reload()
    });

    // Append the <p> elements to the div
    divParagraph.appendChild(titleParagraph);
    divParagraph.appendChild(amountParagraph);
    divParagraph.appendChild(deleteButton);

    // Append the div to the cartInner element
    cartInner.appendChild(divParagraph);
  });
}

// Initial rendering of the cart
updateCart();
