const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const multer = require("multer");

const {
  Products,
  Discounts,
  ProductImages,
  ProductVarients,
  Tags,
  Users,
  Stores,
} = require("../models");

const { generateToken, isAuth } = require("../utils.js");

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/products");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

productRouter.post(
  "/add",
  isAuth,
  upload.array("media", 10),
  expressAsyncHandler(async (req, res) => {
    const user = await Users.findOne({
      where: { id: req.user.id },
    }).then(async (user) => {
      const store = await Stores.findAll({
        where: { id: req.body.currentStore, UserId: user.dataValues.id },
      });

      if (store.length > 0) {
        console.log("media", req.files);
        let newVariants = JSON.parse(req.body.variants);
        let arr = [];
        arr.push(req.body.title);
        arr.push(req.body.editorState);
        arr.push(parseInt(req.body.price));
        arr.push(parseInt(req.body.comPrice));
        arr.push(parseInt(req.body.cItem));
        req.body.pType === "" ? arr.push(false) : arr.push(true);
        req.body.weight === "" ? arr.push(null) : arr.push(req.body.weight);
        arr.push(parseInt(req.body.quantity));
        req.body.prodStatus === "live" ? arr.push(0) : arr.push(1);
        let variants = [];

        if (req.body.isVariants === "false") {
          const tags_P = req.body.tags.split(",");
          try {
            const products = await Products.create({
              title: arr[0],
              description: arr[1],
              price: arr[2],
              comparedAtPrice: arr[3],
              costPerPrice: arr[4],
              typeOfProduct: arr[5],
              weightOfProduct: arr[6],
              quantity: arr[7],
              isDraft: arr[8],
              StoreId: req.body.currentStore,
              category: req.body.prodCategory,
              collection: req.body.collection,
            });

            if (products) {
              let n = 0;
              console.log(
                "______________________::::::::::::::::::::::::::",
                products.dataValues.productId
              );
              const tag = tags_P.map((i) => {
                Tags.create({
                  description: i,
                  productId: products.dataValues.productId,
                })
                  .then(() => console.log("Tag Added"))
                  .catch((e) => {
                    n = 1;
                    // res.status(500).send(e);
                  });
              });
              const productImage = req.files.map((data) => {
                ProductImages.create({
                  imageUrl: data.path,
                  productId: products.dataValues.productId,
                })
                  .then(() => console.log("Images Added"))
                  .catch((e) => {
                    n = 1;
                    // res.status(500).send(e);
                  });
              });
              if (n == 0) {
                res.status(201).send({
                  message: "Product Added Successfully",
                });
              }
            }
          } catch (e) {
            return res.status(500).send(e);
          }
        } else {
          console.log("::::::::::", newVariants);
          const tags_P = req.body.tags.split(",");
          try {
            const products = await Products.create({
              title: arr[0],
              description: arr[1],
              price: arr[2],
              comparedAtPrice: arr[3],
              costPerPrice: arr[4],
              typeOfProduct: arr[5],
              weightOfProduct: arr[6],
              quantity: arr[7],
              isDraft: arr[8],
              StoreId: req.body.currentStore,
              category: req.body.prodCategory,
              collection: req.body.collection,
            });

            if (products) {
              let n = 0;
              console.log(
                "______________________::::::::::::::::::::::::::",
                products.dataValues.productId
              );
              const tag = tags_P.map((i) => {
                Tags.create({
                  description: i,
                  productId: products.dataValues.productId,
                })
                  .then(() => console.log("Tag Added"))
                  .catch((e) => {
                    n = 1;
                    // res.status(500).send(e);
                  });
              });
              const productImage = req.files.map((data) => {
                ProductImages.create({
                  imageUrl: data.path,
                  productId: products.dataValues.productId,
                })
                  .then(() => console.log("Images Added"))
                  .catch((e) => {
                    n = 1;
                    // res.status(500).send(e);
                  });
              });
              for (let i = 0; i < newVariants.length; i++) {
                const values = newVariants[i].optVal.split(",");
                const price = newVariants[i].optprice.split(",");
                const comPrice = newVariants[i].optcomPrice.split(",");
                const costperItem = newVariants[i].optcItem.split(",");
                for (let j = 0; j < values.length; j++) {
                  console.log(
                    "::::::::::::::::::::::::",
                    values[i],
                    newVariants[i].optName
                  );
                  const variant = ProductVarients.create({
                    varientSize: newVariants ? newVariants[i].optName : "",
                    varientColor: values ? values[j] : "",
                    varientPrice: newVariants ? price[j] : "",
                    varientComparePrice: newVariants ? comPrice[j] : "",
                    varientCostPerItem: newVariants ? costperItem[j] : "",
                    productId: products.dataValues.productId,
                  })
                    .then(() => console.log("Variant Added"))
                    .catch((e) => {
                      n = 1;
                    });
                }
              }
              if (n == 0) {
                res.status(201).send({
                  message: "Product Added Successfully",
                });
              }
            }
          } catch (e) {
            return res.status(500).send(e);
          }
        }
      } else {
        return res.status(401).send("Unauthorized");
      }
    });
  })
);

