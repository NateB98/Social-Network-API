const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
  } = require('../../controllers/users-controller');

router.route('/').get(getAllUsers).post(createUsers);
router.route('/:id').get(getUsersById).put(updateUsers)

module.exports = router; 