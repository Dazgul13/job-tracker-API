const Job = require('../models/Job')

exports.getJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id }).sort({ createdAt: -1 })
  res.json(jobs)
}

exports.getJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, createdBy: req.user.id })
  res.json(job)
}

exports.createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.user.id })
  res.status(201).json(job)
}

exports.updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    { new: true }
  )
  res.json(job)
}

exports.deleteJob = async (req, res) => {
  await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id })
  res.json({ message: 'Job deleted' })
}