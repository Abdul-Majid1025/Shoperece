export const addItemsToCart = (cartItems, cartItemToAdd) => {
  // console.log("addItemsToCart utils cartItems", cartItems);
  // if (cartItems == undefined) {
  //   console.log("if");
  //   cartItems = [];
  //   const data = [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  //   localStorage.setItem("cart", JSON.stringify(data));
  //   return data;
  // } else {
  //   console.log("else");

  console.log("cartItemToAdd.", cartItemToAdd);

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem && cartItem.productId === cartItemToAdd.productId
  );

  console.log("existingCartItem", existingCartItem);
  if (existingCartItem) {
    const data = cartItems.map((cartItem) =>
      cartItem.productId === cartItemToAdd.productId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    localStorage.setItem("cart", JSON.stringify(data));
    return data;
  }

  const data = [...cartItems, { ...cartItemToAdd, quantity: 1 }];

  localStorage.setItem("cart", JSON.stringify(data));
  return data;
  // }
};

export const removeItemsFromCart = (cartItems, cartItemToremove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem && cartItem.productId === cartItemToremove.productId
  );

  console.log("existingCartItem", existingCartItem);
  if (existingCartItem.quantity === 1) {
    const data = cartItems.filter(
      (cartItem) => cartItem.productId !== cartItemToremove.productId
    );
    localStorage.setItem("cart", JSON.stringify(data));
    return data;
  }

  const data = cartItems.map((cartItem) =>
    cartItem.productId === cartItemToremove.productId
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );

  localStorage.setItem("cart", JSON.stringify(data));
  return data;
};

export const clearItemsFromCart = (cartItems, cartItemToremove) => {
  const data = cartItems.filter(
    (cartItem) => cartItem.productId !== cartItemToremove.productId
  );
  localStorage.setItem("cart", JSON.stringify(data));
  return data;
};

export const emptyCart = () => {
  localStorage.setItem("cart", []);
  return [];
};
