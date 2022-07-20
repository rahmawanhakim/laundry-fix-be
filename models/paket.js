'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //paket ke transaksi
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_paket",
        as: "detail_transaksi"
      })
    }
  };
  paket.init({
    id_paket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
    jenis: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paket',
    tableName: 'paket'
  });
  return paket;
};