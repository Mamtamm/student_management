const routes = require('express').Router();
const { isStudent } = require('./middelwares/isStudent');

//auth
routes.post(`/auth/login`, require('./routes/auth/auth_login'));
routes.put(`/auth/password`, require('./routes/auth/auth_create_password'));
routes.put(`/auth/resetpassword`, require('./routes/auth/auth_reset_password'));

//user
routes.post(`/user/register`, require('./routes/user/user_create'));
routes.get(`/user/:id(\\d+)/`, isStudent(), require('./routes/user/user_get_by_id'));
routes.get(`/user`, isStudent(), require('./routes/user/user_get_all'));
routes.put(`/user`, require('./routes/user/user_update'));

module.exports = routes;
