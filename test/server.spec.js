const request = require('supertest');
const server = require('../src/app');

describe('Operaciones CRUD Usuarios', () => {
    let token; // Para almacenar el token del usuario autenticado

    // Registrar usuario con datos inválidos (debe fallar)
    it('POST /register - Falla por datos inválidos', async () => {
        const res = await request(server)
            .post('/register')
            .send({
                username: 'Nombre Prueba',
                password: 'password123',
                email: '',
                direccion: 'test',
                telefono: '123123',
                rol: 'user'
            });

        console.log("Response body:", res.body);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Todos los campos son requeridos');
    });

    // Registrar exitoso
    it('POST /register - Registro exitoso', async () => {
        const res = await request(server)
            .post('/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'correo@prueba.cl',
                direccion: 'Calle de Prueba 123',
                telefono: '123456789',
                rol: 'user'
            });


        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Usuario registrado con éxito');
        expect(res.body.user).toHaveProperty('id');
    });

    // Iniciar sesión con usuario inexistente (debe fallar por usuario inexistente)
    it('POST /login - Usuario no encontrado', async () => {
        const res = await request(server)
            .post('/login')
            .send({
                email: 'correo@inexistente.cl',
                password: 'password123'
            });


        expect(res.statusCode).toEqual(404);
    });

    // Iniciar sesión exitoso
    it('POST /login - Login exitoso', async () => {
        const res = await request(server)
            .post('/login')
            .send({
                email: 'correo@prueba.cl',
                password: 'password123'
            });


        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Guardamos Token para validar usuario
    });

    // Obtener usuario sin token (debe fallar por falta de token)
    it('GET /usuario - Sin token (Debe fallar)', async () => {
        const res = await request(server)
            .get('/usuario');


        expect(res.statusCode).toEqual(401);
    });

    // Obtener usuario con token válido
    it('GET /usuario - Obtener usuario autenticado', async () => {
        const res = await request(server)
            .get('/usuario')
            .set('Authorization', `Bearer ${token}`); // Pasamos el token en el header

            
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('email', 'correo@prueba.cl');
    });

});