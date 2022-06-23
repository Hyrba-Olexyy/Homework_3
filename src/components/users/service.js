const UserModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll() {
    return UserModel.find({});
}

/**
 * @exports
 * @method findByID
 * @param {_id } id search user
 * @summary get object of found user
 * @returns Promise<UserModel[]>
 */
function findById(_id) {
    return  UserModel.findOne({ _id });
}

/**
 * @exports
 * @method createOne
 * @param {userData} data created user
 * @summary get new user`s object
 * @returns Promise<UserModel[]>
 */
function createOne(userData) {
    return UserModel.create(userData);
}

/**
 * @exports
 * @method updateById
 * @param {_id} id updated user
 * @param {userData} data created user
 * @summary get update user`s object
 * @returns Promise<UserModel[]>
 */
function updateById(_id, $set) {
    return  UserModel.updateOne(
        { _id },
        { $set }
    );
}

/**
 * @exports
 * @method updateById
 * @param {_id} id deleted user
 * @returns Promise<UserModel[]>
 */
function deleteById(_id) {
    return UserModel.deleteOne({ _id });
}

module.exports = {
    findAll,
    findById,
    createOne,
    updateById,
    deleteById
}