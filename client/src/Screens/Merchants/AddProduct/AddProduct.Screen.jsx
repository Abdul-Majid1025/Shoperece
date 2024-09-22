// import React, { useState } from "react";

// import { Form } from "react-bootstrap";
// import Sidebar from "../../../components/Sidebar/Sidebar.component";
// import { Editor } from "react-draft-wysiwyg";
// import {
//   // Editor,
//   EditorState,
//   ContentState,
//   convertFromHTML,
//   CompositeDecorator,
//   convertToRaw,
//   getDefaultKeyBinding,
// } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import { useDispatch, useSelector } from "react-redux";

// import { addProductToStore } from "../../../Redux/Actions/Products.Actions";

// import "./AddProduct.styles.css";
// import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
// import LoadingBox from "../../../components/LoadingBox/LoadingBox";
// import MessageBox from "../../../components/MessageBox/MessageBox";

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const currentStore = useSelector((state) => state.currentStore);
//   const { CurrentStore } = currentStore;

//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );

//   const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
//   console.log("blocks", blocks);
//   const value = blocks
//     .map((block) => (!block.text.trim() && "\n") || block.text)
//     .join("\n");
//   console.log("value", value);

//   console.log(
//     "editorState",
//     editorState.getCurrentContent().getPlainText("\u0001")
//   );
//   const [title, setTitle] = useState("");
//   const [media, setMedia] = useState("");
//   const [price, setPrice] = useState("");
//   const [comPrice, setcomPrice] = useState("");
//   const [cItem, setcItem] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [pType, setpType] = useState("");
//   const [weight, setWeight] = useState("");
//   const [isVariants, setisVariants] = useState(false);
//   const [optName, setoptName] = useState("");
//   const [optVal, setoptVal] = useState("");
//   const [prodStatus, setProdStatus] = useState("live");
//   const [prodCategory, setProdCategory] = useState("");
//   const [collection, setCollection] = useState("");
//   const [tags, setTags] = useState("");
//   const [weighttype, setweighttype] = useState("kg");

//   const [variants, setVariants] = useState([]);

//   const [optprice, setOptPrice] = useState("");
//   const [optcomPrice, setOptcomPrice] = useState("");
//   const [optcItem, setOptcItem] = useState("");
//   const [Error, setError] = useState({});

//   const [variationLength, setVariationLength] = useState([1]);

//   const addNewProduct = useSelector((state) => state.addNewProduct);
//   const { loading, error, success, message } = addNewProduct;

//   const handleChange = (rawDraftContentState) => {
//     // no need for convertToRaw or stateToHtml anymore
//     console.log("rawDraftContentState", rawDraftContentState);
//   };

//   const addProduct = () => {
//     if (
//       title === "" ||
//       media === "" ||
//       price === "" ||
//       comPrice === "" ||
//       cItem === "" ||
//       quantity === "" ||
//       prodCategory === "" ||
//       tags === ""
//     ) {
//       document.getElementById("error").style.display = "block";
//     } else {
//       document.getElementById("error").style.display = "none";
//       let valid = true;
//       let error = {};
//       const checkNegative = /^[1-9]+\d*$/;
//       const commaSeperate =
//         "^[a-zA-Z0-9-]*[a-zA-Z0-9]+(?:, [a-zA-Z0-9-]*[a-zA-Z0-9]+)*$";

//       if (pType && !weight.match(checkNegative)) {
//         error["weight"] = "Weight should be positive";
//         valid = false;
//       }

//       if (!quantity.match(checkNegative)) {
//         error["quantity"] = "Quantity should be positive";
//         valid = false;
//       }
//       if (isVariants && !optprice.match(commaSeperate)) {
//         error["optVal"] = "Value should be comma seperated";
//         valid = false;
//       }
//       if (isVariants && !optName.match(commaSeperate)) {
//         error["optName"] = "Price should be comma seperated";
//         valid = false;
//       }

//       if (isVariants && !optcItem.match(commaSeperate)) {
//         error["optcItem"] = "Price should be comma seperated";
//         valid = false;
//       }

