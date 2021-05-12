import axios from 'axios';

const user = {
  correo: 'dontrampas@hotmail.com',
  contrasena: '12345',
};

const clienteAxios = async () => {
  return await axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 1000,
    headers: {
      Authorization: await axios.post('http://localhost:8080/login', user).then((token) => token.headers.authorization),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, DELETE, POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    },
  });
};

export default clienteAxios;
