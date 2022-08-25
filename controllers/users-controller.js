const { Users } = require('../models')

const userController = {
  createUsers({ body }, res) {
    Users.create(body)
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => res.status(400).json(err));
  },
  getAllUsers(req, res) {
    Users.find({})
      .populate({ path: 'friends', select: '-__v' })
      .populate({ path: 'thoughts', select: '-__v' })
      .select('-__v').then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'There is no user with this ID' });
          return;
        }
        res.json(dbUsersData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      })
  },
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'There is no user with this ID' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.json(err))
  },

}

module.exports = userController; 