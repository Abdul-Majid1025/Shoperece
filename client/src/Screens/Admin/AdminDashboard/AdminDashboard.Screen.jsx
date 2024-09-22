import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./AdminDashboard.styles.css";

import SearchIcon from "@mui/icons-material/Search";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import AdminNavbarComponent from "../Navbar";
import AdminSidebar from "../Sidebar";
import MessageBox from "../../../components/MessageBox/MessageBox";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";

import { useDispatch, useSelector } from "react-redux";
import { getAllMerchants } from "../../../Redux/Actions/Admin.Actions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const adminMerchants = useSelector((state) => state.adminMerchants);
  const { allMerchants, loading, error, success } = adminMerchants;
  console.log("allMerchants", allMerchants);
  const [allMerchantsArray, setAllMerchantsArray] = useState([]);
  useEffect(() => {
    dispatch(getAllMerchants());
  }, []);

  useEffect(() => {
    setAllMerchantsArray(allMerchants);
  }, [allMerchants]);

  let filteredPrint = allMerchants;
  const onChangeHandler = (event) => {
    console.log("State", allMerchantsArray);
    console.log(event.target.value);
    filteredPrint =
      allMerchants &&
      allMerchants.filter((obj) => {
        console.log("Inside", obj[0]);
        return obj.username
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    console.log("filteredPrint", filteredPrint);
    setAllMerchantsArray(filteredPrint);
  };

  let toBeSortedArray = allMerchants;
  const highToLow = () => {
    console.log("State", allMerchantsArray);
    toBeSortedArray = [
      ...(allMerchants && allMerchants.sort((a, b) => b.stores - a.stores)),
    ];
    console.log("highToLow After", toBeSortedArray);
    console.log("highToLow After customerArray", allMerchantsArray);
    setAllMerchantsArray(toBeSortedArray);
  };
  const lowToHigh = () => {
    console.log("State", allMerchantsArray);
    filteredPrint = [
      ...(allMerchants && allMerchants.sort((a, b) => a.stores - b.stores)),
    ];
    console.log("lowToHigh After", toBeSortedArray);
    console.log("lowToHigh After customerArray", allMerchantsArray);
    setAllMerchantsArray(filteredPrint);
  };

  return (
    <>
      <AdminNavbarComponent />
      {/* <div className="setsidebar">
        <AdminSidebar></AdminSidebar> */}
      <div className="admindashboardcontainer container">
        <div className="viewproductdiv">
          <h2>Dashboard</h2>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className="searchfilter">
          <div className="box shadow rounded bg-white">
            <div className="filteroptions">
              <span>All</span>
            </div>
            <div className="row1">
              <div className="row">
                <div className="col-md-10">
                  <div className="searchdiv">
                    <SearchIcon className="searchicon" />
                    <input
                      className="search"
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search Merchants"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <select
                    name="categories"
                    id="categories"
                    className="filterbtns"
                    onChange={(e) => {
                      if (e.target.value === "storehightolow") {
                        highToLow();
                      } else if (e.target.value === "storelowtohigh") {
                        lowToHigh();
                      }
                    }}
                  >
                    <option>Sort</option>
                    <option value="storehightolow">Stores (high to low)</option>
                    <option value="storelowtohigh">Stores (low to high)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div id="basket" className="col-lg-12">
                <div className="box mt-0 pb-0 no-horizontal-padding">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th style={{ paddingLeft: "30px" }}>Name</th>

                          <th colspan="2">Stores</th>
                        </tr>
                      </thead>
                      {allMerchantsArray &&
                        allMerchantsArray.length > 0 &&
                        allMerchantsArray.map((data, i) => {
                          return (
                            <tbody>
                              <tr>
                                <td style={{ paddingLeft: "30px" }}>
                                  <a href="#">{data.username} </a>
                                </td>

                                <td>{data.stores}</td>
                              </tr>
                            </tbody>
                          );
                        })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default AdminDashboard;
