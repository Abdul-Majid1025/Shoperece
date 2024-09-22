const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const multer = require("multer");

const db = require("../models/index");
const {
  Stores,
  Products,
  ProductImages,
  Tags,
  ProductVarients,
  Users,
  sequelize,
} = require("../models");

const { generateToken, isAuth } = require("../utils.js");
const { resolve } = require("path");

const storeRouter = express.Router();

async function getTotalSalesofStore(storeId) {
  const sales = await db.sequelize.query(
    `select sum("totalAmount") as sales from "Orders" where "StoreId"='${storeId}'`
  );
  // console.log("Total Sales", sales[0][0].sales);
  return sales[0][0].sales;
}

// getTotalSalesofStore("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((data) =>
//   console.log(data)
// );

async function getSalesByDay(storeId) {
  const sales = await db.sequelize.query(
    `select CONCAT(extract(Day from "orderPlacedDate"), '-', to_char("orderPlacedDate", 'MONTH'), extract(YEAR from "orderPlacedDate")) as datemon,
      sum("totalAmount") as sales from "Orders" where "StoreId"='${storeId}' group by extract(YEAR from "orderPlacedDate"), to_char("orderPlacedDate", 'MONTH'),
      extract(DAY from "orderPlacedDate")`
  );
  // console.log("Day by day sales", sales[0]);
  return [...sales[0]];
}

// getSalesByDay("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((data) =>
//   console.log(data)
// );

async function getReturningRate(storeId) {
  const data = await db.sequelize.query(
    `select "customerId", concat(extract(DAY from "orderPlacedDate"), '-', regexp_replace(to_char("orderPlacedDate", 'MONTH'), '\s+$', ''), ', ', extract(YEAR from "orderPlacedDate")), count(*) from "Orders"
    where "StoreId"='${storeId}'
    group by "customerId", extract(YEAR from "orderPlacedDate"), to_char("orderPlacedDate", 'MONTH'), extract(DAY from "orderPlacedDate")`
  );
  const hash = new Map();
  const arr = [...data[0]];
  for (let i = 0; i < arr.length; i++) {
    if (hash.get(arr[i].customerId)) {
      let a = hash.get(arr[i].customerId);
      hash.set(arr[i].customerId, parseInt(arr[i].count) + parseInt(a));
    } else {
      hash.set(arr[i].customerId, parseInt(arr[i].count));
    }
  }
  const map1 = new Map([...hash].filter(([k, v]) => v > 1));
  console.log("Jash", hash, map1);
  let rate = (map1.size / hash.size) * 100;
  let res = [];
  let arr1 = [...map1];
  for (let i = 0; i < arr1.length; i++) {
    let b = arr1[i][0];
    let c = arr.filter((d) => {
      return d.customerId === b;
    });
    res.push(...c);
  }
  const map2 = new Map();
  for (let i = 0; i < res.length; i++) {
    if (map2.get(res[i].concat)) {
      let a = map2.get(arr[i].concat);
      map2.set(arr[i].concat, a + 1);
    } else {
      map2.set(arr[i].concat, 1);
    }
  }
  let arr2 = [...map2];
  const obj = {
    points: [...arr2],
    rate: rate,
  };
  return obj;
}

// getReturningRate("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((d) =>
//   console.log("done", d)
// );

async function getAverageOrderValue(storeId) {
  const data = await db.sequelize.query(
    `select avg("totalAmount") from "Orders"
    where "StoreId"='${storeId}'`
  );
  return data[0][0].avg;
}

// getAverageOrderValue("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((d) =>
//   console.log("done", d)
// );

async function getOrderCountByDay(storeId) {
  const data = await db.sequelize.query(
    `select concat(extract(DAY from "orderPlacedDate"), '-', regexp_replace(to_char("orderPlacedDate", 'MONTH'), '\s+$', ''), ', ', extract(YEAR from "orderPlacedDate")), count(*) from "Orders"
    where "StoreId"='${storeId}'
    group by extract(YEAR from "orderPlacedDate"), to_char("orderPlacedDate", 'MONTH'), extract(DAY from "orderPlacedDate")`
  );
  return [...data[0]];
}

