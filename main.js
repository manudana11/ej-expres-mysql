const express = require('express');
const app = express();
const db = require('./config/database')
const PORT = 3000;

app.use(express.json());

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

app.post("/", (req, res) => {
    console.log(req.body);
    let sql = `INSERT INTO products (product_name, product_price, product_brand, product_description) values ('${req.body.product_name}', '${req.body.product_price}', '${req.body.product_brand}', '${req.body.product_description}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Post added...");
    });
});

app.post("/addcategorie", (req, res) => {
    console.log(req.body);
    let sql = `INSERT INTO categories (categorie_name) values ('${req.body.categorie_name}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Post added...");
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
    
app.put('/products/id/:id',(req,res)=>{
    let sql = `UPDATE products SET product_price = '${req.body.product_price}' WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
        if(err) throw err;
        res.send('Post updated...');
    });
});

app.put('/categories/id/:id',(req,res)=>{
    let sql = `UPDATE categories SET categorie_name = '${req.body.categorie_name}' WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
        if(err) throw err;
        res.send('Post updated...');
    });
});

app.get('/allproducts', (req,res) => {
    let sql = 'SELECT * FROM products';
    db.query(sql, (err,result) => {
      if(err) throw err;
      res.send(result);
    });
});
  
app.get('/allcategories', (req,res) => {
    let sql = 'SELECT * FROM categories';
    db.query(sql,(err,result) => {
      if(err) throw err;
      res.send(result);
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

app.get('/products/id/:id',(req,res) => {
    let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err,result) => {
      if(err) throw err;
      res.send(result);
    });
});

app.get('/productsdesc', (req,res) => {
    let sql = 'SELECT * FROM products ORDER BY id DESC';
    db.query(sql, (err,result) => {
      if(err) throw err;
      res.send(result);
    });
});

app.get('/categories/id/:id', (req,res) =>{
    let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
    db.query(sql, (err,result) => {
      if(err) throw err;
      res.send(result);
    });
});

app.get('/products/product_name/:product_name', (req,res)=>{
    let sql = `SELECT * FROM products WHERE product_name = '${req.params.product_name}'`;
    db.query(sql, (err,result) => {
      if(err) throw err;
      res.send(result);
    });
});

app.delete('/delete/id/:id', (req,res)=>{
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err,result) => {
      if(err) throw err;
      res.send('Post deleted');
    });
});
  
  
  

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));