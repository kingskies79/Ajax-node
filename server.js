var express = require('express');
var bodyParser = require('body-parser');

var app = new express();
app.use(bodyParser.json());

app.use(express.static(__dirname));

var PORT = 8001

var products =[
    {
        id:1,
        name: "laptop"
        
    },
    {
        id:2,
        name: "mouse"
    },
    {
        id:3,
        name:"monitor"
    }
]
var index=4;
app.get('/products', function(req, res){
    res.send(products);
})

app.post('/products', function(req, res){
     var product = {
        id: index,
        name: req.body.name
    };
    index++;
    products.push(product);
    res.send("A new product has been added!");
})
app.put('/products/:id', function(req,res){
    var id= req.params.id;
    products[--id].name= req.body.name;
    res.send("The product " +id + " has been updated");
})

app.delete('/products/:id', function(req,res) {
    var id = req.params.id;
    products.splice(--id,1);
    res.send("the product con id "+ id + " has been deleted");
})
app.listen(PORT, ()=> {
    console.log("Server is running on port " + PORT);
})