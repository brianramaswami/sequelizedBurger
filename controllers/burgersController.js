var express = require("express");
var db = require('../models');
var router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/index');
});

router.get('/index',(req,res)=>{
    db.Burgers.findAll({
        include:[db.Persons]
    }).then((data)=>{
        var dataObject = {
            allBurgers: data
        };
        res.render('index',dataObject);
    });
});

router.get('/burgers/all',(req,res)=>{
    db.Burgers.findAll({
        include:[db.Persons]
    }).then((data)=>{
        res.json(data);
    });
});

// // POST request functions
// // =============================================================
router.post('/burgers/new',(req,res)=>{
    //store the burger name as newBurger
    var newBurger = req.body.burger_name;
    //passes in newBurger and preforms a callback after it is done
    db.Burgers.create({
        burger_name: newBurger
    }).then((data)=>{
        //ends the server communication
        console.log(data);
        res.end();
    }).catch((err)=>{
        res.json(err);
    });
});

// // PUT request functions
// // =============================================================
router.put('/burgers/devour',(req,res)=>{
    //store the burger id as burgerID
    var burgerID = req.body.id;
    var userName = req.body.name;
    //passes in burgerID, 1 for true, preforms a callback 
    db.Persons.findOrCreate({
        where:{
            name:userName
        },
        defaults:{
            name:userName
        }
    }).then((data)=>{
        var userName = data[0].dataValues.id;
        db.Burgers.update({
            devoured: 1,
            PersonId: userName
        },{
            where:{
                id:burgerID
            }
        }).then((data)=>{
            //ends the server communication
            res.end();
        });
    }).catch((err)=>{
        res.json(err);
    });
    
});

// // DELETE request functions
// // =============================================================
router.delete('/burgers/reset',(req,res)=>{
    //preforms a callback after deleteTable has completed
    db.Burgers.destroy({
        where:{},
        truncate:true
    }).then((data)=>{
        //ends the server communication
        res.end();
    });
});

//exports the router which can run the functions above without exporting those
module.exports = router;