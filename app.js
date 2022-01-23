const express = require('express')
const admin = require('firebase-admin')
const asyncHandler = require('express-async-handler')
const midtransClient = require('midtrans-client')

//service key form firebase firestore
const serviceKey = require('./secret/repeat-b59a5-firebase-adminsdk-vove6-7a7dabccbc.json')
const { response } = require('express')

admin.initializeApp({
	credential: admin.credential.cert(serviceKey)
})

let coreApi = new midtransClient.CoreApi({
	isProduction: false,
	serverKey: 'your server key',
	clientKey: 'your client key'
})

const app = express()

app.use(express.json())

const db = admin.firestore()

//create payment
app.post(
	'/charge',
	asyncHandler(async (req, res) => {
		let parameter = {
			payment_type: 'bank_transfer',
			transaction_details: {
				gross_amount: 15000,
				order_id: 'hello-world-21234'
			},
			bank_transfer: {
				bank: 'bni'
			}
		}

		let response = await coreApi.charge(parameter)
		await db.collection('order').doc(parameter.transaction_details.order_id).create(response)
		res.json(response)
	})
)

//update status payment
app.post(
	'/update/:orderId',
	asyncHandler(async (req, res) => {
		let response = await coreApi.transaction.status(req.params.orderId)
		await db.collection('order').doc('hello world').update({ hello: 'hello world' })
		res.json(response)
	})
)

app.listen(5000, () => console.log('app was started'))
