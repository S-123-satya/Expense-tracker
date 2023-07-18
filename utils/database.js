const {Sequelize} = require('sequelize');
const sequelize=new Sequelize('expense','root','Satya0*123',{
  dialect:'mysql',
  host:'localhost'  
});
module.exports=sequelize;