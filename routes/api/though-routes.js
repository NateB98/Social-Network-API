const router = require('express').Router();
const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts

} = require('../../controllers/thoughts-controller');

router.route('/').get(getAllThoughts);
router.route('/:id').get(getThoughtsById).put(updateThoughts)
router.route('/:userId').post(createThoughts);


module.exports = router;