const router = require('express').Router();

const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    login,
} = require('../../controllers/userControllers')


const { authMiddleware } = require('../../utils/auth');
router.route('/').get(getUsers).post(createUser);
// router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/me').get(authMiddleware, getSingleUser)
router.route('/login').post(login);

module.exports = router;