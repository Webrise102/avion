const cartInner = document.querySelector(".modal-body");
let cartData = localStorage.getItem("cart");
if (cartData) {
  cartData = JSON.parse(cartData);
} else {
  cartData = [];
}

cartInner.innerHTML = `Your cart is empty`;

function updateCart() {
  // Clear the cartInner
  if (cartData !== null && cartData.length > 0) {
    // Code to execute if cartData is not null and not an empty array
    cartInner.innerHTML = ``;
    console.log("some");
} else {
  cartInner.innerHTML = `Your cart is empty`;

}

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
      // location.reload()
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
