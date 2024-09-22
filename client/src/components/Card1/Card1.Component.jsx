import React from "react";
import "./Card1.Styles.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setCustomerCurrentStore } from "../../Redux/Actions/Stores.Actions";

const Card1 = ({ data }) => {
  const dispatch = useDispatch();
  console.log(data);

  return (
    <div className="StoreItem">
      <Link
        to={{
          pathname: `/store/${data.id}`,
          state: {
            from: {
              data: {
                storeName: data.storeName,
                postalCode: data.postalCode,
                phone: data.phone,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                apartment: data.apartment,
                city: data.city,
                isRegistered: data.isRegistered,
                url: data.url,
                userId: data.UserId,
                storeId: data.id,
              },
            },
          },
        }}
        className="store"
        // onClick={() => dispatch(setCustomerCurrentStore(data.id))}
      >
        <div className={`menu-item`}>
          <div
            className="background-image"
            // style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <img src={`http://127.0.0.1:5000/${data.storeImage}`} alt="" />
          </div>
          <div className="content">
            <div className="title">{data.storeName.toUpperCase()}</div>
            <span className="subtitle">SHOP NOW</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default withRouter(Card1);
