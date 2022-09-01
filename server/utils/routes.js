const Router = require('express')
const carriers = require('../controllers/carriersController')
const rates = require('../controllers/ratesController')
const tracking = require('../controllers/trackingController')
const webhooks = require('../controllers/webhooksController')

const router = Router()

router.get('/api/carriers', carriers.getAll)

router.post('/api/rates', rates.getRate)
router.post('/api/estimate', rates.getEstimate)

router.post('/api/display-tracking/:carrierCode/:trackingNumber', tracking.displayTracking)
router.post('/api/starttracking', tracking.startTracking)

router.post('/api/track', webhooks.createTrackingWebhook)
router.get('/api/webhooks', webhooks.listWebhooks)

module.exports = router