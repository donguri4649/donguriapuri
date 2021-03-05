const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'donguri',
  database: 'list_app'
});

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
   // console.log('success');
  });

app.get('/', (req, res) => {
    res.render('top.ejs');
  });
  
  app.get('/index', (req, res) => {
    connection.query(
      'SELECT * FROM users',
      (error, results) => {
       // console.log("test1");
       // console.log(results);
        res.render('index.ejs', {items: results});
      }
    );
  });
  
  app.get('/new', (req, res) => {
    res.render('new.ejs');
  });
  
  app.post('/create', (req, res) => {
    connection.query(
    //ここから?
      'INSERT INTO users (name) VALUES (?)',
      [req.body.itemName],
      (error, results) => {
        res.redirect('/index');
        //connection.query(
          //'SELECT * FROM users',
          //(error, results) => {
           // console.log(results);
           // console.log("test1");
           // res.render('index.ejs', {items: results});
         // }
       // );  
      }
    );
  });

  app.post('/delete/:id',(req,res)=>{
    //console.log(req.params.id);
    connection.query(
        'DELETE FROM users WHERE id = ?',
        [req.params.id],
        (error,results)=>{
    res.redirect('/index');
        }
    )
  });
  
  app.get('/edit/:id', (req, res) => {
    connection.query(
        'SELECT*FROM users WHERE id = ?',
        [req.params.id],
        (error,results) =>{
          res.render('edit.ejs',{item:results[0]});
        });
  });

  app.post('/update/:id', (req, res) => {
    connection.query(
        'UPDATE users SET name = ? WHERE id = ?',
        [req.body.itemName, req.params.id],
        (error, results) => {
          res.redirect('/index');
        }
      );
 });

 app.listen(port, () => console.log(`Example app listening on port ${port}!`))

  //app.listen(3000);