productRouter.post(
  "/edit",
  isAuth,
  upload.array("media", 10),
  expressAsyncHandler(async (req, res) => {
    const user = await Users.findOne({
      where: { id: req.user.id },
    }).then(async (user) => {
      const store = await Stores.findAll({
        where: { id: req.body.currentStore, UserId: user.dataValues.id },
      });

      if (store.length > 0) {
        // console.log("media", req.files);
        let newVariants = JSON.parse(req.body.variants);
        let arr = [];
        arr.push(req.body.title);
        arr.push(req.body.editorState);
        arr.push(parseInt(req.body.price));
        arr.push(parseInt(req.body.comPrice));
        arr.push(parseInt(req.body.cItem));
        req.body.pType === "" ? arr.push(false) : arr.push(true);
        req.body.weight === "" ? arr.push(null) : arr.push(req.body.weight);
        arr.push(parseInt(req.body.quantity));
        req.body.prodStatus === "live" ? arr.push(0) : arr.push(1);
        let variants = [];

        console.log("arr[1]", arr);
        // if (req.body.isVariants === "false") {
        const tags_P = req.body.tags.split(",");
        console.log("From Request: ", req.body.tags);
        console.log("Tags_P", tags_P);
        try {
          let products = await Products.findOne({
            where: { productId: req.body.productId },
          }).then(async (product) => {
            // console.log("fsfwefaf", product);
            product.title = arr[0] ? arr[0] : product.title;
            product.description = arr[1] ? arr[1] : product.description;
            product.price = arr[2] ? arr[2] : product.price;
            product.comparedAtPrice = arr[3] ? arr[3] : product.comparedAtPrice;
            product.costPerPrice = arr[4] ? arr[4] : product.costPerPrice;
            product.typeOfProduct = arr[5] ? arr[5] : product.typeOfProduct;
            product.weightOfProduct = arr[6] ? arr[6] : product.weightOfProduct;
            product.quantity = arr[7] ? arr[7] : product.quantity;
            product.isDraft = arr[8] ? arr[8] : product.isDraft;
            product.category = req.body.prodCategory
              ? req.body.prodCategory
              : product.prodCategory;
            product.collection = req.body.collection
              ? req.body.collection
              : product.collection;
            console.log("Dfsf", product);
            await product.save();
            let index = 0;
            // const newT = tags_P.map(async (i) => {
            //   try {
            //     let tags = await Tags.findAll({
            //       where: { productId: req.body.productId },
            //     }).then(async (tag) => {
            //       if (!tag[index]) {
            //         Tags.create({
            //           description: i,
            //           productId: req.body.productId,
            //         });
            //       } else {
            //         console.log(tag);
            //         tag[index].description = i;
            //         await tag[index].save();
            //         index += 1;
            //       }
            //     });
            //   } catch (e) {
            //     console.log(e);
            //   }

            try {
              let tags = await Tags.findAll({
                where: { productId: req.body.productId },
              }).then(async (tag) => {
                for (let k = 0; k < tags_P.length; k++) {
                  if (!tag[k]) {
                    Tags.create({
                      description: tags_P[k],
                      productId: req.body.productId,
                    });
                  } else {
                    tag[k].description = tags_P[k];
                    await tag[k].save();
                  }
                }
              });
            } catch (e) {
              return res.status(500).send(e);
            }
            // console.log("Here", newVariants);
            // const newV = newVariants.map(async (i) => {
            //   try {
            //     let variants = await ProductVarients.findAll({
            //       where: { productId: req.body.productId },
            //     }).then(async (variant) => {
            //       console.log("Inside", variant);
            //       if (!variant[index]) {
            //         ProductVarients.create({
            //           varientSize: i.varientSize,
            //           varientColor: i.varientColor,
            //           varientPrice: i.varientPrice,
            //           varientComparePrice: i.varientComparePrice,
            //           varientCostPerItem: i.varientCostPerItem,
            //           productId: req.body.productId,
            //         });
            //       } else {
            //         variant[index].varientSize = i.varientSize;
            //         variant[index].varientColor = i.varientColor;
            //         variant[index].varientPrice = i.varientPrice;
            //         variant[index].varientComparePrice =
            //           i.varientComparePrice;
            //         variant[index].varientCostPerItem =
            //           i.varientCostPerItem;
            //         await variant[index].save();
            //         index += 1;
            //       }
            //     });
            //   } catch (e) {
            //     console.log(e);
            //   }
            // });
            // for (let i = 0; i < newVariants.length; i++) {
            //   const values = newVariants[i].optVal;
            //   const price = newVariants[i].optprice;
            //   const comPrice = newVariants[i].optcomPrice;
            //   const costperItem = newVariants[i].optcItem;
            //   console.log(values, price);
            //   for (let j = 0; j < values.length; j++) {
            //     console.log(
            //       "::::::::::::::::::::::::",
            //       values[i],
            //       newVariants[i].optName
            //     );
            //     const variants = await ProductVarients.findAll({
            //       where: { productId: req.body.productId },
            //     })
            //       .then(async (variant) => {
            //         console.log("Var", variant);
            //         variant.varientSize = newVariants
            //           ? newVariants[i].optName
            //           : "";
            //         variant.varientColor = values ? values[j] : "";
            //         variant.varientPrice = newVariants ? price[j] : "";
            //         variant.varientComparePrice = newVariants
            //           ? comPrice[j]
            //           : "";
            //         variant.varientCostPerItem = newVariants
            //           ? costperItem[j]
            //           : "";
            //         await variant.save();
            //       })
            //       .then(() => console.log("Variant Added"))
            //       .catch((e) => {
            //         n = 1;
            //       });
            //   }
            // }

            if (newVariants) {
              try {
                let variants = await ProductVarients.findAll({
                  where: { productId: req.body.productId },
                }).then(async (variant) => {
                  for (let k = 0; k < newVariants.length; k++) {
                    if (!variant[k]) {
                      ProductVarients.create({
                        varientSize: newVariants[k].varientSize,
                        varientColor: newVariants[k].varientColor,
                        varientPrice: newVariants[k].varientPrice,
                        varientComparePrice: newVariants[k].varientComparePrice,
                        varientCostPerItem: newVariants[k].varientCostPerItem,
                        productId: req.body.productId,
                      });
                    } else {
                      variant[k].varientSize = newVariants[k].varientSize;
                      variant[k].varientColor = newVariants[k].varientColor;
                      variant[k].varientPrice = newVariants[k].varientPrice;
                      variant[k].varientComparePrice =
                        newVariants[k].varientComparePrice;
                      variant[k].varientCostPerItem =
                        newVariants[k].varientCostPerItem;
                      await variant[k].save();
                    }
                  }
                });
              } catch (e) {
                return res.status(500).send(e);
              }
            }
            res.status(201).send({
              message: "Product Updated Successfully",
            });
          });
        } catch (e) {
          res.status(404).send({ message: "Product does not exist" });
        }
        // try {
        //   products = await Products.findOne({
        //     where: { productId: req.body.productId },
        //   }).then(async (product) => {
        //     product.title = arr[0] ? arr[0] : product.title;
        //     product.description = arr[1] ? arr[1] : product.description;
        //     product.price = arr[2] ? arr[2] : product.price;
        //     product.comparedAtPrice = arr[3]
        //       ? arr[3]
        //       : product.comparedAtPrice;
        //     product.costPerPrice = arr[4] ? arr[4] : product.costPerPrice;
        //     product.typeOfProduct = arr[5] ? arr[5] : product.typeOfProduct;
        //     product.weightOfProduct = arr[6]
        //       ? arr[6]
        //       : product.weightOfProduct;
        //     product.quantity = arr[7] ? arr[7] : product.quantity;
        //     product.isDraft = arr[8] ? arr[8] : product.isDraft;
        //     product.category = req.body.prodCategory
        //       ? req.body.prodCategory
        //       : product.prodCategory;
        //     collection = req.body.collection
        //       ? req.body.collection
        //       : product.collection;

        //     // console.log(product);
        //     // console.log(product);
        //     await product.save();
        //     // const tag = tags_P.map((i) => {
        //     //   Tags.findAll({
        //     //     where: { productId: req.body.productId },
        //     //   })
        //     //     .then(async (tag) => {
        //     //       console.log("Here: ", tag);
        //     //       if (tag) {
        //     //         tag.description = i;
        //     //         console.log(tag);
        //     //         await tag.save();
        //     //       }
        //     //       if (!tag) {
        //     //         Tags.create({
        //     //           description: i,
        //     //           productId: products.dataValues.productId,
        //     //         });
        //     //       }
        //     //     })
        //     //     .then(() => console.log("Tag Added"))
        //     //     .catch((e) => {
        //     //       n = 1;
        //     //       // res.status(500).send(e);
        //     //     });
        //     // });
        //   });
        //   console.log(
        //     "____----------------__________________---------------------________________"
        //   );
        //   // console.log(products);
        //   // if (products) {
        //   let n = 0;
        //   // console.log(
        //   //   "______________________::::::::::::::::::::::::::",
        //   //   products.dataValues.productId
        //   // );
        //   console.log("Pd", req.body.productId);
        //   const tag = tags_P.map((i) => {
        //     Tags.findAll({
        //       where: { productId: req.body.productId },
        //     })
        //       .then(async (tag1) => {
        //         if (tag1) {
        //           // tag.Tags.dataValues.description = i;
        //           console.log(tag1[0].dataValues);
        //           tag1[0].dataValues.description = i;
        //           console.log(tag1);
        //           await tag1[0].save();
        //         }
        //         if (!tag1) {
        //           Tags.create({
        //             description: i,
        //             productId: req.body.productId,
        //           });
        //         }
        //       })
        //       .then(() => console.log("Tag Added"))
        //       .catch((e) => {
        //         n = 1;
        //         // res.status(500).send(e);
        //       });
        //   });
        //   // const productImage = req.files.map((data) => {
        //   //     ProductImages.create({
        //   //             imageUrl: data.path,
        //   //             productId: products.dataValues.productId,
        //   //         })
        //   //         .then(() => console.log("Images Added"))
        //   //         .catch((e) => {
        //   //             n = 1;
        //   //             // res.status(500).send(e);
        //   //         });
        //   // });
        //   if (n == 0) {
        //     res.status(201).send({
        //       message: "Product Updated Successfully",
        //     });
        //   }
        //   // } else {
        //   //   return res.status(404).send({
        //   //     message: "Product does not exists",
        //   //   });
        //   // }
        // } catch (e) {
        //   return res.status(500).send(e);
        // }
        // } else {
        //   console.log("::::::::::", newVariants);
        //   const tags_P = req.body.tags.split(",");
        //   try {
        //     const products = await Products.findOne({
        //       where: { productId: req.body.productId },
        //     }).then(async (product) => {
        //       product.title = arr[0] ? arr[0] : product.title;
        //       product.description = arr[1] ? arr[1] : product.description;
        //       product.price = arr[2] ? arr[2] : product.price;
        //       product.comparedAtPrice = arr[3]
        //         ? arr[3]
        //         : product.comparedAtPrice;
        //       product.costPerPrice = arr[4] ? arr[4] : product.costPerPrice;
        //       product.typeOfProduct = arr[5] ? arr[5] : product.typeOfProduct;
        //       product.weightOfProduct = arr[6]
        //         ? arr[6]
        //         : product.weightOfProduct;
        //       product.quantity = arr[7] ? arr[7] : product.quantity;
        //       product.isDraft = arr[8] ? arr[8] : product.isDraft;
        //       product.category = req.body.prodCategory
        //         ? req.body.prodCategory
        //         : product.prodCategory;
        //       collection = req.body.collection
        //         ? req.body.collection
        //         : product.collection;
        //       await product.save();

        //       if (product) {
        //         let n = 0;

        //         console.log("tags_P", tags_P);
        //         const tag = tags_P.map(async (i) => {
        //           const newTags = await Tags.findOne({
        //             where: { productId: req.body.productId },
        //           })
        //             .then(async (t) => {
        //               console.log(t.description);
        //               if (t) {
        //                 t.description = i;
        //                 await t.save();
        //               }
        //             })
        //             .then(() => {
        //               console.log("Tag Added");
        //             })
        //             .catch((e) => {
        //               console.log(e);
        //               n = 1;
        //               // res.status(500).send(e);
        //             });
        //           console.log("newTags", newTags);
        //           // Tags.create({
        //           //     description: i,
        //           //     productId: req.body.productId,
        //           // });
        //         });

        //         // const productImage = req.files.map((data) => {
        //         //     ProductImages.create({
        //         //             imageUrl: data.path,
        //         //             productId: products.dataValues.productId,
        //         //         })
        //         //         .then(() => console.log("Images Added"))
        //         //         .catch((e) => {
        //         //             n = 1;
        //         //             // res.status(500).send(e);
        //         //         });
        //         // });
        //         for (let i = 0; i < newVariants.length; i++) {
        //           const values = newVariants[i].optVal.split(",");
        //           const price = newVariants[i].optprice.split(",");
        //           const comPrice = newVariants[i].optcomPrice.split(",");
        //           const costperItem = newVariants[i].optcItem.split(",");
        //           for (let j = 0; j < values.length; j++) {
        //             console.log(
        //               "::::::::::::::::::::::::",
        //               values[i],
        //               newVariants[i].optName
        //             );
        //             const variant = ProductVarients.findAll({
        //               where: { productId: req.body.productId },
        //             })
        //               .then(async (variant) => {
        //                 variant.varientSize = newVariants
        //                   ? newVariants[i].optName
        //                   : "";
        //                 variant.varientColor = values ? values[j] : "";
        //                 variant.varientPrice = newVariants ? price[j] : "";
        //                 variant.varientComparePrice = newVariants
        //                   ? comPrice[j]
        //                   : "";
        //                 variant.varientCostPerItem = newVariants
        //                   ? costperItem[j]
        //                   : "";
        //                 await variant.save();
        //               })
        //               .then(() => console.log("Variant Added"))
        //               .catch((e) => {
        //                 n = 1;
        //               });
        //           }
        //         }
        //         if (n == 0) {
        //           res.status(201).send({
        //             message: "Product Added Successfully",
        //           });
        //         }
        //       }
        //     });
        //   } catch (e) {
        //     return res.status(500).send(e);
        //   }
        // }
      } else {
        return res.status(401).send("Unauthorized");
      }
    });
  })
);

