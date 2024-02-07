const express = require('express')
const router = express.Router()
const db = require('../models')
const Track = db.Track

router.get('/', (req, res) => {
  const userId = req.user.id
  return Track.findAll({
    attributes: ['id', 'name', 'date', 'category', 'amount', 'userId'],
    where: { userId },
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

router.post('/new', (req, res, next) => {
  const { name, date, category, amount } = req.body
  const userId = req.user.id
  return Track.create({ name, date, category, amount, userId })
    .then(() => {
      req.flash('success', '新增成功！')
      res.redirect('/tracks')
    })
    .catch((error) => {
      error.errorMessage = '新增失敗:('
      next(error)
    })
})

router.get('/edit/:id', (req, res, next) => {
  const id = req.params.id
  const userId = req.user.id

  return Track.findByPk(id, {
    attributes: ['id', 'name', 'date', 'category', 'amount', 'userId'],
    raw: true
  })
    .then((track) => {
      if (!track) {
        req.flash('fail', '找不到資料')
        return res.redirect('/tracks')
      }
      if (track.userId !== userId) {
        req.flash('fail', '權限不足')
        return res.redirect('/tracks')
      }
      return res.render('edit', { track })
    })
    .catch((error) => {
      error.errorMessage = '找不到資料'
      next(error)
    })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  const userId = req.user.id

  return Track.findByPk(id, {
    attributes: ['id', 'name', 'date', 'category', 'amount', 'userId'],
    raw: true
  })
    .then((track) => {
      if (!track) {
        req.flash('fail', '找不到資料')
        return res.redirect('/tracks')
      }
      if (track.userId !== userId) {
        req.flash('fail', '權限不足')
        return res.redirect('/tracks')
      }
      return Track.update({ name, date, category, amount }, { where: { id } })
        .then(() => {
          req.flash('success', '更新成功！')
          return res.redirect('/tracks')
        })
    })
    .catch((error) => {
      error.errorMessage = '更新失敗'
      next(error)
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id

  return Track.findByPk(id, {
    attributes: ['id', 'name', 'date', 'category', 'amount', 'userId'],
    raw: true
  })
    .then((track) => {
      if (!track) {
        req.flash('fail', '找不到資料')
        return res.redirect('/tracks')
      }
      if (track.userId !== userId) {
        req.flash('fail', '權限不足')
        return res.redirect('/tracks')
      }
      return Track.destroy({ where: { id } })
        .then(() => {
          req.flash('success', '刪除成功！')
          return res.redirect('/tracks')
        })
    })
    .catch((error) => {
      error.errorMessage = '刪除失敗'
      next(error)
    })
})

module.exports = router
