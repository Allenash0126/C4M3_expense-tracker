const express = require('express')
const router = express.Router()
const db = require('../models')
const Track = db.Track
const Category = db.Category

router.get('/', (req, res, next) => {
  const userId = req.user.id

  return Track.findAll({
    attributes: ['id', 'name', 'date', 'amount', 'userId', 'categoryId'],
    where: { userId },
    raw: true
  })
    .then((tracks) => {
      const promises = tracks.map((track) => {
        const categoryId = track.categoryId
        return Category.findOne({
          attributes: ['id', 'name', 'icon'],
          where: { id: categoryId },
          raw: true
        })
          .then((category) => {
            track.categoryIcon = category.icon
            return track
          })
      })
      // 用Promise.all解決非同步的錯誤：確保取得所有data，避免Category.findOne還沒完成，就下一步
      return Promise.all(promises)
    })

    .then((tracks) => {
      // 計算總共花費totalAmount
      let totalAmount = 0
      for (i = 0; i < tracks.length; i++) {
        totalAmount += tracks[i].amount
      }
      res.render('tracks', { tracks, totalAmount })
    })
    .catch((error) => {
      error.errorMessage = '找不到資料'
      next(error)
    })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res, next) => {
  const { name, date, amount } = req.body
  const userId = req.user.id

  return Category.findOne({
    attributes: ['id', 'name', 'icon'],
    where: { name: req.body.category },
    raw: true
  })
    .then((category) => {
      const categoryId = category.id
      return Track.create({ name, date, amount, userId, categoryId })
    })
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
    attributes: ['id', 'name', 'date', 'amount', 'userId'],
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
  const { name, date, amount } = req.body
  const userId = req.user.id

  return Track.findByPk(id, {
    attributes: ['id', 'name', 'date', 'amount', 'userId'],
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
      return Track.update({ name, date, amount }, { where: { id } })
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
    attributes: ['id', 'name', 'date', 'amount', 'userId'],
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