//       if (isVariants && !optcomPrice.match(commaSeperate)) {
//         error["optcomPrice"] = "Price should be comma seperated";
//         valid = false;
//       }
//       setError(error);
//       if (valid) {
//         dispatch(
//           addProductToStore(
//             CurrentStore,
//             title,
//             media,
//             price,
//             comPrice,
//             cItem,
//             quantity,
//             pType,
//             weight ? weight + weighttype : "",
//             isVariants,
//             prodStatus,
//             prodCategory,
//             collection,
//             tags,
//             variants,
//             // editorState.getCurrentContent().getPlainText("\u0001")
//             value
//           )
//         );
//       }
//     }
//   };

//   const doneVariatants = () => {
//     variants.push({
//       optName: optName,
//       optVal: optVal,
//       optprice: optprice,
//       optcomPrice: optcomPrice,
//       optcItem: optcItem,
//     });
//     console.log("variants", variants);
//   };
//   return (
//     <>
//       <MyNavbarComponent />
//       <div className="setsidebar">
//         <div className="mobile">
//           <Sidebar></Sidebar>
//         </div>
//         <div className="addproductcontainer">
//           <div className="formcontainer">
//             <div className="container1">
//               {loading && <LoadingBox></LoadingBox>}
//               {error && <MessageBox variant="danger">{error}</MessageBox>}
//               {success && (
//                 <MessageBox variant="success">{message.message}</MessageBox>
//               )}
//               <div className="p-3 shadow rounded bg-white">
//                 <label htmlFor="title">Title</label>
//                 <br />
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   placeholder="Product Title"
//                   className="form-control"
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 ></input>
//                 <br />
//                 <label htmlFor="description">Description</label>
//                 <div
//                   style={{
//                     border: "1px solid black",
//                     padding: "2px",
//                     minHeight: "300px",
//                   }}
//                 >
//                   <Editor
//                     editorState={editorState}
//                     // onEditorStateChange={setEditorState}
//                     onEditorStateChange={(editorState) => {
//                       setEditorState(editorState);
//                       handleChange(editorState);
//                     }}
//                   />
//                 </div>
//                 {/* {console.log(title, editorState)} */}
//               </div>
//               <div className="mt-4 p-3 shadow rounded bg-white">
//                 <Form.Group controlId="formFile">
//                   <Form.Label>Media</Form.Label>
//                   <br />
//                   <Form.Control
//                     className="w-100"
//                     // id="img"
//                     name="img"
//                     type="file"
//                     multiple
//                     onChange={(e) => setMedia(e.target.files)}
//                   />
//                 </Form.Group>
//                 <br />
//               </div>
//               <div className="mt-4 p-3 shadow rounded bg-white">
//                 <h6 className="mb-3">Pricing</h6>

//                 <div className="mb-3 row">
//                   <div className="col-md-6">
//                     <label htmlFor="price">Price</label>
//                     <br />

//                     <input
//                       type="number"
//                       id="price"
//                       name="price"
//                       placeholder="RS "
//                       className="form-control"
//                       onChange={(e) => setPrice(e.target.value)}
//                     ></input>
//                   </div>
//                   <div className="col-md-6">
//                     <label htmlFor="compareprice">Compare at price</label>
//                     <br />

//                     <input
//                       type="number"
//                       id="compareprice"
//                       name="compareprice"
//                       placeholder="RS "
//                       className="form-control"
//                       onChange={(e) => setcomPrice(e.target.value)}
//                     ></input>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <label htmlFor="cost">Cost per item</label>
//                     <br />

//                     <input
//                       type="number"
//                       id="cost"
//                       name="cost"
//                       placeholder="RS "
//                       className="form-control"
//                       onChange={(e) => setcItem(e.target.value)}
//                     ></input>
//                   </div>
//                 </div>
//                 <br />
//               </div>

//               <div className="mt-4 p-3 shadow rounded bg-white">
//                 <h6 className="mb-3">Inventory</h6>
//                 <p className="mb-3">QUANTITY</p>
//                 <div className="pushright row">
//                   <div className="col-md-6">
//                     <label htmlFor="available">Available</label>
//                     <br />

