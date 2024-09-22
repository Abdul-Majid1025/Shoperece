import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./Collection.styles.css";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import SearchIcon from "@mui/icons-material/Search";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import { withRouter } from "react-router-dom";

const Collections = (props) => {
  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="collectionscontainer container">
          <div className="addcollectiondiv">
            <h2>Collections</h2>
            <button className="createbtn">Create Collection</button>
          </div>
          <div className="searchfilter">
            <div className="box shadow rounded bg-white">
              <div className="row1">
                <div className="row">
                  <div className="col-md-8">
                    <div className="searchdiv">
                      <SearchIcon className="searchicon" />
                      <input
                        className="search"
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Filter collections"
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <select
                      name="availability"
                      id="availability"
                      style={{ width: "100%", height: "100%" }}
                      // value="Availability"
                    >
                      <option>Availability</option>
                      <option value="Unavailableonallchannels">
                        Unavailable on all channels
                      </option>
                      <option value="AvailableonOnlineStore">
                        Available on Online Store
                      </option>
                      <option value="UnavailableonOnlineStore">
                        Unavailable on Online Store
                      </option>
                    </select>
                  </div>
                  <div className="col-md-1">
                    <select name="type" id="type" className="filterbtns">
                      <option>Type</option>
                      <option value="Automated">Automated</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                  <div className="col-md-1">
                    <button className="savedbtn">Saved</button>
                  </div>
                  <div className="col-md-1">
                    <select name="sort" id="sort" className="filterbtns">
                      <option>Sort</option>
                      <option value="titleA–Z">CollectiontitleA–Z</option>
                      <option value="titleZ–A">CollectiontitleZ–A</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row2">
                <h6>Title</h6>
                <h6>Product conditions</h6>
              </div>
              <div className="row3">
                <h6>Homepage</h6>
              </div>
              <div className="row3">
                <h6>Summer Collection</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Collections);
