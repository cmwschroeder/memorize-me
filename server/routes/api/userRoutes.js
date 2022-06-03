const router = require('express').Router();

const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userControllers')

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;