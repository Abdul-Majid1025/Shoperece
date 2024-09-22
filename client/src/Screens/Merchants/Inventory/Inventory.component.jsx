import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./Inventory.styles.css";

import { Link, withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity } from "../../../Redux/Actions/Products.Actions";

const InventoryComponent = ({
  data,

  setProducts,
  products,
}) => {
  const dispatch = useDispatch();
  const [newQty, setNewQty] = useState(0);
  const [q, newQ] = useState(data.product.quantity);

  const addQuantity = (id, quantity) => {
    let newQty1 = parseInt(q) + parseInt(newQty);
    if (newQty1 < 0) {
      newQty1 = 0;
    }
    products.items.find((data) =>
      data.product.productId === id
        ? (data.product.quantity = newQty1)
        : data.product.quantity
    );
    newQ(newQty1);
    setNewQty(0);
    setProducts(products);
    console.log("setProducts", products);
    dispatch(increaseQuantity(id, newQty1));
  };

  return (
    <>
      <tr>
        <td style={{ paddingLeft: "30px" }}>
          {data.product.title.substring(0, 50)}
        </td>

        <td>
          {data && data.product.isDraft && data.product.isDraft === "true"
            ? "Draft"
            : "Live"}
        </td>

        <td> {q} in Stocks</td>
        <td className="d-flex ">
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={newQty}
            placeholder="0"
            style={{ width: "50px" }}
            onChange={(e) => setNewQty(e.target.value)}
          />
          <button
            className="addquantity btn btn-dark"
            onClick={() =>
              addQuantity(data.product.productId, data.product.quantity)
            }
          >
            Add
          </button>
        </td>
      </tr>
    </>
  );
};

export default withRouter(InventoryComponent);