// getOrderCountByDay("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((d) =>
//   console.log("done", d)
// );

async function getTopSoldProducts(storeId) {
  const data = await db.sequelize.query(
    `select p1."title", sum(oi."quantity") as total from "OrderItems" oi
    join "Orders" o on oi."OrderId"=o."id"
    join "Products" p1  on oi."productId"=p1."productId"
    where o."StoreId"='${storeId}'
    group by oi."productId", p1."title"
    order by total desc limit 3`
  );
  return [...data[0]];
}

async function getTotalProfit(storeId) {
  const data = await db.sequelize.query(
    `select sum(p1."price" - p1."costPerPrice") as Profit from "Orders" o
    join "OrderItems" o1 on o."id" = o1."OrderId"
    join "Products" p1 on o1."productId"=p1."productId"
    where o."StoreId"='${storeId}'`
  );
  return data[0][0].profit;
}

async function getTotalCustomers(storeId) {
  const data = await db.sequelize.query(
    `select count(distinct o."customerId") from "Orders" o
    where o."StoreId"='${storeId}'`
  );
  return data[0][0].count;
}

async function getOrderPaymentTrend(storeId) {
  const data = await db.sequelize.query(
    `select o."transactionMethod", count(*)
    from "Orders" o
    where o."StoreId"='${storeId}'
    group by o."transactionMethod"`
  );
  return [...data[0]];
}

async function getOrderStatus(storeId) {
  const data = await db.sequelize.query(
    `select o."orderStatus", count(*)
    from "Orders" o
    where o."StoreId"='${storeId}'
    group by o."orderStatus"`
  );
  return [...data[0]];
}

// getOrderStatus("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((d) =>
//   console.log("Done")
// );

// getOrderPaymentTrend("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((d) =>
//   console.log("Done")
// );

// getTotalCustomers("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((d) =>
//   console.log("Done")
// );

// getTotalProfit("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((d) =>
//   console.log("Done")
// );

// getTopSoldProducts("94f79880-9bd0-11ec-9af8-2d8c19b87a09").then((d) =>
//   console.log("done", d)
// );

storeRouter.get(
  "/all",
  expressAsyncHandler(async (req, res) => {
    let array = [];
    const store = await Stores.findAll({});

    for (let i = 0; i < store.length; i++) {
      array.push({
        id: store[i].dataValues.id,
        storeName: store[i].dataValues.storeName,
        firstName: store[i].dataValues.firstName,
        lastName: store[i].dataValues.lastName,
        address: store[i].dataValues.address,
        apartment: store[i].dataValues.apartment,
        city: store[i].dataValues.city,
        postalCode: store[i].dataValues.postalCode,
        phone: store[i].dataValues.phone,
        url: store[i].dataValues.url,
        isRegistered: store[i].dataValues.isRegistered,
        UserId: store[i].dataValues.UserId,
        storeImage: store[i].dataValues.storeImage,
      });
    }
    res.send(array);

    console.log("store", array);
  })
);

storeRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    let array = [];
    const user = await Users.findOne({
      where: { id: req.user.id },
    }).then(async (user) => {
      const store = await Stores.findAll({
        where: { UserId: req.user.id },
      });
      for (let i = 0; i < store.length; i++) {
        array.push({
          id: store[i].dataValues.id,
          storeName: store[i].dataValues.storeName,
          firstName: store[i].dataValues.firstName,
          lastName: store[i].dataValues.lastName,
          address: store[i].dataValues.address,
          apartment: store[i].dataValues.apartment,
          city: store[i].dataValues.city,
          postalCode: store[i].dataValues.postalCode,
          phone: store[i].dataValues.phone,
          url: store[i].dataValues.url,
          isRegistered: store[i].dataValues.isRegistered,
          UserId: store[i].dataValues.UserId,
          storeImage: store[i].dataValues.storeImage,
        });
      }
      res.send(array);
    });
  })
);
storeRouter.get(
  "/getsinglestoreinfo/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log("single");
    let array = [];
    const user = await Users.findOne({
      where: { id: req.user.id },
    }).then(async (user) => {
      const store = await Stores.findAll({
        where: { id: req.params.id },
      });
      for (let i = 0; i < store.length; i++) {
        array.push({
          id: store[i].dataValues.id,
          storeName: store[i].dataValues.storeName,
          firstName: store[i].dataValues.firstName,
          lastName: store[i].dataValues.lastName,
          address: store[i].dataValues.address,
          apartment: store[i].dataValues.apartment,
          city: store[i].dataValues.city,
          postalCode: store[i].dataValues.postalCode,
          phone: store[i].dataValues.phone,
          url: store[i].dataValues.url,
          isRegistered: store[i].dataValues.isRegistered,
          UserId: store[i].dataValues.UserId,
          storeImage: store[i].dataValues.storeImage,
        });
      }
      res.send(array);
    });
  })
);

