const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {

    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => {
                const token = signToken(dbUserData);
                res.json({ token, user: dbUserData });
            })
            .catch((err) => res.status(500).json(err));
    },
    getUsers(req, res) {
        User.find({})
            .populate({ path: 'highscores', select: '-__v' })
            .select('-__v')
            .then((users) => res.json(users))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.user._id })
            .populate({ path: 'highscores', select: '-__v' })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    login(req, res) {
        User.findOne({ email: req.body.email })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that email' })
                    : user.isCorrectPassword(req.body.password)
                        .then((correctPw) => {
                            if (!correctPw) {
                                res.status(400).json({ message: 'Incorrect password' })
                            } else {
                                const token = signToken(user);
                                res.json({ token, user });
                            }
                        })
                        .catch((err) => res.status(500).json(err))
            )
            .catch((err) => res.status(500).json(err))
    }
};
