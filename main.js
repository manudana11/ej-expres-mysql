const express = require('express');
const app = express();
const db = require('./config/database.js')
const PORT = 3000;

app.use(express.json());
app.use("/products", require("./routes/products.js"));
app.use("/categories", require("./routes/categories.js"));

app.get('/createdb', (req,res) => {
let sql = 'CREATE DATABASE expressDB';
db.query(sql, (err,result) => {
    if(err)throw err;
    console.log(result);
    res.send('Database created...');
});
});

app.get('/createpoststable',(req,res)=>{
let sql = 'CREATE TABLE products(id INT AUTO_INCREMENT, product_name VARCHAR(255), product_price INT, product_brand VARCHAR(255), product_description VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts table created...');
    });
});

app.get('/createvategoriestable',(req,res)=>{
    let sql = 'CREATE TABLE categories(id INT AUTO_INCREMENT, categorie_name VARCHAR(255), PRIMARY KEY(id))'
        db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
        });
    });

app.get('/createproductscategoriestable',(req,res)=>{
    let sql = 'CREATE TABLE products_categories(id INT AUTO_INCREMENT, product_id INT, categorie_id INT, PRIMARY KEY(id), FOREIGN KEY(product_id) REFERENCES products(id), FOREIGN KEY(categorie_id) REFERENCES categories(id))'
        db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
        });
    });

app.post("/addproductscategorie", (req, res) => {
    console.log(req.body);
    let sql = `INSERT INTO products_categories (product_id, categorie_id) VALUES (1, 1), (2, 2);`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Post added...");
    });
});
    
app.get('/allproductsandcategories', (req,res) => {
    let sql = 'SELECT products.product_name, products.product_price, products.product_brand, products.product_description, categories.categorie_name FROM products INNER JOIN products_categories ON products.id = products_categories.product_id INNER JOIN categories ON products_categories.categorie_id = categories.id';
    console.log("Executing SQL:", sql);
    db.query(sql, (err,result) => {
      if(err) {
        console.log("Error executing query:", err);
        throw err};
      res.send(result);
    });
});

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));