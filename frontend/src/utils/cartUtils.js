// export const addDecimals = (num) => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// };

// export const updateCart = (state) => {
//   //To calculate item price

//   //console.log(state.itemPrice);
//   state.itemPrice = addDecimals(
//     state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );
//   state.itemPrice = Number(state.itemPrice);
//   //console.log(`items price:${state.itemPrice}`);
//   //console.log('items price ' + typeof state.itemPrice);

//   //To calculate item price (if order price is above Rs1000 then free shipping else Rs50 shipping fee)

//   state.shippingPrice = Number(addDecimals(state.itemsPrice > 10 ? 0 : 5));
//   //console.log(`Shping price: ${state.shippingPrice}`);
//   //console.log('Shping price:' + typeof state.shippingPrice);

//   //To calculate Tax Price
//   //console.log(state.taxPrice);

//   //console.log(`items price:${state.itemPrice}`);

//   state.taxPrice = 0.15 * state.itemsPrice;
//   state.taxPrice = Number(state.taxPrice.toFixed(2));

//   //state.taxPrice = Number(addDecimals(0.15 * state.itemsPrice));

//   // console.log('tax price ' + typeof state.taxPrice);

//   // console.log(typeof state.taxPrice);
//   //state.taxPrice = 12 * state.taxPrice;
//   //state.taxPrice = Number(state.taxPrice);

//   //console.log('tax price ' + typeof state.taxPrice);

//   //console.log(`tax price: ${state.taxPrice}`);
//   //console.log(`items price:${state.itemPrice}`);

//   //state.taxPrice = Number(addDecimals((0.15 * state.itemsPrice).toFixed(2)));
//   //console.log(state.taxPrice);
//   //console.log(typeof state.taxPrice);

//   //To calculate Total Price

//   state.totalPrice = Number(state.itemPrice) + Number(state.shippingPrice);
//   Number(state.taxPrice).toFixed(2);

//   //console.log('total price ' + state.totalPrice);

//   // Save the cart to localStorage

//   localStorage.setItem('cart', JSON.stringify(state)); //side effects like localStrorage data save taking here so return statement in calling code is important

//   //   try {
//   //     localStorage.setItem('cart', JSON.stringify(state));
//   //   } catch (error) {
//   //     console.error('Error storing data in localStorage:', error);
//   //   }
// };

//

export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// NOTE: the code below has been changed from the course code to fix an issue
// with type coercion of strings to numbers.
// Our addDecimals function expects a number and returns a string, so it is not
// correct to call it passing a string as the argument.

export const updateCart = (state) => {
  // Calculate the items price in whole number (pennies) to avoid issues with
  // floating point number calculations
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate the shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate the tax price
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // Calculate the total price
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
