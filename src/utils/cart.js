export function getCart() {
  let cartString = localStorage.getItem("cart");
  if (!cartString) {
    cartString = "[]";
    localStorage.setItem("cart", cartString);
  }
  return JSON.parse(cartString);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function addToCart(product, qty) {
  const cart = getCart();
  const existingProductIndex = cart.findIndex(item => item.productId === product.productId);

  if (existingProductIndex === -1) {
    cart.push({
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty,
    });
  } else {
    const newQty = cart[existingProductIndex].quantity + qty;
    if (newQty <= 0) {
      cart.splice(existingProductIndex, 1);
    } else {
      cart[existingProductIndex].quantity = newQty;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Trigger cart update event
  window.dispatchEvent(new Event("cartUpdated"));
}

export function getTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
