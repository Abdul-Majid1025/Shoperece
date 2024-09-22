const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const userRouter = require("./Routers/Users.router.js");
const customerRouter = require("./Routers/Customer.router.js");
const storeRouter = require("./Routers/Store.router.js");
const productRouter = require("./Routers/Products.router.js");
const adminRouter = require("./Routers/Admin.router.js");
const orderRouter = require("./Routers/Order.router.js");

// const db = require("./db/db.js");
const db = require("./models");

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/customers", customerRouter);
app.use("/api/stores", storeRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// db.sync();

// const tableText = `
// CREATE TABLE Users (
//   id SERIAL , username VARCHAR(255) , email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255),PRIMARY KEY("id")
// );
// `;
// db.query(tableText)
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
  });
});
