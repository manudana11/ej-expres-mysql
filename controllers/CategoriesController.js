const db = require("../config/database");

const CategoriesController = {
    insert (req, res) {
        console.log(req.body);
        let sql = `INSERT INTO categories (categorie_name) values ('${req.body.categorie_name}');`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Post added...");
        });
    },
    uppdatecat (req,res) {
        let sql = `UPDATE categories SET categorie_name = '${req.body.categorie_name}' WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
            if(err) throw err;
            res.send('Post updated...');
        });
    },
    allCats (req,res) {
        let sql = 'SELECT * FROM categories';
        db.query(sql,(err,result) => {
          if(err) throw err;
          res.send(result);
        });
    },
    selectById (req,res) {
        let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
        db.query(sql, (err,result) => {
          if(err) throw err;
          res.send(result);
        });
    }
};

module.exports = CategoriesController;  