const express = require('express')
const { getJobs, createJob, updateJob, deleteJob, getJob } = require('../controllers/jobController')
const auth = require('../middleware/authMiddleware')
const router = express.Router()

router.use(auth)
router.get('/', getJobs)
router.get('/:id', getJob)
router.post('/', createJob)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)

module.exports = router