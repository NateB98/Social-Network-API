const { thoughts } = require('../models');
const { getUsersById } = require('./users-controller');

const thoughtController = {
  createThought({ params, body }, res) {
    thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate({ _id: params.userid }, { $push: { thoughts: id } }, { new: true });
      }).then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'There is no thought with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      }).catch(err => {
        res.json(err)
      })
  },
  getAllThoughts(req, res) {
    thoughts.find({})
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getThoughtsById({ params }, res) {
    thoughts.findOne({ _id: params.id })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'There is no thought with this ID' });
          return;
        }
        res.json(dbThoughtsData)
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  updateThoughts({ params, body }, res) {
    thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-___v')
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'There is no thought with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },
}

module.exports = thoughtController;