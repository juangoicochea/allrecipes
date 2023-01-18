const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = ( sequelize ) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.DECIMAL
    },
    weightWatcherSmartPoints: {
      type: DataTypes.DECIMAL
    },
    steps: {
      type: DataTypes.TEXT
    },
    created_db: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};