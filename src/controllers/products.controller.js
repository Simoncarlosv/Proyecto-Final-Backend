const { pool } = require('../config/db');

const getProductsSale = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE sale = true');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No hay productos en oferta' });
        }
        res.json(result.rows);
    } catch (error) {
        console.error('Error en getProductsSale:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getProducts = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error en getProducts:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'ID de producto inválido' });
        }

        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error en getProductById:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, category, image, sale } = req.body;

        // Validaciones básicas
        if (!name || !price || !category) {
            return res.status(400).json({ 
                message: 'Nombre, precio y categoría son campos requeridos' 
            });
        }

        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock, category, image, sale) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, description, price, stock, category, image, sale]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error en createProduct:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getProductsSale,
    getProducts,
    getProductById,
    createProduct
};