const asyncHandler = require('express-async-handler')
const admin = require('firebase-admin')
const midtransClient = require('midtrans-client')
const serviceKey = require('./secret/repeat-b59a5-firebase-adminsdk-vove6-7a7dabccbc.json')
admin.initializeApp({
	credential: admin.credential.cert(serviceKey)
})

let coreApi = new midtransClient.CoreApi({
	isProduction: false,
	serverKey: 'SB-Mid-server-maDlGCRLPmr00nWiMS6m_2Sz',
	clientKey: 'SB-Mid-client-Gth9Q6BEKX4QSWih'
})
const db = admin.firestore()
exports.createPayment = asyncHandler(async (req, res) => {
	try {
		let parameter = {
			payment_type: 'bank_transfer',
			transaction_details: {
				gross_amount: 15000,
				order_id: 'hello-world-babababa'
			},
			bank_transfer: {
				bank: 'bni'
			}
		}

		let response = await coreApi.charge(parameter)
		await db.collection('order').doc(parameter.transaction_details.order_id).create(response)
		res.json(response)
	} catch (error) {
		console.log(error)
	}
})

exports.updateNotif = asyncHandler(async (req, res) => {
	let response = await coreApi.transaction.status(req.params.orderId)
	await db.collection('order').doc('hello world').update({ hello: 'hello world' })
	res.json(response)
})
