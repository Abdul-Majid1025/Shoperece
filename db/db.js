// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// const { Client } = require("pg");
// const db = new Client({
//     user: "uwldziaqgyhlrx",
//     host: "ec2-34-199-209-37.compute-1.amazonaws.com",
//     database: "dfi81hedol2anv",
//     password: "8737b3ca65e9a6c8873fc646f79980b173ba42b7495e56f210c54e99c59b94d6",
//     port: 5432,
//     extra: {
//         ssl: true,
//     },
//     ssl: true,
//     connectionString: "postgres://uwldziaqgyhlrx:8737b3ca65e9a6c8873fc646f79980b173ba42b7495e56f210c54e99c59b94d6@ec2-34-199-209-37.compute-1.amazonaws.com:5432/dfi81hedol2anv",
// });
// db.connect((err) => {
//     if (err) {
//         console.error(err.stack);
//     } else {
//         console.log("Connected");
//     }
// });

// const Sequelize = require("sequelize");
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// const db = new Sequelize({
//     database: "dfi81hedol2anv",
//     username: "uwldziaqgyhlrx",
//     password: "8737b3ca65e9a6c8873fc646f79980b173ba42b7495e56f210c54e99c59b94d6",
//     host: "ec2-34-199-209-37.compute-1.amazonaws.com",
//     port: 5432,
//     dialect: "postgres",
//     // operatorsAliases: false,
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
//         },
//     },
// });

// db.authenticate()
//     .then(() => {
//         console.log("Connection has been established successfully.");
//     })
//     .catch((err) => {
//         console.error("Unable to connect to the database:", err);
//     });
// module.exports = db;