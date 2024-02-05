const express = require('express')
const router = express.Router()
const db = require('../models')
const Track = db.Track

router.get('/', (req, res) => {
  return Track.findAll({
    attributes: ['id', 'name', 'date', 'category', 'amount'],
    raw: true
  })
    .then((tracks) => {
      let totalAmount = 0
      for (i = 0; i < tracks.length; i++) {
        totalAmount += tracks[i].amount
      }
      res.render('tracks', { tracks, totalAmount })
    })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
const { name, date, category,amount } = req.body
  return Track.create({ name, date, category, amount })
    .then(() => {
      req.flash('success','新增成功！')
      res.redirect('/tracks')
    })
    .catch((err) => console.log(err))
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  return Track.findByPk(id, {
    attributes: ['id', 'name', 'date', 'category', 'amount'],
    raw: true
  })
    .then((track) => {
      res.render('edit', { track })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category,amount } = req.body
  return Track.update({ name, date, category, amount
  }, {
    where: { id }
  })
    .then(() => {
      req.flash('success','更新成功！')
      res.redirect('/tracks')
    })
    .catch((err) => console.log(err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Track.destroy({ where: { id } })
    .then(() => {
      req.flash('success','刪除成功！')
      res.redirect('/tracks')
  })
    .catch((err) => console.log(err))
})

module.exports = router