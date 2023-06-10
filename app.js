const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://lee:7PtdA%40T%238Kh96LH@cluster0.s65thxa.mongodb.net/Node-API?retryWrites=true&w=majority";
const Product = require('./models/productModels');
app.use(express.json());
app.use(express.urlencoded({extended: false}));


mongoose.connect(uri).then(() => {
    console.log('connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Node API app is running on ${PORT}`);
    });
}).catch(() => {
    console.log(error);
});

//routes
app.get('/', (req, res) => {
    res.send({
        name: "Lee",
        age: 28
    });
});

app.get('/name', (req, res) => {
    res.send({
        name: "Ashley",
        age: 2
    });
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with an ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.get('/findproducts/:name', async (req, res) => {
    try {
        const {name} = req.params;
        const product = await Product.find({name: {$regex: name, $options: 'i'}}).limit(5);
        console.log(product);

        if(product.length === 0){
            res.status(404).json({message: `product name not found`});
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
} );

app.post('/products', async (req, res)=> {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.delete('/products/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message: `product name not found`});
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

