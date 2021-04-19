const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const AliensController = require('../controllers/aliens');

// baseURL/aliens
router.get('/', AliensController.aliens_get_all);
router.post('/', checkAuth, AliensController.aliens_create_alien);

// baseURL/aliens/alienId
router.get("/:alienId", AliensController.aliens_get_by_id);
router.patch('/:alienId', checkAuth, AliensController.aliens_patch_by_id);
router.delete('/:alienId', checkAuth, AliensController.aliens_delete_by_id);

module.exports = router;