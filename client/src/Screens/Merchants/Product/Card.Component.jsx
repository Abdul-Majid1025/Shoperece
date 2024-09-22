import React, { Component, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Card.Styles.css";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentProduct } from "../../../Redux/Actions/Products.Actions";
import { addItemToCart, clearCart } from "../../../Redux/Actions/Cart.Actions";

const ProductComponent = ({ data, image, storeId }) => {
  const [sendAlert, setSendAlert] = useState(false);
  const dispatch = useDispatch();

  const addItem = (item) => {
    if (cartItems && cartItems[0] && cartItems[0].storeId !== storeId) {
      setSendAlert(true);
    } else dispatch(addItemToCart(item));
  };

  const userCart = useSelector((state) => state.userCart);
  const { cartItems } = userCart;
  let item = { ...data[0].product, image, storeId };

  return (
    <div className="product-cont">
      <Card style={{ width: "20rem" }}>
        <Link
          to={`/itemdetails/${storeId}/${data[0].product.productId}`}
          onClick={() => dispatch(setCurrentProduct(data[0].product.productId))}
        >
          <Card.Img variant="top" src={`/${data && data[3][0]}`} />
        </Link>
        <Card.Body>
          <Card.Title className="prod_title">
            {data &&
              data[0].product &&
              data[0].product.title.toUpperCase().substring(0, 50)}

            {data && data[0].product && data[0].product.title.length > 50
              ? "... "
              : ""}
          </Card.Title>
          <Card.Text className="prod_price">
            {data && data[0].product && data[0].product.price} Rs
          </Card.Text>
          <Button
            variant="primary"
            className="prod_btn"
            onClick={() => addItem(item)}
          >
            Buy Now
          </Button>
        </Card.Body>
      </Card>

      <MyVerticallyCenteredModal
        show={sendAlert}
        onHide={() => setSendAlert(false)}
        item={item}
      />
    </div>
  );
};

export default ProductComponent;

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const addToCart = () => {
    localStorage.removeItem("cart");
    dispatch(clearCart());
    dispatch(addItemToCart(props.item));
    props.onHide();
  };
  console.log("model", props.item);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p style={{ color: "red", display: "flex", justifyContent: "center" }}>
          Previous items of other store will be removed. Are You sure
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addToCart}>Yes</Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}
