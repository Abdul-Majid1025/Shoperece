import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "../Collections/Collection.styles.css";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import SearchIcon from "@mui/icons-material/Search";
import { withRouter } from "react-router-dom";

const Pages = (props) => {
  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="collectionscontainer container">
          <div className="addcollectiondiv">
            <h2>Pages</h2>
            <button className="createbtn">Add Page</button>
          </div>
          <div className="searchfilter">
            <div className="box shadow rounded bg-white">
              <div className="row1">
                <div className="row">
                  <div className="col-md-9">
                    <div className="searchdiv">
                      <SearchIcon className="searchicon" />
                      <input
                        className="search"
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Filter Pages"
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
                      <option>Visibility</option>
                      <option value="hidden">Hidden</option>
                      <option value="visible">Visible</option>
                    </select>
                  </div>

                  <div className="col-md-1">
                    <button className="savedbtn">Saved</button>
                  </div>
                  <div className="col-md-1">
                    <select name="sort" id="sort" className="filterbtns">
                      <option>Sort</option>
                      <option value="titleA–Z">Title A–Z</option>
                      <option value="titleZ-A">Title Z–A</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row2">
                <h6>Title</h6>
              </div>
              <div className="row3">
                <h6>Homepage</h6>
              </div>
              <div className="row3">
                <h6>About</h6>
              </div>
              <div className="row3">
                <h6>Contact</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Pages);
