import React, { useState } from "react";

import { Form } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
// import { Editor } from "react-draft-wysiwyg";
// import {
//   EditorState,
//   ContentState,
//   convertToRaw,
//   convertFromHTML,
// } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  convertToRaw,
  EditorState,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import { useDispatch, useSelector } from "react-redux";

import {
  addProductToStore,
  editStoreProduct,
} from "../../../Redux/Actions/Products.Actions";

import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import { withRouter } from "react-router-dom";

const EditProduct = (props) => {
  const { from } = props.location.state;
  console.log("from", from.data);
  const dispatch = useDispatch();
  const currentStore = useSelector((state) => state.currentStore);
  const { CurrentStore } = currentStore;
  console.log("CurrentStore", CurrentStore);

  const contentDataState = ContentState.createFromBlockArray(
    convertFromHTML(`${from.data.data[0].product.description}`)
  );
  const editorDataState = EditorState.createWithContent(contentDataState);

  const [editorState, setEditorState] = useState(editorDataState);

  const [title, setTitle] = useState(
    from && from.data.data ? from.data.data[0].product.title : ""
  );
  const [media, setMedia] = useState("");
  const [price, setPrice] = useState(
    from && from.data.data ? from.data.data[0].product.price : ""
  );
  const [comPrice, setcomPrice] = useState(
    from && from.data.data ? from.data.data[0].product.comparedAtPrice : ""
  );
  const [cItem, setcItem] = useState(
    from && from.data.data ? from.data.data[0].product.costPerPrice : ""
  );
  const [quantity, setQuantity] = useState(
    from && from.data.data ? from.data.data[0].product.quantity : ""
  );
  const [pType, setpType] = useState(
    from && from.data.data && from.data.data[0].product.typeOfProduct
  );
  const [weight, setWeight] = useState(
    from && from.data.data ? from.data.data[0].product.weightOfProduct : ""
  );
  const [isVariants, setisVariants] = useState(
    from && from.data.data && from.data.data[2] && from.data.data[2].length > 0
      ? true
      : false
  );
  console.log(from.data.data);
  const [optName, setoptName] = useState("");
  const [optVal, setoptVal] = useState("");

  const [prodStatus, setProdStatus] = useState(
    from && from.data.data && from.data.data[0].product.isDraft == false
      ? "live"
      : "Draft"
  );
  const [prodCategory, setProdCategory] = useState(
    from && from.data.data && from.data.data[0].product.category
  );
  const [collection, setCollection] = useState("");
  const [tags, setTags] = useState(
    from && from.data.data && from.data.data[1].toString()
  );

  const [weighttype, setweighttype] = useState("");

  const [variants, setVariants] = useState([]);

  const [optprice, setOptPrice] = useState("");
  const [optcomPrice, setOptcomPrice] = useState("");
  const [optcItem, setOptcItem] = useState("");

  const [variationLength, setVariationLength] = useState(
    from && from.data.data && from.data.data[2]
      ? from.data.data[2]
      : [
          {
            optName: "",
            optVal: "",
            optprice: "",
            optcomPrice: "",
            optcItem: "",
          },
        ]
  );
  console.log("VE", variationLength);

  const editProduct = useSelector((state) => state.editProduct);
  const { loading, error, success, message } = editProduct;

  const [rawMessage, setRawMessage] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setRawMessage(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  if (success) {
    window.location.href = "/allproducts/" + props.match.params.id;
  }
  const updateProduct = () => {
    dispatch(
      editStoreProduct(
        props.match.params.id,
        title,
        // media,
        price,
        comPrice,
        cItem,
        quantity,
        pType,
        weight + weighttype,
        isVariants,
        prodStatus,
        prodCategory,
        collection,
        tags,
        variationLength,
        // editorState._immutable.currentContent._map._root.entries[0][1]._list
        //   ._tail.array[0][1].text,
        rawMessage,
        from && from.data.data && from.data.data[0].product.productId
      )
    );
  };

  const doneVariatants = () => {
    // setVariationLength([
    //   ...variationLength,
    //   {
    //     optName: optName,
    //     optVal: optVal,
    //     optprice: optprice,
    //     optcomPrice: optcomPrice,
    //     optcItem: optcItem,
    //   },
    // ]);
    // variants.push({
    //   optName: optName,
    //   optVal: optVal,
    //   optprice: optprice,
    //   optcomPrice: optcomPrice,
    //   optcItem: optcItem,
    // });
    console.log("variationLength", variationLength);
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
                  defaultValue={title}
                  value={title}
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
                  {/* <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                  /> */}
                  <Editor
                    editorState={editorState}
                    initialEditorState={editorState}
                    // dangerouslySetInnerHTML={{
                    //   __html: from.data.data[0].product.description,
                    // }}
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
                      defaultValue={price}
                      value={price}
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
                      defaultValue={comPrice}
                      value={comPrice}
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
                      defaultValue={cItem}
                      value={cItem}
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
                      defaultValue={quantity}
                      value={quantity}
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          setQuantity(0);
                        } else {
                          setQuantity(e.target.value);
                        }
                      }}
                    ></input>
                    <br />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 shadow rounded bg-white">
                <div className="shipping">
                  <h6 className="mb-3">Shipping</h6>
                  <input
                    type="checkbox"
                    name="physical"
                    id="physical"
                    className="checkbox"
                    checked={pType}
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
                          defaultValue={weight}
                          value={weight}
                          onChange={(e) => {
                            if (e.target.value < 0) {
                              setWeight(0);
                            } else {
                              setWeight(e.target.value);
                            }
                          }}
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
                  checked={isVariants}
                  value={isVariants}
                  defaultValue={isVariants}
                />
                This product has options, like size or color
                {isVariants && (
                  <div className="options pushright2">
                    {variationLength &&
                      variationLength.map((data, i) => (
                        <>
                          <label htmlFor="optionname">Option name</label>
                          <input
                            type="text"
                            list="optionname"
                            name="optionname"
                            className="form-control"
                            placeholder="Size"
                            defaultValue={data.varientSize}
                            value={data.optName}
                            onChange={(e) => {
                              variationLength[i].varientSize = e.target.value;
                              //   setoptName(e.target.value(i));
                            }}
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
                            defaultValue={data.optVal}
                            placeholder="Small, Medium"
                            value={data.varientColor}
                            onChange={(e) => {
                              variationLength[i].varientColor = e.target.value;
                              // setoptVal(e.target.value(i))
                            }}
                          />

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
                                value={data.optprice}
                                defaultValue={data.varientPrice}
                                onChange={(e) =>
                                  (variationLength[i].varientPrice = parseInt(
                                    e.target.value
                                  ))
                                }
                              ></input>
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
                                value={data.optcomPrice}
                                defaultValue={data.varientComparePrice}
                                onChange={(e) =>
                                  (variationLength[i].varientComparePrice =
                                    parseInt(e.target.value))
                                }
                              ></input>
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
                                value={data.optcItem}
                                defaultValue={data.varientCostPerItem}
                                onChange={(e) =>
                                  (variationLength[i].varientCostPerItem =
                                    parseInt(e.target.value))
                                }
                              ></input>
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
                      console.log("variationLength", variationLength);
                      variants.push({
                        optName: optName,
                        optVal: optVal,
                        optprice: optprice,
                        optcomPrice: optcomPrice,
                        optcItem: optcItem,
                      });
                      setVariationLength([
                        ...variationLength,
                        {
                          optName: optName,
                          optVal: optVal,
                          optprice: optprice,
                          optcomPrice: optcomPrice,
                          optcItem: optcItem,
                        },
                      ]);
                      console.log("AFTER variationLength", variationLength);
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
                  defaultValue={prodStatus}
                  value={prodStatus}
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
                  defaultValue={prodCategory}
                  value={prodCategory}
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
                  defaultValue={tags}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-dark saveproduct" onClick={updateProduct}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(EditProduct);
