const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const Expense = require('./models/expenseModel');
const { where } = require('sequelize');

const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})
app.post('/expense',(req,res)=>{
    console.log(req.body);
    Expense.create(req.body)
        .then(result=>{
            console.log(result)
            res.json(result.dataValues);
        })
        .catch(err=>console.log(err));
});
app.get('/expense/:id',(req,res)=>{
    // console.log(req.body);
    Expense.findAll({where:{id:req.params.id}})
        .then(result=>{
            console.log(result);
            res.json(result);
        })
        .catch(err=>console.log(err));
})
app.get('/expense',(req,res)=>{
    // console.log(req.body);
    Expense.findAll()
        .then(result=>{
            console.log(result);
            res.json(result);
        })
        .catch(err=>console.log(err));
})
app.delete('/expense/:id',(req,res)=>{
    console.log(req.params);
    Expense.findByPk(req.params.id)
        .then(result=>{
            console.log(result);
            Expense.destroy({where:{id:req.params.id}})
                .then(res=>console.log(res))
                .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
})
Expense.sync()
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
app.listen(3000,()=>console.log(`listening on port 3000`));