storeRouter.get(
  "/getstoreinfo/:id",
  expressAsyncHandler(async (req, res) => {
    let arr = [];
    const store = await Stores.findAll({
      where: { id: req.params.id },
    });
    if (store) {
      const ps = new Map();

      const prod = await db.sequelize.query(
        `select pv."productId", pv."title", pv."description", pv."price", pv."comparedAtPrice", pv."costPerPrice", pv."typeOfProduct", pv."weightOfProduct", pv."quantity", pv."isDraft", pv."category", pv."collection", pv."StoreId", pi."imageId", pi."imageUrl", ta."tagId", ta."description" tagDesc, pav."varientId", pav."varientSize", pav."varientColor", pav."varientPrice", pav."varientComparePrice", pav."varientCostPerItem" from "Products" pv
          join "ProductImages" pi on pv."productId"=pi."productId"
          left join "Tags" ta on ta."productId"=pv."productId"
          left join "ProductVarients" pav on pav."productId"=pv."productId"
          where pv."StoreId"='${req.params.id}' and "isDraft"='false'`
      );
      console.log("Here: ", prod);
      console.log("Here123", prod[0][0]);

      for (let i = 0; i < prod[0].length; i++) {
        if (!ps.get(prod[0][i].productId)) {
          const p = {
            title: prod[0][i].title,
            description: prod[0][i].description,
            price: prod[0][i].price,
            comparedAtPrice: prod[0][i].comparedAtPrice,
            costPerPrice: prod[0][i].costPerPrice,
            typeOfProduct: prod[0][i].typeOfProduct,
            weightOfProduct: prod[0][i].weightOfProduct,
            quantity: prod[0][i].quantity,
            isDraft: prod[0][i].isDraft,
            category: prod[0][i].category,
            collection: prod[0][i].collection,
            StoreId: prod[0][i].StoreId,
            Images: [
              {
                ImageId: prod[0][i].imageId,
                imageUrl: prod[0][i].imageUrl,
              },
            ],
            Tags: [
              {
                TagID: prod[0][i].tagId,
                tagDescription: prod[0][i].tagdesc,
              },
            ],
            Varients: [
              {
                varientId: prod[0][i].varientId,
                varientSize: prod[0][i].varientSize,
                varientColor: prod[0][i].varientColor,
                varientPrice: prod[0][i].varientPrice,
                varientComparePrice: prod[0][i].varientComparePrice,
                varientCostPerItem: prod[0][i].varientCostPerItem,
              },
            ],
          };
          ps.set(prod[0][i].productId, p);
        } else {
          const p = ps.get(prod[0][i].productId);
          p.Images.push({
            ImageId: prod[0][i].imageId,
            imageUrl: prod[0][i].imageUrl,
          });
          p.Tags.push({
            TagID: prod[0][i].tagId,
            tagDescription: prod[0][i].tagdesc,
          });
          p.Varients.push({
            varientId: prod[0][i].varientId,
            varientSize: prod[0][i].varientSize,
            varientColor: prod[0][i].varientColor,
            varientPrice: prod[0][i].varientPrice,
            varientComparePrice: prod[0][i].varientComparePrice,
            varientCostPerItem: prod[0][i].varientCostPerItem,
          });
          ps.set(prod[0][i].productId, p);
        }
      }
      // console.log(ps.get("662e9ee0-b818-11ec-9b78-29950395f0bc").Tags);

      for (const [key, value] of ps) {
        let arr1 = [];
        let obj = {
          product: {
            productId: key,
            title: value.title,
            description: value.description,
            price: value.price,
            comparedAtPrice: value.comparedAtPrice,
            costPerPrice: value.costPerPrice,
            typeOfProduct: value.typeOfProduct,
            weightOfProduct: value.weightOfProduct,
            quantity: value.quantity,
            isDraft: value.isDraft,
            category: value.category,
          },
        };
        arr1.push(obj);
        const arrUniq = [
          ...new Map(value.Tags.map((v) => [v.TagID, v])).values(),
        ];
        console.log("arrUniq", arrUniq);
        const tg = arrUniq.map((v) => v.tagDescription);
        console.log(tg);
        arr1.push(tg);
        const arrUniq1 = [
          ...new Map(value.Varients.map((v) => [v.varientId, v])).values(),
        ];
        const variant = arrUniq1.filter((v) => {
          if (!(v.varientId == null)) {
            v;
          }
        });
        // console.log("Var:", arrUniq1[0].varientId == null);
        arr1.push(variant);
        const arrUniq2 = [
          ...new Map(value.Images.map((v) => [v.ImageId, v])).values(),
        ];
        const img = arrUniq2.map((v) => v.imageUrl);
        arr1.push(img);
        arr.push(arr1);
      }
      // const product = await Products.findAll({
      //   where: { StoreId: store[0].dataValues.id, isDraft: false },
      // });

      // for (let i = 0; i < product.length; i++) {
      //   items = [
      //     ...items,
      //     {
      //       product: {
      //         productId: product[i].dataValues.productId,
      //         title: product[i].dataValues.title,
      //         description: product[i].dataValues.description,
      //         price: product[i].dataValues.price,
      //         comparedAtPrice: product[i].dataValues.comparedAtPrice,
      //         costPerPrice: product[i].dataValues.costPerPrice,

      //         typeOfProduct: product[i].dataValues.typeOfProduct,
      //         weightOfProduct: product[i].dataValues.weightOfProduct,
      //         quantity: product[i].dataValues.quantity,
      //         isDraft: product[i].dataValues.isDraft,
      //         category: product[i].dataValues.category,
      //       },
      //     },
      //   ];
      //   const productImage = await ProductImages.findAll({
      //     where: { productId: product[i].dataValues.productId },
      //   });
      //   const productTag = await Tags.findAll({
      //     where: { productId: product[i].dataValues.productId },
      //   });
      //   if (productTag) {
      //     for (let k = 0; k < productTag.length; k++) {
      //       tagArray.push(productTag[k].dataValues.description);
      //       // items = [
      //       //     ...items,
      //       //     {
      //       //         productTag: {
      //       //             tagDescription: productTag[k].dataValues.description,
      //       //         },
      //       //     },
      //       // ];
      //     }
      //     items.push(tagArray);
      //   }
      //   const productVarient = await ProductVarients.findAll({
      //     where: { productId: product[i].dataValues.productId },
      //   });
      //   if (productVarient) {
      //     for (let l = 0; l < productVarient.length; l++) {
      //       variantArray.push({
      //         varientSize: productVarient[l].dataValues.varientSize,
      //         varientColor: productVarient[l].dataValues.varientColor,
      //         varientPrice: productVarient[l].dataValues.varientPrice,
      //         varientComparePrice:
      //           productVarient[l].dataValues.varientComparePrice,
      //         varientCostPerItem:
      //           productVarient[l].dataValues.varientCostPerItem,
      //       });
      //       // items = [
      //       //     ...items,
      //       //     {
      //       //         productVarient: {
      //       //             varientSize: productVarient[l].dataValues.varientSize,
      //       //             varientColor: productVarient[l].dataValues.varientColor,
      //       //             varientPrice: productVarient[l].dataValues.varientPrice,
      //       //             varientComparePrice: productVarient[l].dataValues.varientComparePrice,
      //       //             varientCostPerItem: productVarient[l].dataValues.varientCostPerItem,
      //       //         },
      //       //     },
      //       // ];
      //     }
      //     items.push(variantArray);
      //   }
      //   if (productImage) {
      //     for (let j = 0; j < productImage.length; j++) {
      //       imageArray.push(productImage[j].dataValues.imageUrl);
      //       // items = [
      //       //     ...items,
      //       //     {
      //       //         ImageUrls: {
      //       //             imageUrl: productImage[j].dataValues.imageUrl,
      //       //         },
      //       //     },
      //       // ];
      //     }
      //     items.push(imageArray);
      //   }

      //   products.push(items);
      //   items = [];
      //   imageArray = [];
      //   tagArray = [];
      //   variantArray = [];
      // }
      // console.log("products", products);
    }
    res.send({
      id: store[0].dataValues.id,
      storeName: store[0].dataValues.storeName,
      firstName: store[0].dataValues.firstName,
      lastName: store[0].dataValues.lastName,
      address: store[0].dataValues.address,
      apartment: store[0].dataValues.apartment,
      city: store[0].dataValues.city,
      postalCode: store[0].dataValues.postalCode,
      phone: store[0].dataValues.phone,
      url: store[0].dataValues.url,
      isRegistered: store[0].dataValues.isRegistered,
      UserId: store[0].dataValues.UserId,
      storeImage: store[0].dataValues.storeImage,
      products: arr,
    });
  })
);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/storedisplayimages");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

