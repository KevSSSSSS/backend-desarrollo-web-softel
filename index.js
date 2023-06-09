const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Nombre de usuario de MySQL
    password: '', // Contraseña de MySQL
    database: 'prueba-web', // Nombre de la base de datos creada en XAMPP
});

// Habilita CORS para todos los metodos
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// Middleware de body-parser para obtener el body de la información recibida
app.use(bodyParser.json());

//Metodo Get
app.get('/current_values', (req, res) => {
    connection.query('SELECT * FROM current_info', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json({ data: results });
        }
    });
});

//Metodo Post
app.post('/current_values', (req, res) => {
    const body = req.body;
    let query = `INSERT INTO current_info VALUES ('${body.id}','${body.name}','${body.date}', '${body.currentValue}')`;
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json({ data: results });
        }
    });
});

//Metodo Put
app.put('/current_values', (req, res) => {
    const body = req.body;
    let query = `UPDATE current_info SET currentValue = '${body.currentValue}', date = '${body.date}' where name = '${body.name}'`;
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json({ data: results });
        }
    });
});

//Metodo Get
app.get('/door', (req, res) => {
    connection.query('SELECT * FROM doors_records', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json({ data: results });
        }
    });
});

//Metodo Post
app.post('/door', (req, res) => {
    const body = req.body;
    let query = `INSERT INTO doors_records VALUES (default,'${body.value}','${body.date}')`;
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json({ data: results });
        }
    });
});

//Metodo Get
app.get('/thermometer', (req, res) => {
    connection.query('SELECT * FROM thermometer_records', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json({ data: results });
        }
    });
});

//Metodo Post
app.post('/thermometer', (req, res) => {
    const body = req.body;
    let query = `INSERT INTO thermometer_records VALUES (default,'${body.value}','${body.date}')`;
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json({ data: results });
        }
    });
});

// Iniciar el servidor
const port = 4000; // Puerto en el que se ejecutará el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});