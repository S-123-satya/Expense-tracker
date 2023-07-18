const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Expense=sequelize.define('expense',{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    expenses:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
module.exports=Expense;