storeRouter.post(
  "/create",
  isAuth,
  upload.single("file"),
  expressAsyncHandler(async (req, res) => {
    const user = await Users.findOne({
      where: { id: req.user.id },
    }).then(async (user) => {
      try {
        const store = await Stores.create({
          storeName: req.body.storeName,

          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,

          apartment: req.body.apartment,
          city: req.body.city,
          postalCode: req.body.postalCode,
          phone: req.body.phone,
          storeImage: req.file.path,
          url: req.body.url,
          isRegistered: req.body.isRegistered,
          UserId: req.body.id,
        });
        if (store) {
          res.status(201).send({
            message: "Store Created Successfully",
          });
        }
      } catch (e) {
        return res.status(500).send(e);
      }
    });
  })
);
storeRouter.post(
  "/getallproducts",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await Users.findOne({
      where: { id: req.user.id },
    }).then(async (u) => {
      const store = await Stores.findAll({
        where: { UserId: u.dataValues.id, id: req.body.CurrentStore },
      });
      if (store.length > 0) {
        console.log("store", store);
        let products = [];
        let items = [];
        let tagArray = [];
        let imageArray = [];
        let variantArray = [];

        // const product = await Products.findAll({
        //   where: { StoreId: req.body.CurrentStore },
        // });

        const ps = new Map();

        const prod = await db.sequelize.query(
          `select pv."productId", pv."title", pv."description", pv."price", pv."comparedAtPrice", pv."costPerPrice", pv."typeOfProduct", pv."weightOfProduct", pv."quantity", pv."isDraft", pv."category", pv."collection", pv."StoreId", pi."imageId", pi."imageUrl", ta."tagId", ta."description" tagDesc, pav."varientId", pav."varientSize", pav."varientColor", pav."varientPrice", pav."varientComparePrice", pav."varientCostPerItem" from "Products" pv
          join "ProductImages" pi on pv."productId"=pi."productId"
          left join "Tags" ta on ta."productId"=pv."productId"
          left join "ProductVarients" pav on pav."productId"=pv."productId"
          where pv."StoreId"='${req.body.CurrentStore}'`
        );
        console.log("Here: ", prod);
        console.log("Here123", prod[0][0]);

        for (let i = 0; i < prod[0].length; i++) {
          if (!ps.get(prod[0][i].productId)) {
            const p = {
              title: prod[0][i].title,
              description: prod[0][i].description,
              price: prod[0][i].price,
              comparedAtPrice: prod[0][i].comparedAtPrice,
              costPerPrice: prod[0][i].costPerPrice,
              typeOfProduct: prod[0][i].typeOfProduct,
              weightOfProduct: prod[0][i].weightOfProduct,
              quantity: prod[0][i].quantity,
              isDraft: prod[0][i].isDraft,
              category: prod[0][i].category,
              collection: prod[0][i].collection,
              StoreId: prod[0][i].StoreId,
              Images: [
                {
                  ImageId: prod[0][i].imageId,
                  imageUrl: prod[0][i].imageUrl,
                },
              ],
              Tags: [
                {
                  TagID: prod[0][i].tagId,
                  tagDescription: prod[0][i].tagdesc,
                },
              ],
              Varients: [
                {
                  varientId: prod[0][i].varientId,
                  varientSize: prod[0][i].varientSize,
                  varientColor: prod[0][i].varientColor,
                  varientPrice: prod[0][i].varientPrice,
                  varientComparePrice: prod[0][i].varientComparePrice,
                  varientCostPerItem: prod[0][i].varientCostPerItem,
                },
              ],
            };
            ps.set(prod[0][i].productId, p);
          } else {
            const p = ps.get(prod[0][i].productId);
            p.Images.push({
              ImageId: prod[0][i].imageId,
              imageUrl: prod[0][i].imageUrl,
            });
            p.Tags.push({
              TagID: prod[0][i].tagId,
              tagDescription: prod[0][i].tagdesc,
            });
            p.Varients.push({
              varientId: prod[0][i].varientId,
              varientSize: prod[0][i].varientSize,
              varientColor: prod[0][i].varientColor,
              varientPrice: prod[0][i].varientPrice,
              varientComparePrice: prod[0][i].varientComparePrice,
              varientCostPerItem: prod[0][i].varientCostPerItem,
            });
            ps.set(prod[0][i].productId, p);
          }
        }
        // console.log(ps.get("662e9ee0-b818-11ec-9b78-29950395f0bc").Tags);
        let arr = [];

        for (const [key, value] of ps) {
          let arr1 = [];
          let obj = {
            product: {
              productId: key,
              title: value.title,
              description: value.description,
              price: value.price,
              comparedAtPrice: value.comparedAtPrice,
              costPerPrice: value.costPerPrice,
              typeOfProduct: value.typeOfProduct,
              weightOfProduct: value.weightOfProduct,
              quantity: value.quantity,
              isDraft: value.isDraft,
              category: value.category,
            },
          };
          arr1.push(obj);
          const arrUniq = [
            ...new Map(value.Tags.map((v) => [v.TagID, v])).values(),
          ];
          console.log("arrUniq", arrUniq);
          const tg = arrUniq.map((v) => v.tagDescription);
          console.log(tg);
          arr1.push(tg);
          const arrUniq1 = [
            ...new Map(value.Varients.map((v) => [v.varientId, v])).values(),
          ];
          const variant = [
            ...arrUniq1.filter((v) => {
              if (!(v.varientId == null)) {
                return v;
              }
            }),
          ];
          console.log(variant);
          // console.log("Var:", arrUniq1[0].varientId == null);
          arr1.push(variant);
          const arrUniq2 = [
            ...new Map(value.Images.map((v) => [v.ImageId, v])).values(),
          ];
          const img = arrUniq2.map((v) => v.imageUrl);
          arr1.push(img);
          arr.push(arr1);
        }
        console.log(arr);

        // for (let i = 0; i < product.length; i++) {
        //   items = [
        //     ...items,
        //     {
        //       product: {
        //         productId: product[i].dataValues.productId,
        //         title: product[i].dataValues.title,
        //         description: product[i].dataValues.description,
        //         price: product[i].dataValues.price,
        //         comparedAtPrice: product[i].dataValues.comparedAtPrice,
        //         costPerPrice: product[i].dataValues.costPerPrice,

        //         typeOfProduct: product[i].dataValues.typeOfProduct,
        //         weightOfProduct: product[i].dataValues.weightOfProduct,
        //         quantity: product[i].dataValues.quantity,
        //         isDraft: product[i].dataValues.isDraft,
        //         category: product[i].dataValues.category,
        //       },
        //     },
        //   ];
        //   // const productImage = await ProductImages.findAll({
        //   //   where: { productId: product[i].dataValues.productId },
        //   // });

        //   const productImage = await db.sequelize.query(
        //     `select * from "ProductImages" where "productId"='${product[i].dataValues.productId}'`,
        //     {
        //       model: ProductImages,
        //       mapToModel: true,
        //     }
        //   );

        //   // const productTag = await Tags.findAll({
        //   //   where: { productId: product[i].dataValues.productId },
        //   // });
        //   const productTag = await db.sequelize.query(
        //     `select * from "Tags" where "productId"='${product[i].dataValues.productId}'`,
        //     {
        //       model: Tags,
        //       mapToModel: true,
        //     }
        //   );
        //   if (productTag) {
        //     for (let k = 0; k < productTag.length; k++) {
        //       tagArray.push(productTag[k].dataValues.description);
        //     }
        //     items.push(tagArray);
        //   }
        //   // const productVarient = await ProductVarients.findAll({
        //   //   where: { productId: product[i].dataValues.productId },
        //   // });
        //   const productVarient = await db.sequelize.query(
        //     `select * from "ProductVarients" where "productId"='${product[i].dataValues.productId}'`,
        //     {
        //       model: ProductVarients,
        //       mapToModel: true,
        //     }
        //   );
        //   if (productVarient) {
        //     for (let l = 0; l < productVarient.length; l++) {
        //       variantArray.push({
        //         varientId: productVarient[l].dataValues.varientId,
        //         optName: productVarient[l].dataValues.varientSize,
        //         optVal: productVarient[l].dataValues.varientColor,
        //         optprice: productVarient[l].dataValues.varientPrice,
        //         optcomPrice: productVarient[l].dataValues.varientComparePrice,
        //         optcItem: productVarient[l].dataValues.varientCostPerItem,
        //       });
        //     }
        //     items.push(variantArray);
        //   }
        //   if (productImage) {
        //     for (let j = 0; j < productImage.length; j++) {
        //       imageArray.push(productImage[j].dataValues.imageUrl);
        //     }
        //     items.push(imageArray);
        //   }

        //   products.push(items);
        //   items = [];
        //   imageArray = [];
        //   tagArray = [];
        //   variantArray = [];
        // }
        console.log("products", products);

        res.send({
          products: arr,
        });
      } else {
        return res.status(401).send("Unauthorized");
      }
    });
  })
);

