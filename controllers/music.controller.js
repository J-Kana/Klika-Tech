const db = require("../models");
const Music = db.music;

const template = (status, message, data, autch, res) => {
    res.status(status).json({
        status: status,
        message: message,
        data: data,
        autch: autch
    });
};

exports.getObject = (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            Music.findAll()
                .then(objects => {
                    if (objects.length === 0) templase(500, "Tracks not found!", [], true, res)
                    else template(200, "", objects, true, res);
                })
                .catch(err => template(500, err.message, [], true, res));
        } else {
            Music.findOne({ where: { id: id } })
                .then(async object => {
                    if (!object) template(404, "Track not found", [], true, res);
                    template(200, "", object, true, res);
                })
                .catch(err => template(500, err.message, [], true, res));
        }
    }
    catch(e) { template(500, e.message, [], true, res) }
};

exports.getObjectsWithFilter = async (req, res) => {
    try {
        const { body } = req
        try {
            const data = [];
            if (body.title && body.title !== '') {
                await Music.findAndCountAll({where: {title: body.title}, order: [['id', 'DESC']], offset: body.offset, limit: body.page})
                    .then(objects => {
                        objects.rows.forEach((el) => {
                            data.push(el);
                        })
                    })
                    .catch(err => template(500, err.message, [], true, res));
            }
            if (body.artist && body.artist !== '') {
                await Music.findAndCountAll({where: {artist: body.artist}, order: [['id', 'DESC']], offset: body.offset, limit: body.page})
                    .then(objects => {
                        objects.rows.forEach((el) => {
                            data.push(el);
                        })
                    })
                    .catch(err => template(500, err.message, [], true, res));
            }
            if (body.genre && body.genre !== '') {
                await Music.findAndCountAll({where: {genre: body.genre}, order: [['id', 'DESC']], offset: body.offset, limit: body.page})
                    .then(objects => {
                        objects.rows.forEach((el) => {
                            data.push(el);
                        })
                    })
                    .catch(err => template(500, err.message, [], true, res));
            }
            if (body.year && body.year !== '') {
                await Music.findAndCountAll({where: {year: body.year}, order: [['id', 'DESC']], offset: body.offset, limit: body.page})
                    .then(objects => {
                        objects.rows.forEach((el) => {
                            data.push(el);
                        })
                    })
                    .catch(err => template(500, err.message, [], true, res));
            }
            template(200, "", data, true, res);
        }
        catch (err) { template(500, err, [], true, res) }
    }
    catch(e) { template(500, e.message, [], true, res) }
};


exports.objectCreate = (req, res) => {
    try {
        let { body } = req;
        Music.create(body)
            .then(obj => {
                if (obj) {
                    template(200,"Track was successfully created",[],false,res)
                } else {
                    template(500, "Could not create the track!",[],false,res)
                }
            })
            .catch(err => { template(500, err.message,[],false,res) });
    } catch(e) {
        template(500, e.message, [], true, res)
    }
};

exports.objectUpdate = (req, res) => {
    try {
        let {id} = req.params;
        let {body} = req;

        Music.update(body, { where: { id: id } })
            .then(async (response) => {
                if (response[0]) template(200, "Track has been successfully updated", [], true, res)
            })
            .catch(e => {template(500, e.message, [], true, res)});
    }
    catch(e) { template(500, e.message, [], true, res) }
};

exports.objectDelete = (req, res) => {
    try {
        let {id} = req.params;

        Music.destroy({ where: { id: id } })
            .then((response) => {
                if (response === 1) template(200, "Track has been deleted", [], true, res);
                else template(404, "Track not found", [], true, res);
            })
            .catch(e => {template(500, e.message, [], true, res)});
    }
    catch(e) { template(500, e.message, [], true, res) }
};
