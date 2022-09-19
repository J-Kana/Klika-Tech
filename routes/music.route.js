const controller = require("../controllers/music.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/music/getObject/:id?", controller.getObject);

    app.get("/music/getObjectswithFilter", controller.getObjectsWithFilter);

    app.post("/music/objectCreate", controller.objectCreate);

    app.put("/music/objectUpdate/:id", controller.objectUpdate);

    app.delete("/music/objectDelete/:id", controller.objectDelete);
};
