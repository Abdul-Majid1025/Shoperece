import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./itemDescription.styles.css";

import StoreNavbarComponent from "../../../components/StoreNav/StoreNavbar.component";

import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../../Redux/Actions/Products.Actions";

import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import { withRouter } from "react-router-dom";
import { addItemToCart, clearCart } from "../../../Redux/Actions/Cart.Actions";
import { Button, Modal } from "react-bootstrap";

const ItemDescription = (props) => {
  const [sendAlert, setSendAlert] = useState(false);
  const { setLoginModel } = props;
  // console.log("ItemDescription", props);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { productInfo, loading, error, success } = productDetails;

  console.log("productInfo", productInfo);
  let image = productInfo && productInfo.items[3][0];
  let product = productInfo && productInfo.items[0].product;
  console.log("product", product);
  let storeId = props.match.params.storeId;

  const userCart = useSelector((state) => state.userCart);
  const { cartItems } = userCart;

  useEffect(() => {
    dispatch(getProductDetails(props.match.params.id));
  }, []);

  const addItem = (item) => {
    console.log(productInfo);
    // dispatch(addItemToCart(item));
    if (cartItems && cartItems[0] && cartItems[0].storeId !== storeId) {
      setSendAlert(true);
    } else dispatch(addItemToCart(item));
  };
  let item = {
    ...product,
    image,
    storeId,
  };
  console.log("item", item);
  return (
    <>
      <StoreNavbarComponent setLoginModel={setLoginModel} />

      <div className="productdescription">
        <div className="mt-5 container">
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {success && (
            <>
              <div className="header">
                <h3>
                  {productInfo && productInfo.items[0]
                    ? productInfo.items[0].product.title
                    : ""}
                  {/* Dell G5 SE 5505 Gaming Laptop AMD Ryzen 5 4600H, 8GB, 256GB SSD,
              RX 5600M 6GB GDDR6, 15.6" FHD 120Hz, Windows 10, Backlit KB, Dell
              Gaming Backpack 17 | Supernova Silver */}
                </h3>
              </div>

              <div className="divide">
                <div className="allimages">
                  {productInfo &&
                    productInfo.items[3] &&
                    productInfo.items[3].map((data, i) => {
                      return (
                        <img
                          src={`http://localhost:5000/${data}`}
                          alt=""
                          className="img-fluid"
                          width={`${i && i !== 0 ? "150px" : "100%"}`}
                        />
                      );
                    })}
                </div>
                <div className="imgdescription">
                  <div id="details" className="box2 mb-4 mt-4">
                    {/* <p>
                      {productInfo && productInfo.items[0]
                        ? productInfo.items[0].product.description
                        : // <>
                          //   <br />
                          //   <h1>Unleash pulse-racing action</h1>
                          //   <br />
                          //   <br />
                          //   <strong>Guaranteed power:</strong> With Next Generation
                          //   AMD Ryzen™ 4000 Series Mobile Processors, you can revel in
                          //   powerful performance without interrupting your gaming,
                          //   streaming or videos.
                          //   <br />
                          //   <br />
                          //   <strong>Keep cool:</strong> The G5 15 SE gaming laptop
                          //   features a dual-fan cooling system to help spread out heat
                          //   and keep your system responsive and cool during intense
                          //   gameplay.
                          //   <br />
                          //   <br />
                          //   <strong> Intelligent performance:</strong> AMD SmartShift
                          //   technology is designed to automatically distribute power
                          //   between the CPU and GPU during intensive tasks and
                          //   gameplay, giving you reduced render times and higher
                          //   frames per second.
                          //   <br />
                          //   <br />
                          //   <strong> Reinforced strength:</strong> Experience faster
                          //   boot ups and more storage thanks to a solid-state drive.
                          // </>
                          ""}
                    </p> */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productInfo.items[0].product.description,
                      }}
                    ></div>
                    <div className="variations">
                      {productInfo &&
                        productInfo.items[2] &&
                        productInfo.items[2].map((data, i) => {
                          return (
                            <h6
                              className="variationbtn"
                              style={{ marginRight: "10px" }}
                            >
                              {data.varientColor} : {data.varientPrice} RS
                            </h6>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="box">
                <p className="price">
                  {productInfo && productInfo.items[0]
                    ? productInfo.items[0].product.price
                    : ""}{" "}
                  RS
                </p>
                <p className="text-center">
                  <button
                    onClick={() => addItem(item)}
                    type="submit"
                    className="btn btn-template-outlined"
                  >
                    <i className="fa fa-shopping-cart"></i> Add to cart
                  </button>
                  <button
                    type="submit"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add to wishlist"
                    className="btn btn-default"
                  >
                    <i className="fa fa-heart-o"></i>
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={sendAlert}
        onHide={() => setSendAlert(false)}
        item={item}
      />
    </>
  );
};

export default withRouter(ItemDescription);

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const addToCart = () => {
    localStorage.removeItem("cart");
    dispatch(clearCart(props.item));
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