//                     <input
//                       type="number"
//                       id="price"
//                       name="price"
//                       placeholder="0 "
//                       className="form-control"
//                       onChange={(e) => setQuantity(e.target.value)}
//                     ></input>
//                     <br />
//                   </div>
//                 </div>
//                 <div className="alert-danger">{Error.quantity}</div>{" "}
//               </div>

//               <div className="mt-4 p-3 shadow rounded bg-white">
//                 <div className="shipping">
//                   <h6 className="mb-3">Shipping</h6>
//                   <input
//                     type="checkbox"
//                     name="physical"
//                     id="physical"
//                     className="checkbox"
//                     onChange={(e) => setpType(e.target.checked)}
//                   />
//                   This is a physical product
//                 </div>
//                 {pType && (
//                   <>
//                     <p className="mt-2 mb-3">WEIGHT</p>
//                     <div className="pushright row">
//                       <label htmlFor="weight">Weight</label>
//                       <div className="col-md-5">
//                         <input
//                           type="number"
//                           id="weight"
//                           name="weight"
//                           placeholder="0.0"
//                           className="form-control"
//                           onChange={(e) => setWeight(e.target.value)}
//                         ></input>
//                       </div>
//                       <div className="col-md-2">
//                         <select
//                           name="weightin"
//                           id="weightin"
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             textAlign: "center",
//                           }}
//                           onChange={(e) => {
//                             setweighttype(e.target.value);
//                           }}
//                         >
//                           <option value="kg">kg</option>
//                           <option value="g">g</option>
//                           <option value="lb">lb</option>
//                           <option value="oz">oz</option>
//                         </select>
//                       </div>
//                       <div className="alert-danger">{Error.weight}</div>{" "}
//                     </div>
//                   </>
//                 )}
//               </div>

//               <div className="mt-4 p-3 shadow rounded bg-white">
//                 <h6 className="mb-3">Options</h6>
//                 <input
//                   className="checkbox mb-4"
//                   type="checkbox"
//                   name="options"
//                   id="options"
//                   onChange={(e) => {
//                     console.log(e);
//                     setisVariants(
//                       e.target.checked && e.target.checked === true
//                         ? true
//                         : false
//                     );
//                   }}
//                 />
//                 This product has options, like size or color
//                 {isVariants && (
//                   <div className="options pushright2">
//                     {variationLength &&
//                       variationLength.map((data) => (
//                         <>
//                           <label htmlFor="optionname">Option name</label>
//                           <input
//                             type="text"
//                             list="optionname"
//                             name="optionname"
//                             className="form-control"
//                             placeholder="Size"
//                             onChange={(e) => setoptName(e.target.value)}
//                           />
//                           <datalist id="optionname">
//                             <option value="Size"></option>
//                             <option value="Color"></option>
//                             <option value="Material"></option>
//                             <option value="Style"></option>
//                           </datalist>
//                           <br />
//                           <label htmlFor="optionvalues">Option values</label>
//                           <input
//                             type="text"
//                             id="optionvalues"
//                             name="optionvalues"
//                             className="form-control mb-3"
//                             placeholder="Small, Medium"
//                             onChange={(e) => setoptVal(e.target.value)}
//                           />
//                           <div className="alert-danger">{Error.optVal}</div>{" "}
//                           <div className="mb-3 row">
//                             <div className="col-md-6">
//                               <label htmlFor="price">Price</label>
//                               <br />
//                               <input
//                                 type="text"
//                                 id="price"
//                                 name="price"
//                                 placeholder="RS "
//                                 className="form-control"
//                                 onChange={(e) => setOptPrice(e.target.value)}
//                               ></input>
//                               <div className="alert-danger">
//                                 {Error.optprice}
//                               </div>{" "}
//                             </div>
//                             <div className="col-md-6">
//                               <label htmlFor="compareprice">
//                                 Compare at price
//                               </label>
//                               <br />
//                               <input
//                                 type="text"
//                                 id="compareprice"
//                                 name="compareprice"
//                                 placeholder="RS "
//                                 className="form-control"
//                                 onChange={(e) => setOptcomPrice(e.target.value)}
//                               ></input>
//                               <div className="alert-danger">
//                                 {Error.optcomPrice}
//                               </div>{" "}
//                             </div>
//                           </div>
//                           <div className="row">
//                             <div className="col-md-6">
//                               <label htmlFor="cost">Cost per item</label>
//                               <br />
//                               <input
//                                 type="text"
//                                 id="cost"
//                                 name="cost"
//                                 placeholder="RS "
//                                 className="form-control"
//                                 onChange={(e) => setOptcItem(e.target.value)}
//                               ></input>
//                               <div className="alert-danger">
//                                 {Error.optcItem}
//                               </div>{" "}
//                             </div>
//                           </div>
//                         </>
//                       ))}
//                     <button
//                       className="mt-4 btn btn-dark"
//                       onClick={doneVariatants}
//                     >
//                       Done
//                     </button>
//                   </div>
//                 )}
//                 <div className="mt-3 addoption">
//                   <svg
//                     viewBox="0 0 20 20"
//                     class="Polaris-Icon__Svg_375hu"
//                     focusable="false"
//                     aria-hidden="true"
//                   >
//                     <path d="M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2z"></path>
//                   </svg>
//                   <span
//                     className="addoptionbtn"
//                     onClick={(e) => {
//                       variants.push({
//                         optName: optName,
//                         optVal: optVal,
//                         optprice: optprice,
//                         optcomPrice: optcomPrice,
//                         optcItem: optcItem,
//                       });
//                       setVariationLength([...variationLength, 1]);
//                     }}
//                   >
//                     Add another option
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="container2">
//               <div className="p-3 shadow rounded bg-white">
//                 <h6 className="pb-3">Product Status</h6>

