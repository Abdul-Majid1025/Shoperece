import React, { useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Navbar from "./Navbar";

import { useDispatch, useSelector } from "react-redux";
import Card1 from "../../components/Card1/Card1.Component";
import { getAllStore } from "../../Redux/Actions/Stores.Actions";

const HomepageStores = ({ setLoginModel, setLoginModel2 }) => {
  const dispatch = useDispatch();
  const getAllStores = useSelector((state) => state.getAllStores);
  const { allStoresInSystem } = getAllStores;
  console.log("allStoresInSystem", allStoresInSystem);

  useEffect(() => {
    dispatch(getAllStore());
  }, []);

  return (
    <>
      <div className="rootcontainer">
        <Navbar setLoginModel={setLoginModel} setLoginModel2={setLoginModel2} />
        <h2 className="text-center">Stores</h2>
        <div className="mt-4 allstores">
          {allStoresInSystem &&
            allStoresInSystem.length > 0 &&
            allStoresInSystem.map((data) => {
              return <Card1 data={data}></Card1>;
            })}
        </div>
      </div>
    </>
  );
};

export default HomepageStores;
