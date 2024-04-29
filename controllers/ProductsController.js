const db = require("../config/database");

const ProductController = {
    instert (req, res) {
        let sql = `INSERT INTO products (product_name, product_price, product_brand, product_description) values ('${req.body.product_name}', '${req.body.product_price}', '${req.body.product_brand}', '${req.body.product_description}');`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Product added...");
        });
    },
    updateProd (req,res) {
        let sql = `UPDATE products SET product_price = '${req.body.product_price}' WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
            if(err) throw err;
            res.send('Product updated...');
        });
    },
    getAll (req,res) {
        let sql = 'SELECT * FROM products';
        db.query(sql, (err,result) => {
          if(err) throw err;
          res.send(result);
        });
    },
    selectById (req,res) {
        let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
        db.query(sql, (err,result) => {
          if(err) throw err;
          res.send(result);
        });
    },
    productsDesc (req,res) {
        let sql = 'SELECT * FROM products ORDER BY id DESC';
        db.query(sql, (err,result) => {
          if(err) throw err;
          res.send(result);
        });
    },
    selectByName (req,res) {
        let sql = `SELECT * FROM products WHERE product_name = '${req.params.product_name}'`;
        db.query(sql, (err,result) => {
          if(err) throw err;
          res.send(result);
        });
    },
    delete (req,res) {
        let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
        db.query(sql, (err,result) => {
          if(err) throw err;
          res.send('Product deleted');
        });
    }
}

module.exports = ProductController;