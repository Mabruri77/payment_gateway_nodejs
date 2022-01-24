const express = require('express')
const { createPayment, updateNotif } = require('./appController')
const router = express.Router()

router.post('/charge', createPayment)
router.post('/update/:orderId', updateNotif)

module.exports = router
