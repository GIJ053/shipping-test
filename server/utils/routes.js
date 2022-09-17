const Router = require('express')
const carriers = require('../controllers/ShipEngine/carriersController')
const rates = require('../controllers/ShipEngine/ratesController')
const tracking = require('../controllers/ShipEngine/trackingController')
const webhooks = require('../controllers/ShipEngine/webhooksController')
const stripe = require('../controllers/Stripe/stripeController')
const transfer = require('../controllers/Stripe/transfersController')
const payout = require('../controllers/PayPal/Payout')

const router = Router()

router.get('/api/carriers', carriers.getParcelCarriers)

router.get('/api/get-ltl-carriers', carriers.getLTLCarriers)
router.post('/api/get-ltl', carriers.getSingleLTL)
router.post('/api/test-carrier', carriers.connectTestCarrier)

router.post('/api/rates', rates.getRates)
router.post('/api/estimate', rates.getEstimate)

router.post('/api/start-tracking', tracking.startTracking)
router.post('/api/display-tracking/:carrierCode/:trackingNumber', tracking.displayTracking)
router.post('/api/stop-tracking', tracking.stopTracking)

router.post('/api/create-webhook', webhooks.createTrackingWebhook)
router.post('/api/track', webhooks.createTrackingWebhookListener)
router.get('/api/webhooks', webhooks.listWebhooks)

router.post('/api/create-stripe', stripe.createStripeAccount)
router.post('/api/delete-stripe', stripe.deleteStripeAccount)
router.post('/api/link-stripe', stripe.createAccountLink)
router.post('/api/create-customer', stripe.createStripeCustomer)
router.post('/api/create-bank-token', stripe.createStripeBankToken)
router.post('/api/verify-bank', stripe.verifyBankAccount)
router.post('/api/verify', stripe.verify)

router.post('/api/topup', transfer.topUpStripe)
router.post('/api/create-group', transfer.createPaymentGroup)
router.post('/api/payout', transfer.payoutStripe)
router.post('/api/payout-group', transfer.payoutGroup)

router.post('/create-checkout-session', stripe.createStripeSession)

router.post('/api/paypal-payout', payout.createPayout)

module.exports = router