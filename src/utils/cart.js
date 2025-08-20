export function getCart() {
  let cartString = localStorage.getItem("cart"); // Retrieve the cart from localStorage
  // If cart is null, initialize it as an empty array
  if (cartString == null) {
    cartString = "[]";
    localStorage.setItem("cart", cartString);
  }
  const cart = JSON.parse(cartString); // Parse the cart string into an array
  return cart;
}

export function addToCart(product, qty) {
  let cart = getCart(); // Get the current cart from localStorage
  const existingProductIndex = cart.findIndex((item) => {
    // Check if the product already exists in the cart
    return item.productId === product.productId; // Find the index of the product in the cart
  });
  if (existingProductIndex == -1) {
    // If the product doesn't exist in the cart
    cart.push({
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty,
    });
    localStorage.setItem("cart", JSON.stringify(cart)); // Save the updated cart back to localStorage
  } else {
    const newQty = cart[existingProductIndex].qty + qty; // If the product exists, update the quantity
    if (newQty <= 0) {
      const newCart = cart.filter((item, index) => {
        // Filter out the product if the new quantity is less than or equal to zero
        return index !== existingProductIndex; // Remove the product from the cart
      });
    } else {
      cart[existingProductIndex].qty = newQty; // Update the quantity of the existing product
      localStorage.setItem("cart", JSON.stringify(cart)); // Save the updated cart back to localStorage
    }
  }
}
