const Router = require('express')
const carriers = require('../controllers/carriersController')
const rates = require('../controllers/ratesController')

const router = Router()

router.get('/api/carriers', carriers.getAll)
router.post('/api/rates', rates.getRate)

module.exports = router