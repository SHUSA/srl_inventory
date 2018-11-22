const { Item } = require('../models')

function calculateStockLevels (item, assay) {
  let weeklyUse = 0
  let baseStock = 0
  let leadTimeUsage = 0
  // stock calculation will only run if weekly volume AND reactions per item > 0
  // otherwise, reorder points will be user defined
  if (parseInt(assay.weeklyVolume) !== 0 && parseFloat(item.reactionsPerItem) !== 0) {
    // console.log(`weeklyVolume ${assay.weeklyVolume}`)
    // console.log(`replicates ${assay.sampleReplicates}`)
    // console.log(`weekly runs ${assay.weeklyRuns}`)
    // console.log(`controlsPerRun ${assay.controlsPerRun}`)
    // to do: reevaluate sampleReplicates in formula
    // weeklyUse = (assay.weeklyVolume * assay.sampleReplicates +
    //   assay.weeklyRuns * assay.controlsPerRun) / item.reactionsPerItem
    weeklyUse = (assay.weeklyVolume + assay.weeklyRuns * assay.controlsPerRun) / item.reactionsPerItem
    // console.log(`weeklyUse ${weeklyUse}`)
    baseStock = weeklyUse * 4
    // console.log(`baseStock ${baseStock}`)
    item.safetyStock = Math.ceil(weeklyUse * item.weeksOfSafetyStock * 100) / 100
    leadTimeUsage = weeklyUse * item.leadTimeDays / 7
    // console.log(`leadTimeUsage ${leadTimeUsage}`)
    item.reorderPoint = Math.ceil((leadTimeUsage + item.safetyStock + baseStock) * 100) / 100
    item.reorderQuantity = Math.ceil(weeklyUse * item.weeksOfReorder)
  }
  return item
}

module.exports = {
  async index (req, res) {
    try {
      const active = req.query.active
      const attributes = req.query.attributes
      let items = await Item.findAll({
        where: {
          active: active
        },
        order: [
          ['name', 'ASC']
        ],
        attributes: attributes
      })
      res.send(items)
    } catch (error) {
      console.log(error)
      res.status(500).send(error.errors)
    }
  },

  async show (req, res) {
    try {
      let items = await Item.findAll({
        where: {
          $or: ['id', 'AssayId', 'VendorId'].map(key => ({
            [key]: req.query.ids
          })),
          active: req.query.active
        },
        order: [
          ['VendorId', 'DESC']
        ]
      })
      res.send(items)
    } catch (error) {
      console.log(error)
      res.status(500).send(error.errors)
    }
  },

  async post (req, res) {
    let item = req.body.params.item
    const assay = req.body.params.assay
    item = calculateStockLevels(item, assay)

    try {
      item = await Item.create(item)
      res.send(item)
    } catch (error) {
      console.log(error)
      res.status(500).send(error.errors)
    }
  },

  async put (req, res) {
    const list = req.body.params.list
    let item = req.body.params.item
    const assay = req.body.params.assay
    const singleItem = list.length === 0

    // calculate reorder point as long as item is active
    // removed active condition, all items are active if passed through here
    // old condition: if (!item.order && !item.user && item.active)
    if (singleItem) {
      item = calculateStockLevels(item, assay)
    } else {
      list.map(item => {
        item = calculateStockLevels(item, item.assay)
      })
    }

    try {
      if (singleItem) {
        await Item.update(item, {
          where: {
            id: item.id
          }
        })
      } else {
        await list.map(item => {
          Item.update(item, {
            where: {
              id: item.id
            }
          })
        })
      }
      res.send(item || list)
    } catch (error) {
      console.log(error)
      res.status(500).send(error.errors)
    }
  }
}
