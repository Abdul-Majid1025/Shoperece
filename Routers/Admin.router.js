const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../models/index");

const {
  Stores,
  Products,
  ProductImages,
  Tags,
  ProductVarients,
  Users,
} = require("../models");

const { generateToken, isAuth } = require("../utils.js");

const adminRouter = express.Router();

adminRouter.get(
  "/:email/:token",
  expressAsyncHandler(async (req, res) => {
    const { email, token } = req.params;
    console.log(email, token);
    let token1 = process.env.JWT_SECRET;

    const user = await Users.findOne({
      where: { email: email },
    }).then(async (user) => {
      if (!user) {
        return res.status(404).send({
          message: "User does not exists",
        });
      }
      if (user) {
        if (token == token1) {
          user.role = "admin";

          const updatedUser = await user.save();

          res.status(201).send({
            message: "Admin Created Successfully",
          });
        } else {
          return res.status(401).send({
            message: "You don't have permission",
          });
        }
      }
    });
  })
);

adminRouter.get(
  "/getallmerchants",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await Users.findOne({
        where: { id: req.user.id },
      }).then(async (u) => {
        const allMerchants = await db.sequelize.query(
          'select u."username", count(*) Stores from "Users" u join "Stores" s on s."UserId"=u."id" where "role"=\'merchant\' group by u."username"'
        );
        console.log("allMerchants", allMerchants);
        res.send(allMerchants[0]);
      });
    } catch {
      res.status(401).send("Unauthorized");
    }
  })
);

module.exports = adminRouter;
