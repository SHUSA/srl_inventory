module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    lastUpdate: DataTypes.DATE,
    currentStock: DataTypes.REAL,
    comment: DataTypes.STRING
  })

  Entry.associate = function (models) {
    Entry.belongsTo(models.Order)
    Entry.belongsTo(models.Item)
  }

  return Entry
}
