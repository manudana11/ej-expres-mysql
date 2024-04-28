const express = require('express');
const router = express.Router();
const db = require('../config/database.js');

router.post("/addcategorie", (req, res) => {
    console.log(req.body);
    let sql = `INSERT INTO categories (categorie_name) values ('${req.body.categorie_name}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Post added...");
    });
});

router.put('/categories/id/:id',(req,res)=>{
    let sql = `UPDATE categories SET categorie_name = '${req.body.categorie_name}' WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
        if(err) throw err;
        res.send('Post updated...');
    });
});
  
router.get('/allcategories', (req,res) => {
    let sql = 'SELECT * FROM categories';
    db.query(sql,(err,result) => {
      if(err) throw err;
      res.send(result);
    });
});

router.get('/categories/id/:id', (req,res) =>{
    let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
    db.query(sql, (err,result) => {
      if(err) throw err;
      res.send(result);
    });
});


module.exports = router;