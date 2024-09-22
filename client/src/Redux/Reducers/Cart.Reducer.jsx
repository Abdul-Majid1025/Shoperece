import {
  ADD_TOCART_REQUEST,
  ADD_TOCART_SUCCESS,
  ADD_TOCART_FAIL,
  REMOVE_FROMCART_SUCCESS,
  CLEAR_ITEMFROMCART_SUCCESS,
  EMPTY_CART_SUCCESS,
} from "../Constants/Cart.Constants";
import {
  addItemsToCart,
  clearItemsFromCart,
  removeItemsFromCart,
  emptyCart,
} from "../utils";

export const addItemToCartReducer = (state = {}, action) => {
  switch (action.type) {
    // case ADD_TOCART_REQUEST:
    //   return { loading: true };
    case ADD_TOCART_SUCCESS:
      return {
        loading: false,

        cartItems: addItemsToCart(state.cartItems, action.payload),
      };
    case REMOVE_FROMCART_SUCCESS:
      return {
        loading: false,

        cartItems: removeItemsFromCart(state.cartItems, action.payload),
      };
    case CLEAR_ITEMFROMCART_SUCCESS:
      return {
        loading: false,

        cartItems: clearItemsFromCart(state.cartItems, action.payload),
      };
    case EMPTY_CART_SUCCESS:
      return {
        loading: false,

        cartItems: emptyCart(),
      };
    case ADD_TOCART_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