//                 <select
//                   name="status"
//                   id="status"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     textIndent: "10px",
//                     padding: "5px",
//                   }}
//                   onChange={(e) => {
//                     setProdStatus(e.target.value);
//                   }}
//                 >
//                   <option value="live">Live</option>
//                   <option value="draft">Draft</option>
//                 </select>
//                 <br />
//               </div>

//               <div className="mt-4 p-3 shadow rounded bg-white">
//                 <h6 className="pb-3">PRODUCT TYPE</h6>

//                 <label htmlFor="category">Category</label>

//                 <input
//                   type="text"
//                   id="category"
//                   name="category"
//                   className="form-control"
//                   placeholder="Category"
//                   onChange={(e) => setProdCategory(e.target.value)}
//                 />
//                 <br />
//                 <div className="collection">
//                   <label htmlFor="collections">COLLECTIONS</label>

//                   <input
//                     type="text"
//                     id="collections"
//                     name="collections"
//                     className="form-control"
//                     placeholder="Collections"
//                     onChange={(e) => setCollection(e.target.value)}
//                   />
//                   <br />
//                 </div>
//                 <h6 className="pt-3 pb-3">TAGS</h6>
//                 <input
//                   type="text"
//                   id="tags"
//                   name="tags"
//                   className="form-control"
//                   placeholder="Vintage,cotton,summer"
//                   onChange={(e) => setTags(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="d-flex justify-content-center">
//             <p id="error" style={{ display: "none", color: "red" }}>
//               Please Fill in the required details
//             </p>
//           </div>
//           <button className="btn btn-dark saveproduct" onClick={addProduct}>
//             Save
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddProduct;

import React, { useState } from "react";

import { Form } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import { useDispatch, useSelector } from "react-redux";

import { addProductToStore } from "../../../Redux/Actions/Products.Actions";

import "./AddProduct.styles.css";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import { withRouter } from "react-router-dom";

