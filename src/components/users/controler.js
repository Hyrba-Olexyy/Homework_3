const UserService = require('./service')
const joiValidation = require('./validation');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {

        const users = await UserService.findAll();

        res.status(200).json({data: users});
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById (req, res, next) {
        const {id: userId } = req.params
        const user = await UserService.findById(userId);

        if(!user) return res.status(404).json({ error: { message: "User not found!" } });

        res.status(200).json({data: user})
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function createOne (req, res, next) {
        const userData = req.body;
        const validation = await joiValidation(userData);

        if(validation.error) return res.status(400).json(validation.error.details);

        const newUser = await UserService.createOne(userData);

        if(newUser.message) return res.status(400).json(newUser.message);

        res.status(201).json({data: newUser});
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function updateById (req, res, next) {

        const { id: userId } = req.params;
        const userData = req.body;

        const validation = await joiValidation(userData);
        
        if(validation.error) return res.status(400).json(validation.error.details);

        const updatedUser = await UserService.updateById(userId, userData);

        if(updatedUser.message) return res.status(400).json(updatedUser.message);

        if(!updatedUser.modifiedCount) return res.status(404).json({ error: { message: "User not found!" } });

        res.status(200).json({data: userData});
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function deleteById (req, res, next) {
        const { id: userId } = req.params;       
        const deletedResult = await UserService.deleteById(userId);
        
        if(!deletedResult.deletedCount) return res.status(404).json({ error: { message: "User not found!" } });

        res.status(204).end();
}

module.exports ={
    findAll,
    findById,
    createOne,
    updateById,
    deleteById,
}