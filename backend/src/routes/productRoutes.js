const express = require('express');
const controller = require('../controllers/ProductController');

const router = express.Router();

router.get('/', (req, res) => controller.list(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));

module.exports = router;
