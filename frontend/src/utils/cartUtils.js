export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //To calculate item price

  console.log(state.itemPrice);
  state.itemPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  state.itemPrice = Number(state.itemPrice);
  console.log(`items price:${state.itemPrice}`);
  console.log('items price ' + typeof state.itemPrice);

  //To calculate item price (if order price is above Rs1000 then free shipping else Rs50 shipping fee)

  state.shippingPrice = Number(addDecimals(state.itemsPrice > 10 ? 0 : 5));
  console.log(`Shping price: ${state.shippingPrice}`);
  console.log('Shping price:' + typeof state.shippingPrice);

  //To calculate Tax Price
  //console.log(state.taxPrice);

  console.log(`items price:${state.itemPrice}`);

  state.taxPrice = 0.15 * state.itemsPrice;
  state.taxPrice = Number(state.taxPrice.toFixed(2));

  //state.taxPrice = Number(addDecimals(0.15 * state.itemsPrice));

  console.log('tax price ' + typeof state.taxPrice);

  console.log(typeof state.taxPrice);
  //state.taxPrice = 12 * state.taxPrice;
  //state.taxPrice = Number(state.taxPrice);

  //console.log('tax price ' + typeof state.taxPrice);

  //console.log(`tax price: ${state.taxPrice}`);
  console.log(`items price:${state.itemPrice}`);

  //state.taxPrice = Number(addDecimals((0.15 * state.itemsPrice).toFixed(2)));
  console.log(state.taxPrice);
  console.log(typeof state.taxPrice);

  //To calculate Total Price

  state.totalPrice = Number(state.itemPrice) + Number(state.shippingPrice);
  Number(state.taxPrice).toFixed(2);

  console.log('total price ' + state.totalPrice);

  localStorage.setItem('cart', JSON.stringify(state)); //side effects like localStrorage data save taking here so return statement in calling code is important

  //   try {
  //     localStorage.setItem('cart', JSON.stringify(state));
  //   } catch (error) {
  //     console.error('Error storing data in localStorage:', error);
  //   }
};