const AddProduct = (props) => {
  const dispatch = useDispatch();
  const currentStore = useSelector((state) => state.currentStore);
  const { CurrentStore } = currentStore;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [rawMessage, setRawMessage] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setRawMessage(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const [title, setTitle] = useState("");
  const [media, setMedia] = useState("");
  const [price, setPrice] = useState("");
  const [comPrice, setcomPrice] = useState("");
  const [cItem, setcItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pType, setpType] = useState("");
  const [weight, setWeight] = useState("");
  const [isVariants, setisVariants] = useState(false);
  const [optName, setoptName] = useState("");
  const [optVal, setoptVal] = useState("");
  const [prodStatus, setProdStatus] = useState("live");
  const [prodCategory, setProdCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [tags, setTags] = useState("");
  const [weighttype, setweighttype] = useState("kg");

  const [variants, setVariants] = useState([]);

  const [optprice, setOptPrice] = useState("");
  const [optcomPrice, setOptcomPrice] = useState("");
  const [optcItem, setOptcItem] = useState("");
  const [Error, setError] = useState({});

  const [variationLength, setVariationLength] = useState([1]);

  const addNewProduct = useSelector((state) => state.addNewProduct);
  const { loading, error, success, message } = addNewProduct;

  const addProduct = () => {
    if (
      title === "" ||
      media === "" ||
      price === "" ||
      comPrice === "" ||
      cItem === "" ||
      quantity === "" ||
      prodCategory === "" ||
      tags === ""
    ) {
      document.getElementById("error").style.display = "block";
    } else {
      document.getElementById("error").style.display = "none";
      let valid = true;
      let error = {};
      const checkNegative = /^[1-9]+\d*$/;
      const commaSeperate =
        "^[a-zA-Z0-9-]*[a-zA-Z0-9]+(?:, [a-zA-Z0-9-]*[a-zA-Z0-9]+)*$";

      if (pType && !weight.match(checkNegative)) {
        error["weight"] = "Weight should be positive";
        valid = false;
      }

      if (!quantity.match(checkNegative)) {
        error["quantity"] = "Quantity should be positive";
        valid = false;
      }
      if (isVariants && !optprice.match(commaSeperate)) {
        error["optVal"] = "Value should be comma seperated";
        valid = false;
      }
      if (isVariants && !optName.match(commaSeperate)) {
        error["optName"] = "Price should be comma seperated";
        valid = false;
      }

      if (isVariants && !optcItem.match(commaSeperate)) {
        error["optcItem"] = "Price should be comma seperated";
        valid = false;
      }

      if (isVariants && !optcomPrice.match(commaSeperate)) {
        error["optcomPrice"] = "Price should be comma seperated";
        valid = false;
      }
      setError(error);
      if (valid) {
        dispatch(
          addProductToStore(
            props.match.params.id,
            title,
            media,
            price,
            comPrice,
            cItem,
            quantity,
            pType,
            weight ? weight + weighttype : "",
            isVariants,
            prodStatus,
            prodCategory,
            collection,
            tags,
            variants,
            // editorState.getCurrentContent().getPlainText("\u0001")
            // value
            rawMessage
          )
        );
      }
    }
  };

  const doneVariatants = () => {
    variants.push({
      optName: optName,
      optVal: optVal,
      optprice: optprice,
      optcomPrice: optcomPrice,
      optcItem: optcItem,
    });
    console.log("variants", variants);
  };
  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <div className="mobile">
          <Sidebar storeId={props.match.params.id}></Sidebar>
        </div>
        <div className="addproductcontainer">
          <div className="formcontainer">
            <div className="container1">
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              {success && (
                <MessageBox variant="success">{message.message}</MessageBox>
              )}
              <div className="p-3 shadow rounded bg-white">
                <label htmlFor="title">Title</label>
                <br />
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Product Title"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                ></input>
                <br />
                <label htmlFor="description">Description</label>
                <div
                  style={{
                    border: "1px solid black",
                    padding: "2px",
                    minHeight: "300px",
                  }}
                >
                  <Editor
                    initialEditorState={editorState}
                    wrapperClassName="wrapper-class"
                    // toolbarStyle={toolbarStyle}
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "textAlign",
                        "history",
                        "colorPicker",
                      ],
                      inline: {
                        options: ["italic", "bold"],
                        bold: { className: "demo-option-custom" },
                        italic: { className: "demo-option-custom" },
                        underline: { className: "demo-option-custom" },
                        strikethrough: { className: "demo-option-custom" },
                        monospace: { className: "demo-option-custom" },
                        superscript: { className: "demo-option-custom" },
                        subscript: { className: "demo-option-custom" },
                      },
                      blockType: {
                        className: "demo-option-custom-wide",
                        dropdownClassName: "demo-dropdown-custom",
                      },
                      fontSize: { className: "demo-option-custom-medium" },
                    }}
                  />
                </div>
                {/* {console.log(title, editorState)} */}
              </div>

              <div className="mt-4 p-3 shadow rounded bg-white">
                <Form.Group controlId="formFile">
                  <Form.Label>Media</Form.Label>
                  <br />
                  <Form.Control
                    className="w-100"
                    // id="img"
                    name="img"
                    type="file"
                    multiple
                    onChange={(e) => setMedia(e.target.files)}
                  />
                </Form.Group>
                <br />
              </div>
              <div className="mt-4 p-3 shadow rounded bg-white">
                <h6 className="mb-3">Pricing</h6>

                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label htmlFor="price">Price</label>
                    <br />

                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="RS "
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="compareprice">Compare at price</label>
                    <br />

                    <input
                      type="number"
                      id="compareprice"
                      name="compareprice"
                      placeholder="RS "
                      className="form-control"
                      onChange={(e) => setcomPrice(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="cost">Cost per item</label>
                    <br />

                    <input
                      type="number"
                      id="cost"
                      name="cost"
                      placeholder="RS "
                      className="form-control"
                      onChange={(e) => setcItem(e.target.value)}
                    ></input>
                  </div>
                </div>
                <br />
              </div>

              <div className="mt-4 p-3 shadow rounded bg-white">
                <h6 className="mb-3">Inventory</h6>
                <p className="mb-3">QUANTITY</p>
                <div className="pushright row">
                  <div className="col-md-6">
                    <label htmlFor="available">Available</label>
                    <br />

                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="0 "
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    ></input>
                    <br />
                  </div>
                </div>
                <div className="alert-danger">{Error.quantity}</div>{" "}
              </div>

              <div className="mt-4 p-3 shadow rounded bg-white">
                <div className="shipping">
                  <h6 className="mb-3">Shipping</h6>
                  <input
                    type="checkbox"
                    name="physical"
                    id="physical"
                    className="checkbox"
                    onChange={(e) => setpType(e.target.checked)}
                  />
                  This is a physical product
                </div>
                {pType && (
                  <>
                    <p className="mt-2 mb-3">WEIGHT</p>
                    <div className="pushright row">
                      <label htmlFor="weight">Weight</label>
                      <div className="col-md-5">
                        <input
                          type="number"
                          id="weight"
                          name="weight"
                          placeholder="0.0"
                          className="form-control"
                          onChange={(e) => setWeight(e.target.value)}
                        ></input>
                      </div>
                      <div className="col-md-2">
                        <select
                          name="weightin"
                          id="weightin"
                          style={{
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                          }}
                          onChange={(e) => {
                            setweighttype(e.target.value);
                          }}
                        >
                          <option value="kg">kg</option>
                          <option value="g">g</option>
                          <option value="lb">lb</option>
                          <option value="oz">oz</option>
                        </select>
                      </div>
                      <div className="alert-danger">{Error.weight}</div>{" "}
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 p-3 shadow rounded bg-white">
                <h6 className="mb-3">Options</h6>
                <input
                  className="checkbox mb-4"
                  type="checkbox"
                  name="options"
                  id="options"
                  onChange={(e) => {
                    console.log(e);
                    setisVariants(
                      e.target.checked && e.target.checked === true
                        ? true
                        : false
                    );
                  }}
                />
                This product has options, like size or color
                {isVariants && (
                  <div className="options pushright2">
                    {variationLength &&
                      variationLength.map((data) => (
                        <>
                          <label htmlFor="optionname">Option name</label>
                          <input
                            type="text"
                            list="optionname"
                            name="optionname"
                            className="form-control"
                            placeholder="Size"
                            onChange={(e) => setoptName(e.target.value)}
                          />
                          <datalist id="optionname">
                            <option value="Size"></option>
                            <option value="Color"></option>
                            <option value="Material"></option>
                            <option value="Style"></option>
                          </datalist>
                          <br />
                          <label htmlFor="optionvalues">Option values</label>
                          <input
                            type="text"
                            id="optionvalues"
                            name="optionvalues"
                            className="form-control mb-3"
                            placeholder="Small, Medium"
                            onChange={(e) => setoptVal(e.target.value)}
                          />
                          <div className="alert-danger">{Error.optVal}</div>{" "}
                          <div className="mb-3 row">
                            <div className="col-md-6">
                              <label htmlFor="price">Price</label>
                              <br />
                              <input
                                type="text"
                                id="price"
                                name="price"
                                placeholder="RS "
                                className="form-control"
                                onChange={(e) => setOptPrice(e.target.value)}
                              ></input>
                              <div className="alert-danger">
                                {Error.optprice}
                              </div>{" "}
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="compareprice">
                                Compare at price
                              </label>
                              <br />
                              <input
                                type="text"
                                id="compareprice"
                                name="compareprice"
                                placeholder="RS "
                                className="form-control"
                                onChange={(e) => setOptcomPrice(e.target.value)}
                              ></input>
                              <div className="alert-danger">
                                {Error.optcomPrice}
                              </div>{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="cost">Cost per item</label>
                              <br />
                              <input
                                type="text"
                                id="cost"
                                name="cost"
                                placeholder="RS "
                                className="form-control"
                                onChange={(e) => setOptcItem(e.target.value)}
                              ></input>
                              <div className="alert-danger">
                                {Error.optcItem}
                              </div>{" "}
                            </div>
                          </div>
                        </>
                      ))}
                    <button
                      className="mt-4 btn btn-dark"
                      onClick={doneVariatants}
                    >
                      Done
                    </button>
                  </div>
                )}
                <div className="mt-3 addoption">
                  <svg
                    viewBox="0 0 20 20"
                    class="Polaris-Icon__Svg_375hu"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path d="M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2z"></path>
                  </svg>
                  <span
                    className="addoptionbtn"
                    onClick={(e) => {
                      variants.push({
                        optName: optName,
                        optVal: optVal,
                        optprice: optprice,
                        optcomPrice: optcomPrice,
                        optcItem: optcItem,
                      });
                      setVariationLength([...variationLength, 1]);
                    }}
                  >
                    Add another option
                  </span>
                </div>
              </div>
            </div>

            <div className="container2">
              <div className="p-3 shadow rounded bg-white">
                <h6 className="pb-3">Product Status</h6>

                <select
                  name="status"
                  id="status"
                  style={{
                    width: "100%",
                    height: "100%",
                    textIndent: "10px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    setProdStatus(e.target.value);
                  }}
                >
                  <option value="live">Live</option>
                  <option value="draft">Draft</option>
                </select>
                <br />
              </div>

              <div className="mt-4 p-3 shadow rounded bg-white">
                <h6 className="pb-3">PRODUCT TYPE</h6>

                <label htmlFor="category">Category</label>

                <input
                  type="text"
                  id="category"
                  name="category"
                  className="form-control"
                  placeholder="Category"
                  onChange={(e) => setProdCategory(e.target.value)}
                />
                <br />
                <div className="collection">
                  <label htmlFor="collections">COLLECTIONS</label>

                  <input
                    type="text"
                    id="collections"
                    name="collections"
                    className="form-control"
                    placeholder="Collections"
                    onChange={(e) => setCollection(e.target.value)}
                  />
                  <br />
                </div>
                <h6 className="pt-3 pb-3">TAGS</h6>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="form-control"
                  placeholder="Vintage,cotton,summer"
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <p id="error" style={{ display: "none", color: "red" }}>
              Please Fill in the required details
            </p>
          </div>
          <button className="btn btn-dark saveproduct" onClick={addProduct}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(AddProduct);
