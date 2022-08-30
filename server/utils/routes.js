const Router = require('express')
const carriers = require('../controllers/carriersController')
const rates = require('../controllers/ratesController')

const router = Router()

router.get('/api/carriers', carriers.getAll)
router.post('/api/rates', rates.getRate)
router.post('/api/estimate', rates.getEstimate)

module.exports = router