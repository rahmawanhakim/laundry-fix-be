const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete
    } = require('./paket.controller');
const authorize = require('../auth/authorize');
const {IsKasir, IsAdmin, IsOwner} = require('../auth/role');

// routes
router.get('/', /*authorize, IsAdmin,*/ controllerGetAll); //admin only
router.get('/:id_paket', /*authorize, IsAdmin,*/ controllerGetId); //admin only
router.post('/', /*authorize, IsAdmin,*/ controllerAdd); // all authenticated 
router.put('/', /*authorize, IsAdmin,*/ controllerEdit); //admin only
router.delete('/:id_paket', /*authorize, IsAdmin,*/ controllerDelete); //admin only
module.exports = router;
