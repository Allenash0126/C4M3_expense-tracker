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

  // for Category Icon，提取藏在tracks 裡的category name，找到category資料庫中的id，再提供icon
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

// 依類別 category 做篩選
router.post('/', (req, res, next) => {
  const userId = req.user.id
  const { category } = req.body
  
  // 防止user未選擇欲篩選的類別 就點選button
  if (category === '類別') {
    req.flash('fail', '請選擇欲篩選的類別')
    return res.redirect('/tracks')
  }

  // 當user進入篩選頁面，可選取'全部類別'，回到初始畫面
  if (category === '全部類別') {
    return res.redirect('/tracks')
  }

  return Category.findAll({
    attributes: ['id', 'name', 'icon'],
    where: { name: category },
    raw: true
  })
    .then((categories) => {
      if (!categories) {
        return req.flash('fail', '找不到資料:(')
      }
      const categoryId = categories[0].id
      const categoryIcon = categories[0].icon
      return Track.findAll({
        attributes: ['id', 'name', 'date', 'amount', 'userId', 'categoryId'],
        where: { userId, categoryId },
        raw: true
      })
        .then((tracks) => {
          // 計算總共花費totalAmount
          let totalAmount = 0
          for (i = 0; i < tracks.length; i++) {
            totalAmount += tracks[i].amount
          }
          // 篩選後 依然要顯示icon
          tracks.forEach((track) => {
            track.categoryIcon = categoryIcon
          })
          res.render('tracks', { tracks, totalAmount })
        })
        .catch((error) => {
          error.errorMessage = '找不到資料'
          next(error)
        })
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
    attributes: ['id', 'name', 'date', 'amount', 'userId', 'categoryId'],
    raw: true
  })
  // 在edit.hbs 引入既有的category Data分類
    .then((track) => {
      const categoryId = track.categoryId
      return Category.findOne({
        attributes: ['id', 'name', 'icon'],
        where: { id: categoryId },
        raw: true
      })
        .then((category) => {
          track.categoryName = category.name
          return track
        })
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
  const { name, date, amount, category } = req.body
  const userId = req.user.id

  return Track.findByPk(id, {
    attributes: ['id', 'name', 'date', 'amount', 'userId', 'categoryId'],
    raw: true
  })
  // 去category資料庫撈name 等於user 所選category 的id，再轉換存入track 的categoryId
    .then((track) => {
      // const categoryId = track.categoryId
      return Category.findOne({
        attributes: ['id', 'name'],
        where: { name: category },
        raw: true
      })
        .then((category) => {
          track.categoryId = category.id
          return track
        })
    })
    .then((track) => {
      const categoryId = track.categoryId
      if (!track) {
        req.flash('fail', '找不到資料')
        return res.redirect('/tracks')
      }
      if (track.userId !== userId) {
        req.flash('fail', '權限不足')
        return res.redirect('/tracks')
      }
      return Track.update({ name, date, amount, categoryId }, { where: { id } })
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
