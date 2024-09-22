const models = require("./models");
models.sequelize.sync({ force: false, alter: true }).then(function () {});
