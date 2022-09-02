const Router = require('express')
const carriers = require('../controllers/carriersController')
const rates = require('../controllers/ratesController')
const tracking = require('../controllers/trackingController')
const webhooks = require('../controllers/webhooksController')

const router = Router()

router.get('/api/carriers', carriers.getAll)

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

module.exports = router