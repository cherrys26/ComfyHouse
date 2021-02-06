const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const products =
    [
        { id: 1, title: 'queen panel bed', price: "$10.99", image: "../images/product-1.jepg", description: "hello World", category: "Panel" },
        { id: 2, title: 'king panel bed', price: "$10.99", image: "../images/product-2.jepg", description: "hello Worl", category: "Panel" },
        { id: 3, title: 'single panel bed', price: "$10.99", image: "../images/product-3.jepg", description: "hello Wor", category: "Panel" },
        { id: 4, title: 'twin panel bed', price: "$10.99", image: "../images/product-4.jepg", description: "hello Wo", category: "Panel" },
        { id: 5, title: 'fridge', price: "$10.99", image: "../images/product-5.jepg", description: "hello W", category: "Panel" },
        { id: 6, title: 'dresser', price: "$10.99", image: "../images/product-6.jepg", description: "hello ", category: "Panel" },
        { id: 7, title: 'couch', price: "$10.99", image: "../images/product-7.jepg", description: "hell", category: "Panel" },
        { id: 8, title: 'table', price: "$10.99", image: "../images/product-8.jepg", description: "hel", category: "Panel" },
    ]
    ;

app.get('/', (req, res) => {
    res.send(products);
});

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.post('/api/products', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const course = {
        id: products.length + 1,
        title: req.body.title,
    };
    products.push(course);
    res.send(course);
});

app.put('/api/products/:id', (req, res) => {
    const course = products.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    course.title = req.body.title;
    course.price = req.body.price;
    res.send(course);

});

app.delete('/api/products/:id', (req, res) => {
    const course = products.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = products.indexOf(course);
    products.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

};


app.get('/api/products/:id', (req, res) => {
    const course = products.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// const { response } = require('express');
// const express = require('express');
// const app = express();


// app.use(express.json());


// const products =
//     [
//         { id: 1, title: 'queen panel bed', price: "$10.99", image: "../images/product-1.jepg", description: "hello World", category: "Panel" },
//         { id: 2, title: 'king panel bed', price: "$10.99", image: "../images/product-2.jepg", description: "hello Worl", category: "Panel" },
//         { id: 3, title: 'single panel bed', price: "$10.99", image: "../images/product-3.jepg", description: "hello Wor", category: "Panel" },
//         { id: 4, title: 'twin panel bed', price: "$10.99", image: "../images/product-4.jepg", description: "hello Wo", category: "Panel" },
//         { id: 5, title: 'fridge', price: "$10.99", image: "../images/product-5.jepg", description: "hello W", category: "Panel" },
//         { id: 6, title: 'dresser', price: "$10.99", image: "../images/product-6.jepg", description: "hello ", category: "Panel" },
//         { id: 7, title: 'couch', price: "$10.99", image: "../images/product-7.jepg", description: "hell", category: "Panel" },
//         { id: 8, title: 'table', price: "$10.99", image: "../images/product-8.jepg", description: "hel", category: "Panel" },
//     ];

// let handleRequest = (req, res) => {
//     res.write(200, {
//         'Content-type': 'text/html'
//     });
//     fs.readFile('../index.html', null, function (err, data) {
//         if (err) {
//             res.writeHead(404);
//             res.write('File not found :(');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// };

// http.createServer(handleRequest).listen(8000);

// app.get('/product/:id', (req, res) => {
//     const product = products.find(c => c.id === parseInt(req.params.id));
//     if (!product) return res.status(404).send('The product with the given ID was not found.');
//     res.send(product);
// });
// app.get('/home', (req, res) => {
//     res.send(products);
// });

// const port = 5502;
// app.listen(port, () => console.log(`Listening on port ${port}...`));