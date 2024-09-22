const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");

const { Customers, Orders, OrderItems } = require("../models");

const { generateToken, isAuth } = require("../utils.js");

const stripe = require("stripe")(
  "sk_test_51JMFxiSDJaeDh8bHxJiygN6dxYKIhOBTjRfSsH5NWRPTG9QAKuSaFWpzgte4BuCf2JBoyOjtb6XXVxNtJd1o1Ex200qslGRKU8"
);

const orderRouter = express.Router();

orderRouter.post(
  "/createcashondeliveryorder",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { cartItems, TotalAmount } = req.body;
    console.log(cartItems, TotalAmount);
    let orderDelivered = new Date();
    orderDelivered.setDate(orderDelivered.getDate() + 7);
    try {
      // Step 1 - Verify a user with the email exists
      const user = await Customers.findOne({
        where: { id: req.user.id },
      }).then(async (user) => {
        if (!user) {
          return res.status(404).send({
            message: "User does not exists",
          });
        }

        if (user) {
          const order = await Orders.create({
            transactionId: "",
            transactionMethod: "Cash on Delivery",
            orderPlacedDate: new Date(),
            orderDeliveredDate: orderDelivered,
            customerId: user.id,
            StoreId: cartItems[0].storeId,
            deliveryTime: "7days",
            totalAmount: TotalAmount,
          });

          for (let i = 0; i < cartItems.length; i++) {
            const listItem = await OrderItems.create({
              OrderId: order.dataValues.id,
              productId: cartItems[i].productId,
              quantity: cartItems[i].quantity,
            });
          }

          res.status(201).send({
            message: "Order Created Successfully",
            order: order,
          });
        }
      });
      // Step 2 - Ensure the account has been verified
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

orderRouter.post(
  "/stripeorder",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    res.header("Access-Control-Allow-Origin: *");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    const { cartItems, TotalAmount, token } = req.body;
    console.log(req.body);
    let orderDelivered = new Date();
    orderDelivered.setDate(orderDelivered.getDate() + 7);

    let amount1 = TotalAmount * 100;
    const body = {
      source: token.id,
      amount: amount1,
      currency: "INR",
    };

    try {
      // Step 1 - Verify a user with the email exists
      const user = await Customers.findOne({
        where: { id: req.user.id },
      }).then(async (user) => {
        if (!user) {
          return res.status(404).send({
            message: "User does not exists",
          });
        }

        if (user) {
          await stripe.charges.create(body, async (StripeErr, StripeRes) => {
            if (res.StripeErr) {
              res.status(500).send({ error: StripeErr });
              return;
            }

            // res.status(200).send({ success: StripeRes });
            console.log(StripeErr);
            console.log(StripeRes);
            if (StripeRes.status === "succeeded") {
              const order = await Orders.create({
                transactionId: StripeRes.id,
                transactionMethod: "Stripe",
                orderPlacedDate: new Date(),
                orderDeliveredDate: orderDelivered,
                customerId: user.id,
                StoreId: cartItems[0].storeId,
                deliveryTime: "7days",
                totalAmount: TotalAmount,
              });

              for (let i = 0; i < cartItems.length; i++) {
                const listItem = await OrderItems.create({
                  OrderId: order.dataValues.id,
                  productId: cartItems[i].productId,
                  quantity: cartItems[i].quantity,
                });
              }
              res.status(201).send({
                message: "Order Created Successfully",
                order: order,
              });
            }
          });
        }
      });
      // Step 2 - Ensure the account has been verified
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

module.exports = orderRouter;
