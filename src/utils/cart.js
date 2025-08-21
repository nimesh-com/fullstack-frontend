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
  // Function to add or update a product in the cart
  const cart = getCart();
  const existingProductIndex = cart.findIndex((item) => {
    return item.productId === product.productId;
  });

  if (existingProductIndex == -1) {
    // If product is not in the cart, add it
    cart.push({
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    // If product is already in the cart, update its quantity
    const newQty = cart[existingProductIndex].quantity + qty;
    if (newQty <= 0) {
      // If quantity is zero or less, remove the product from the cart
      const newCart = cart.filter((item, index) => {
        return index !== existingProductIndex;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      // Update the quantity of the existing product
      cart[existingProductIndex].quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}
