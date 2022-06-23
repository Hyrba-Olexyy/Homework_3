const {Router} = require('express');
const withCatch = require('./with-catch.js');
const http = require('http');
const UserControler = require('../components/users/controler');

const PrimaryRouter = Router();

const UserRouter = Router();

UserRouter.get('/', withCatch(UserControler.findAll));

UserRouter.get('/:id', withCatch(UserControler.findById));

UserRouter.post('/', withCatch(UserControler.createOne));

UserRouter.patch('/:id', withCatch(UserControler.updateById));

UserRouter.delete('/:id', withCatch(UserControler.deleteById));

module.exports = {
    init(app) {
        PrimaryRouter.use('/v1/users', UserRouter);

        PrimaryRouter.use((req, res, next) => {
            res.status(404).send(http.STATUS_CODES[404]);
            next();
        });
        
        app.use(PrimaryRouter);
    }
}