storeRouter.post(
  "/getproductsquntity",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await Users.findOne({
      where: { id: req.user.id },
    }).then(async (u) => {
      const store = await Stores.findAll({
        where: { UserId: u.dataValues.id, id: req.body.CurrentStore },
      });
      if (store.length > 0) {
        console.log("store", store);
        let items = [];

        const product = await Products.findAll({
          where: { StoreId: req.body.CurrentStore },
        });

        for (let i = 0; i < product.length; i++) {
          items = [
            ...items,
            {
              product: {
                productId: product[i].dataValues.productId,
                title: product[i].dataValues.title,
                description: product[i].dataValues.description,
                price: product[i].dataValues.price,
                comparedAtPrice: product[i].dataValues.comparedAtPrice,
                costPerPrice: product[i].dataValues.costPerPrice,

                typeOfProduct: product[i].dataValues.typeOfProduct,
                weightOfProduct: product[i].dataValues.weightOfProduct,
                quantity: product[i].dataValues.quantity,
                isDraft: product[i].dataValues.isDraft,
                category: product[i].dataValues.category,
              },
            },
          ];
        }

        res.send({
          items,
        });
      } else {
        return res.status(401).send("Unauthorized");
      }
    });
  })
);

storeRouter.delete(
  "/deletestore/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      // Step 1 - Verify a user with the email exists
      const user = await Users.findOne({
        where: { id: req.user.id },
      }).then(async (user) => {
        if (!user) {
          return res.status(404).send({
            message: "User does not exists",
          });
        }

        if (user) {
          Stores.destroy({
            where: {
              id: req.params.id,
            },
          }).then(
            function (rowDeleted) {
              res.status(201).send({
                message: "Store Deleted Successfully",
              });
            },
            function (err) {
              console.log(err);
              return res.status(500).send(err);
            }
          );
        }
      });
      // Step 2 - Ensure the account has been verified
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

storeRouter.post(
  "/getallcustomers",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log("getallcustomers", req.body);
    const user = await Users.findOne({
      where: { id: req.user.id },
    }).then(async (u) => {
      const store = await Stores.findAll({
        where: { UserId: u.dataValues.id, id: req.body.CurrentStore },
      });
      if (store.length > 0) {
        console.log("store", store);
        let users = [];
        const allUsers = await db.sequelize.query(
          `select "username", count(*) "totalOrders", sum("totalAmount") "totalAmount" from "Orders" join "Customers" on "Orders"."customerId"="Customers"."id" where "StoreId"='${req.body.CurrentStore}'
          group by "Customers"."id";`
        );

        console.log("Customers", allUsers);
        res.send({
          customers: allUsers,
        });
      } else {
        return res.status(401).send("Unauthorized");
      }
    });
  })
);
//req.params.id => storeId
//req.user.id => userId
storeRouter.post(
  "/analytics/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await Users.findOne({
      where: { id: req.user.id },
    }).then(async (u) => {
      if (!u) {
        console.log("No User Exists");
        return res.status(404).send({
          message: "User does not exists",
        });
      }
      const storeId = req.params.id;
      const Tsales = await getTotalSalesofStore(storeId);
      const salesByDay = await getSalesByDay(storeId);
      const returningRate = await getReturningRate(storeId);
      const avgOrderValue = await getAverageOrderValue(storeId);
      const orderCountByDay = await getOrderCountByDay(storeId);
      const topP = await getTopSoldProducts(storeId);
      const Tprofit = await getTotalProfit(storeId);
      const Tcust = await getTotalCustomers(storeId);
      const PaymentTrend = await getOrderPaymentTrend(storeId);
      const orderStatus = await getOrderStatus(storeId);
      res.send({
        TotalSales: Tsales,
        SalesByDay: [...salesByDay],
        ReturningRate: [...returningRate],
        AverageOrderPrice: avgOrderValue,
        OrderCountByDay: [...orderCountByDay],
        TopProducts: [...topP],
        Profit: Tprofit,
        TotalCustomers: Tcust,
        PaymentTrend: [...PaymentTrend],
        OrderStatus: [...orderStatus],
      });
    });
  })
);

module.exports = storeRouter;
