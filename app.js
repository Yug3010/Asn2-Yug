// Require  modules
var express = require('express'); // Import Express
var path = require('path'); // Import Node.js path module
var app = express(); // Create an instance of Express.js application
const exphbs = require('express-handlebars'); // Import Express Handlebars for template rendering
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
// const urlencoded = bodyParser.urlencoded({ extended: true })
const data=require('./datasetB.json');


// console.log(data);
app.use(bodyParser.urlencoded({ extended: true }));

// const updata=JSON.parse(data);

// Set the port number, either from environment variable or default to 3000
const port = 3000;



// Configure Express to use Handlebars as the view engine
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  helpers: {
    isEqualZero: function(reviews) {
      // console.log(reviews);
        return reviews === 0;
    },
    customReviews: function(reviews) {
      // console.log(reviews);
        return reviews === 0 ? "N/A" : reviews;
    }
  }
}));
app.set('view engine', 'hbs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route handling for the root URL
app.get('/', function(req, res) {
  // Render the 'index' template with dynamic data (title: 'Express')
  res.render('index', { title: 'Express' });
});

// Define route handling for the '/users' url
app.get('/users', function(req, res) {
  // Send a response with the message 'respond with a resource'
  res.send('respond with a resource');
});

app.get('/data/search/prdID', (req, res)=> {
  res.render('search', {
      layout:false// do not use the default Layout (main.hbs) 
  });
})

app.get('/data/search/prdName', (req, res)=> {
  res.render('searchname', {
      layout:false// do not use the default Layout (main.hbs) 
  });
})

app.get('/allData',(req,res)=>{
  res.render('allupdata',{data});
})

app.get('/data',(req,res)=>{
  res.render('data',{data})
})

app.get('/data/product/:id',(req,res)=>{
  let index=req.params.id;
  console.log(data[index].title);
  res.render('product',{data:data[index].title});
})
// Define a route for any other URL
app.get('*', function(req, res) {
  // Render the 'error' template with dynamic data (title: 'Error', message: 'Wrong Route')
  res.render('error', { title: 'Error', message:'Wrong Route' });
});



app.post('/data/search/prdID',(req,res)=>{
  let id=req.body.product_id;
  for(let i of data)
  {
    if(data[id]==i)
    {
      console.log(data[id]);
      res.render('output',{data:data[id]});
      break;
    }
  }
});

app.post('/data/search/prdName',(req,res)=>{
  let id=req.body.product_name;
  let match=data.filter((pr)=>{
    return pr.title.includes(id);
  })
  console.log(match);
  return res.render('output1',{data:match});
});


// Starting the Express.js server which is  listening on the port specified
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
