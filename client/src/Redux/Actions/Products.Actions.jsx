import axios from "axios";
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  SET_ITEMDESCRIPTION,
  GET_PRODUCTDETAIL_REQUEST,
  GET_PRODUCTDETAIL_SUCCESS,
  GET_PRODUCTDETAIL_FAIL,
  GET_INCREASEQUANTITY_FAIL,
  GET_INCREASEQUANTITY_REQUEST,
  GET_INCREASEQUANTITY_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../Constants/Products.Constants";

export const editStoreProduct =
  (
    currentStore,
    title,
    // media,
    price,
    comPrice,
    cItem,
    quantity,
    pType,
    weight,
    isVariants,
    prodStatus,
    prodCategory,
    collection,
    tags,
    variants,
    editorState,
    productId
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: EDIT_PRODUCT_REQUEST,
      payload: {
        currentStore,
        title,
        // media,
        price,
        comPrice,
        cItem,
        quantity,
        pType,
        weight,
        isVariants,
        prodStatus,
        prodCategory,
        collection,
        tags,
        variants,
        editorState,
        productId,
      },
    });

    const formData = new FormData();
    // for (const single_file of media) {
    //   formData.append("media", single_file);
    // }

    formData.append("currentStore", currentStore);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("comPrice", comPrice);
    formData.append("cItem", cItem);

    formData.append("quantity", quantity);
    formData.append("pType", pType);
    formData.append("weight", weight);
    formData.append("isVariants", isVariants);
    formData.append("prodStatus", prodStatus);
    formData.append("prodCategory", prodCategory);

    formData.append("collection", collection);
    formData.append("tags", tags);
    formData.append("variants", JSON.stringify(variants));
    formData.append("editorState", editorState);
    formData.append("productId", productId);
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post("/api/products/edit", formData, {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      });
      dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EDIT_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addProductToStore =
  (
    currentStore,
    title,
    media,
    price,
    comPrice,
    cItem,
    quantity,
    pType,
    weight,
    isVariants,
    prodStatus,
    prodCategory,
    collection,
    tags,
    variants,
    editorState
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: ADD_PRODUCT_REQUEST,
      payload: {
        currentStore,
        title,
        media,
        price,
        comPrice,
        cItem,
        quantity,
        pType,
        weight,
        isVariants,
        prodStatus,
        prodCategory,
        collection,
        tags,
        variants,
        editorState,
      },
    });

    const formData = new FormData();
    for (const single_file of media) {
      formData.append("media", single_file);
    }

    formData.append("currentStore", currentStore);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("comPrice", comPrice);
    formData.append("cItem", cItem);

    formData.append("quantity", quantity);
    formData.append("pType", pType);
    formData.append("weight", weight);
    formData.append("isVariants", isVariants);
    formData.append("prodStatus", prodStatus);
    formData.append("prodCategory", prodCategory);

    formData.append("collection", collection);
    formData.append("tags", tags);
    formData.append("variants", JSON.stringify(variants));
    formData.append("editorState", editorState);
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post("/api/products/add", formData, {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      });
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const setCurrentProduct = (id) => {
  localStorage.setItem("currentProduct", JSON.stringify(id));
  return {
    type: SET_ITEMDESCRIPTION,
    payload: id,
  };
};

export const getProductDetails = (currentProduct) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTDETAIL_REQUEST,
    payload: {
      currentProduct,
    },
  });

  try {
    const { data } = await axios.post("/api/products/getproductdetails", {
      currentProduct,
    });
    dispatch({ type: GET_PRODUCTDETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const increaseQuantity =
  (currentProduct, qty) => async (dispatch, getState) => {
    dispatch({
      type: GET_INCREASEQUANTITY_REQUEST,
      payload: {
        currentProduct,
        qty,
      },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/api/products/increasequantity",
        {
          currentProduct,
          qty,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.user.token}` },
        }
      );
      dispatch({ type: GET_INCREASEQUANTITY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_INCREASEQUANTITY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteSingleProduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_PRODUCT_REQUEST,
    payload: { id },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(
      `/api/products/deleteproduct/${id}`,

      {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      }
    );

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
