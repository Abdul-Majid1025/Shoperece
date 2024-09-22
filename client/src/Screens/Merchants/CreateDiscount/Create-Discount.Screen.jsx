import "./Create-Discount.Styles.css";
import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import { withRouter } from "react-router-dom";

const CreateDiscount = (props) => {
  return (
    <>
      <div className="creatediscountcontainer">
        <MyNavbarComponent />
        <div className="setsidebar">
          <Sidebar storeId={props.match.params.id}></Sidebar>
          <form>
            <div class="DiscountCode">
              <h4>Discount Code</h4>
              <label>
                <input
                  name=""
                  type="text"
                  // onChange={e => setsname(e.target.value)}
                  required
                />
              </label>
            </div>
            <div class="Types">
              <h4>Types</h4>
              <input type="radio" value="Percentage" name="Types" /> Percentage
              <br />
              <input type="radio" value="Fixed amount" name="Types" /> Fixed
              amount
              <br />
              <input type="radio" value="Free shipping" name="Types" /> Free
              shipping
              <br />
              <input type="radio" value="Buy X get Y" name="Types" /> Buy X get
              Y
              <br />
            </div>
            <div class="Types">
              <h4>Minimum Requirements</h4>
              <input type="radio" value="None" name="requirements" /> None
              <br />
              <input
                type="radio"
                value="Minimum purchase amount"
                name="requirements"
              />{" "}
              Minimum purchase amount
              <br />
              <input
                type="radio"
                value="Minimum quantity of items"
                name="requirements"
              />{" "}
              Minimum quantity of items
              <br />
            </div>
            <div class="Types">
              <h4>Customer Eligibility</h4>
              <input type="radio" value="Everyone" name="requirements" />{" "}
              Everyone
              <br />
              <input
                type="radio"
                value="Minimum purchase amount"
                name="requirements"
              />{" "}
              Specific groups of customers
              <br />
              <input
                type="radio"
                value="Minimum quantity of items"
                name="requirements"
              />{" "}
              Specific customers
              <br />
            </div>
            <div class="Types">
              <h4>Usage limits</h4>
              <input type="radio" value="Everyone" name="requirements" /> Limit
              number of times this discount can be used in total
              <br />
              <input
                type="radio"
                value="Minimum purchase amount"
                name="requirements"
              />{" "}
              Limit to one use per customer
              <br />
            </div>
            <div class="Types">
              <h4>Active Dates</h4>
              <div class="align1">
                <div>
                  <label>
                    Start Date
                    <input type="date" value="" name="requirements" />
                  </label>
                </div>
                <div class="align2">
                  <label>
                    Start Time
                    <input type="time" value="" name="requirements" />
                  </label>
                </div>
              </div>
              <div class="align1">
                <div>
                  <label>
                    End Date
                    <input type="date" value="" name="requirements" />
                  </label>
                </div>
                <div class="align2">
                  <label>
                    End Time
                    <input type="time" value="" name="requirements" />
                  </label>
                </div>
              </div>
            </div>

            <button class="button2">Discard</button>
            <button class="button1">Save Discount Code</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateDiscount);
