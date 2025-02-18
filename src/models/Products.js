const { pool } = require('../config/db');

// Modelo para obtener productos en Oferta
const getProductsSale = async () => {
    try {
        const consulta = 'SELECT * FROM products WHERE sale = true';
        const { rows } = await pool.query(consulta);
        return rows;
    } catch (error) {
        throw error;
    }
}

// Modelo para obtener productos
const getProducts = async () => {
    try {
        const consulta = 'SELECT * FROM products';
        const { rows } = await pool.query(consulta);
        return rows;
    } catch (error) {
        throw error;
    }
}

// Modelo para obtener un producto por id
const getProductById = async (id) => {
    try {
        const consulta = 'SELECT * FROM products WHERE id = $1';
        const values = [id];
        const { rows } = await pool.query(consulta, values);
        return rows;
    } catch (error) {
        throw error;
    }
}

// Modelo para crear un producto
const createProduct = async (name, price, description, stock, sale) => {
    try {
        const consulta = 'INSERT INTO products (name, price, description, stock, sale) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [name, price, description, stock, sale];
        const { rows } = await pool.query(consulta, values);
        return rows;
    } catch (error) {
        throw error;
    }
}