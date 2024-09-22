const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { generateToken, isAuth } = require("../utils.js");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// const db = require("../db/db.js");

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});
const userRouter = express.Router();

userRouter.post(
  "/logingoogle",
  expressAsyncHandler(async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const { givenName, email } = req.body.response.profileObj;
    try {
      // Check if the email is in use
      const existingUser = await Users.findOne({
        where: { email: email },
      }).then(async (user) => {
        if (user) {
          return res.status(201).send({
            message: "User Logged in Successfully",
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              verified: user.verified,
              role: user.role,
              address: user && user.address ? user.address : "",
              city: user && user.city ? user.city : "",
              postalCode: user && user.postalCode ? user.postalCode : "",
              phone: user && user.phone ? user.phone : "",
              token: generateToken(user.dataValues),
            },
          });
        } else {
          const user = await Users.create({
            username: givenName,

            email: email,
            verified: true,
            address: "",
            city: "",
            postalCode: "",
            phone: "",
          });

          return res.status(201).send({
            message: "User Logged in Successfully",
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              verified: user.verified,
              role: user.role,
              address: user && user.address ? user.address : "",
              city: user && user.city ? user.city : "",
              postalCode: user && user.postalCode ? user.postalCode : "",
              phone: user && user.phone ? user.phone : "",
              token: generateToken(user.dataValues),
            },
          });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    try {
      // Check if the email is in use
      const existingUser = await Users.findOne({
        where: { email: email },
      }).then(async (user) => {
        if (false) {
          // return res.status(409).send({
          //   message: "Email is already in use.",
          // });
        } else {
          const user = await Users.create({
            username: req.body.username,

            email: email,
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postal,
            phone: req.body.phone,

            password: bcrypt.hashSync(req.body.password, 8),
          });

          // Step 2 - Generate a verification token with the user's ID
          if (user) {
            const verificationToken = jwt.sign(
              { ID: user.dataValues.id },
              "somethingsecret",
              {
                expiresIn: "7d",
              }
            );

            // Step 3 - Email the user a unique verification link
            const url = `${process.env.heroku}/api/users/verify/${verificationToken}`; // server
            transporter.sendMail({
              to: email,
              subject: "Verify Account",
              html: `Click <a href = '${url}'>here</a> to confirm your email.`,
            });
            return res.status(201).send({
              message: `Verification email has been sent to ${email}`,
            });
          }
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    // Check we have an email

    try {
      // Step 1 - Verify a user with the email exists
      const user = await Users.findOne({
        where: { email: email },
      }).then(async (user) => {
        console.log("user", user);
        if (!user) {
          return res.status(404).send({
            message: "User does not exists",
          });
        }
        if (!user.verified) {
          return res.status(403).send({
            message: "Verify your Account Go to your email address.",
          });
        }
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            res.status(201).send({
              message: "User Logged in Successfully",
              user: {
                id: user.id,
                username: user.username,
                email: user.email,
                verified: user.verified,
                role: user.role,
                address: user.address,
                city: user.city,
                postalCode: user.postalCode,
                phone: user.phone,
                token: generateToken(user.dataValues),
              },
            });
          } else {
            return res.status(404).send({
              message: "Incorrect Email or Password",
            });
          }
        }
      });
      // Step 2 - Ensure the account has been verified
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

userRouter.post(
  "/resetpassword",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log("resetpassword", email);
    // Check we have an email

    try {
      // Step 1 - Verify a user with the email exists
      const user = await Users.findOne({
        where: { email: email },
      }).then(async (user) => {
        if (!user) {
          return res.status(404).send({
            message: "User does not exists",
          });
        }
        if (!user.verified) {
          return res.status(403).send({
            message: "Verify your Account Go to your email address.",
          });
        }
        if (user) {
          const verificationToken = jwt.sign(
            { ID: user.dataValues.id },
            "somethingsecret",
            {
              expiresIn: "7d",
            }
          );

          // Step 3 - Email the user a unique verification link
          const url = `${process.env.heroku}/reset-password/${verificationToken}`; // client
          transporter.sendMail({
            to: email,
            subject: "Update Password",
            html: `Click <a href = '${url}'>here</a> to Update Your Password.`,
          });
          return res.status(403).send({
            message: `Change Password Link is send to  ${email}`,
          });
        }
      });
      // Step 2 - Ensure the account has been verified
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

userRouter.post(
  "/password-reset",
  expressAsyncHandler(async (req, res) => {
    console.log("req body", req.body);
    const { token, password } = req.body;
    // Check we have an id
    if (!token) {
      return res.status(400).send("Invalid link or expired");
    }
    // Step 1 -  Verify the token from the URL
    let payload = null;
    try {
      payload = jwt.verify(token, "somethingsecret");
    } catch (err) {
      return res.status(500).send(err);
    }
    console.log("payload", payload);
    try {
      const password2 = bcrypt.hashSync(password, 8);
      // Step 2 - Find user with matching ID
      const user = await Users.findOne({ where: { id: payload.ID } })
        .then(async (u) => {
          u.password = password2;
          await u.save();
          return res.status(200).send({
            message: "Password Updated",
          });
        })
        .catch((e) => {
          return res.status(404).send({
            message: "User does not  exists",
          });
        });

      // Step 3 - Update user verification status to true
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

userRouter.get(
  "/verify/:token",
  expressAsyncHandler(async (req, res) => {
    const { token } = req.params;
    console.log(token);
    // Check we have an id
    if (!token) {
      return res.status(422).send({
        message: "Missing Token",
      });
    }
    // Step 1 -  Verify the token from the URL
    let payload = null;
    try {
      payload = jwt.verify(token, "somethingsecret");
    } catch (err) {
      return res.status(500).send(err);
    }
    console.log("payload", payload);
    try {
      // Step 2 - Find user with matching ID
      const user = await Users.findOne({ where: { id: payload.ID } })
        .then(async (u) => {
          u.verified = true;
          await u.save();
          return res.status(200).send({
            message: "Account Verified",
          });
        })
        .catch((e) => {
          return res.status(404).send({
            message: "User does not  exists",
          });
        });

      // Step 3 - Update user verification status to true
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

userRouter.post(
  "/updateprofile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id, email, username, phone, address, city, postal } = req.body;

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
          user.email = email;
          user.username = username;
          user.address = address;
          user.city = city;
          user.postalCode = postal;
          user.phone = phone;

          const updatedUser = await user.save();

          res.status(201).send({
            message: "Profile Updated Successfully",
            user: {
              id: user.id,
              username: username,
              email: email,
              verified: user.verified,
              role: user.role,
              address: address,
              city: city,
              postalCode: postal,
              phone: phone,
              token: generateToken(updatedUser.dataValues),
            },
          });
        }
      });
      // Step 2 - Ensure the account has been verified
    } catch (err) {
      return res.status(500).send(err);
    }
  })
);

userRouter.delete(
  "/deleteprofile/:id",
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
          Users.destroy({
            where: {
              id: user.id,
            },
          }).then(
            function (rowDeleted) {
              res.status(201).send({
                message: "User Deleted Successfully",
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

module.exports = userRouter;