productRouter.post(
  "/getproductdetails",

  expressAsyncHandler(async (req, res) => {
    try {
      let products = [];
      let items = [];
      let tagArray = [];
      let imageArray = [];
      let variantArray = [];
      const product = await Products.findOne({
        where: { productId: req.body.currentProduct },
      }).then(async (product) => {
        if (!product) {
          return res.status(404).send({
            message: "Product does not exists",
          });
        }
        if (product) {
          items = [
            ...items,
            {
              product: {
                productId: product.dataValues.productId,
                title: product.dataValues.title,
                description: product.dataValues.description,
                price: product.dataValues.price,
                comparedAtPrice: product.dataValues.comparedAtPrice,
                costPerPrice: product.dataValues.costPerPrice,

                typeOfProduct: product.dataValues.typeOfProduct,
                weightOfProduct: product.dataValues.weightOfProduct,
                quantity: product.dataValues.quantity,
                isDraft: product.dataValues.isDraft,
                category: product.dataValues.category,
              },
            },
          ];
          const productImage = await ProductImages.findAll({
            where: { productId: product.dataValues.productId },
          });
          const productTag = await Tags.findAll({
            where: { productId: product.dataValues.productId },
          });
          if (productTag) {
            for (let k = 0; k < productTag.length; k++) {
              tagArray.push(productTag[k].dataValues.description);
            }
            items.push(tagArray);
          }
          const productVarient = await ProductVarients.findAll({
            where: { productId: product.dataValues.productId },
          });
          if (productVarient) {
            for (let l = 0; l < productVarient.length; l++) {
              variantArray.push({
                varientSize: productVarient[l].dataValues.varientSize,
                varientColor: productVarient[l].dataValues.varientColor,
                varientPrice: productVarient[l].dataValues.varientPrice,
                varientComparePrice:
                  productVarient[l].dataValues.varientComparePrice,
                varientCostPerItem:
                  productVarient[l].dataValues.varientCostPerItem,
              });
            }
            items.push(variantArray);
          }
          if (productImage) {
            for (let j = 0; j < productImage.length; j++) {
              imageArray.push(productImage[j].dataValues.imageUrl);
            }
            items.push(imageArray);
          }

          imageArray = [];
          tagArray = [];
          variantArray = [];
        }

        res.send({
          items,
        });
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  })
);

productRouter.post(
  "/increasequantity",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await Users.findOne({
        where: { id: req.user.id },
      }).then(async (user) => {
        if (user) {
          const product = await Products.findOne({
            where: { productId: req.body.currentProduct },
          }).then(async (product) => {
            if (!product) {
              return res.status(404).send({
                message: "Product does not exists",
              });
            }
            if (product) {
              product.quantity = req.body.qty;
              const updatedProduct = await product.save();

              res.status(201).send({
                message: "Product Updated Successfully",
              });
            }
          });
        }
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  })
);

productRouter.delete(
  "/deleteproduct/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log("deleteproduct");
    try {
      const user = await Users.findOne({
        where: { id: req.user.id },
      }).then(async (user) => {
        if (!user) {
          return res.status(404).send({
            message: "User does not exists",
          });
        }
        if (user) {
          Products.destroy({
            where: {
              productId: req.params.id,
            },
          }).then(
            function (rowDeleted) {
              res.status(201).send({
                message: "Product Deleted Successfully",
              });
            },
            function (err) {
              console.log(err);
              return res.status(500).send(err);
            }
          );
        }
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  })
);

module.exports = productRouter;
