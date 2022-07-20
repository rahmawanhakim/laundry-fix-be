'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // outlet to transaksi
      this.hasMany(models.transaksi,{
        foreignKey: "id_transaksi",
        as: "outlet"
      })
    }
  };
  outlet.init({
    id_outlet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
    lokasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'outlet',
    tableName: 'outlet'
  });
  return outlet;
};