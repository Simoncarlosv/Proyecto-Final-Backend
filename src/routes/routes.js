const { Router } = require('express');
const { handleLogin, handleRegister, handleGetUser } = require('../controllers/auth.controller');
const { verificarCredencialesMiddleware, validarTokenMiddleware } = require('../middlewares/authMiddleware');

const router = Router();

// Rutas de la aplicación
router.get('/', ); // home

// Rutas de productos
router.get('/productos', (req, res)=> {
    console.log("obteniendo datos de ejemplo")
    res.status(200).json([1,2,3])
}) // obtener productos
router.post('/productos', ); // crear producto
router.get('/productos/:id', ); // obtener producto por id

// Rutas de usuarios
router.post('/login', verificarCredencialesMiddleware, handleLogin); // login
router.post('/register', handleRegister); // registrar usuarios
router.get('/usuario', validarTokenMiddleware, handleGetUser); // obtener usuarios autenticados

// Rutas de pedidos
router.post('/pedidos', ); // crear pedido

module.exports = router;