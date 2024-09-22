import React, { useState } from "react";
import "./Card.Styles.css";

import { useMediaQuery } from "react-responsive";

import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setCurrentProduct } from "../../Redux/Actions/Products.Actions";

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, clearCart } from "../../Redux/Actions/Cart.Actions";

const MyCard = ({ data, type, image, storeId }) => {
  const isTablet = useMediaQuery({ query: "(max-width: 770px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const isMobile450 = useMediaQuery({ query: "(max-width: 450px)" });

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
    <>
      {type && type === "item" && (
        <div className="product">
          {isMobile450 ? (
            <>
              <Card style={{ width: "10rem" }}>
                <Link
                  to={`/itemdetails/${storeId}/${data[0].product.productId}`}
                  onClick={() =>
                    dispatch(setCurrentProduct(data[0].product.productId))
                  }
                >
                  <Card.Img
                    style={{ width: "150px", height: "150px" }}
                    variant="top"
                    src={`/${data && data[3][0]}`}
                  />
                </Link>
                <Card.Body>
                  <Card.Title style={{ fontSize: "11px" }}>
                    {data &&
                      data[0].product &&
                      data[0].product.title.substring(0, 20)}

                    {data &&
                    data[0].product &&
                    data[0].product.title.length > 20
                      ? "... "
                      : ""}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "9px" }}>
                    <div className="d-flex flex-column">
                      <span className="discountedPrice">
                        {data && data[0].product && data[0].product.price} Rs
                      </span>
                      <Button
                        variant="primary"
                        className="productbuynow_btn"
                        onClick={() => addItem(item)}
                      >
                        Buy Now
                      </Button>
                    </div>
                    {/* <div className="d-flex justify-content-between align-items-center">
                        <Reviews review={product.reviews}></Reviews>
                        <button
                        style={{ fontSize: "10px" }}
                        className="whishlistbutton"
                      >
                        <FavoriteBorderIcon /> Wishlist
                      </button>
                      </div> */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          ) : isTablet ? (
            <>
              <Card style={{ width: "12rem" }}>
                <Link
                  to={`/itemdetails/${storeId}/${data[0].product.productId}`}
                  onClick={() =>
                    dispatch(setCurrentProduct(data[0].product.productId))
                  }
                >
                  <Card.Img variant="top" src={`/${data && data[3][0]}`} />
                </Link>
                <Card.Body>
                  <Card.Title style={{ fontSize: "12px" }}>
                    {data &&
                      data[0].product &&
                      data[0].product.title.substring(0, 30)}

                    {data &&
                    data[0].product &&
                    data[0].product.title.length > 30
                      ? "... "
                      : ""}
                  </Card.Title>
                  <Card.Text>
                    <div className="d-flex flex-column">
                      <span className="discountedPrice">
                        {data && data[0].product && data[0].product.price} Rs
                      </span>
                      <Button
                        variant="primary"
                        className="productbuynow_btn"
                        onClick={() => addItem(item)}
                      >
                        Buy Now
                      </Button>
                    </div>
                    {/* <div className="d-flex justify-content-between align-items-center">
                        <Reviews
                          style={{ fontSize: "12px" }}
                          review={product.reviews}
                        ></Reviews>
                        <button
                        className="whishlistbutton"
                        style={{ fontSize: "12px" }}
                      >
                        <FavoriteBorderIcon /> Wishlist
                      </button>
                      </div> */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          ) : (
            <Card className="productcard" style={{ width: "18rem" }}>
              <Link
                to={`/itemdetails/${storeId}/${data[0].product.productId}`}
                onClick={() =>
                  dispatch(setCurrentProduct(data[0].product.productId))
                }
              >
                <Card.Img
                  className="productcardimg"
                  variant="top"
                  src={`/${data && data[3][0]}`}
                />
              </Link>
              <Card.Body>
                <Card.Title className="productcardtitle">
                  {data &&
                    data[0].product &&
                    data[0].product.title.substring(0, 40)}

                  {data && data[0].product && data[0].product.title.length > 40
                    ? "... "
                    : ""}
                </Card.Title>
                <Card.Text>
                  <div className="d-flex flex-column">
                    <span className="discountedPrice">
                      {data && data[0].product && data[0].product.price} Rs
                    </span>
                    <Button
                      variant="primary"
                      className="productbuynow_btn"
                      onClick={() => addItem(item)}
                    >
                      Buy Now
                    </Button>
                  </div>
                  {/* <div className="d-flex justify-content-between align-items-center">
                      <Reviews review={product.reviews}></Reviews>
                      <button className="whishlistbutton">
                        <FavoriteBorderIcon /> Wishlist
                      </button>
                    </div> */}
                </Card.Text>
              </Card.Body>
            </Card>
            // </Link>
          )}
        </div>
      )}
      {/* {type && type === "wishlist" && (
        <Link to="/details">
          <div className="wishlist">
            <Card className="productcard" style={{ width: "18rem" }}>
              <Card.Img
                className="productcardimg"
                variant="top"
                src={product.image}
              />
              <Card.Body>
                <Card.Title className="productcardtitle">
                  {product.name}
                </Card.Title>
                <Card.Text>
                  <span className="discountedPrice">
                    ₹{product.discountedPrice}
                  </span>
                  ₹
                  <span className="originalprice">
                    {" "}
                    {product.originalPrice}{" "}
                  </span>
                  <Reviews review={product.reviews}></Reviews>
                  <button
                    onClick={removeFromWishlist(product.id)}
                    className="removebtn w-100"
                  >
                    Remove
                  </button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Link>
      )} */}
      <MyVerticallyCenteredModal
        show={sendAlert}
        onHide={() => setSendAlert(false)}
        item={item}
      />
    </>
  );
};

export default MyCard;

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
