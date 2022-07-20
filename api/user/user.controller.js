const models = require("../../models/index");
const user = models.user;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports = {
    controllerGetAll:(req,res)=>{
        user.findAll()
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerGetId:(req,res)=>{
        const param = { id_user: req.params.id_user}
        user.findOne({where:param})
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerAdd:(req,res)=>{
        const data = {
            nama     : req.body.nama,
            username : req.body.username,
            password : md5(req.body.password),
            role     : req.body.role
        }
        user.create(data)
        .then(result => {
            res.json({
                message : "data has been added",
                success : 1,
                data : result, data
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerEdit:(req,res)=>{
        const param = { id_user: req.body.id_user}
        const data = {
            id_user  : req.body.id_user,
            nama     : req.body.nama,
            username : req.body.username,
            password : md5(req.body.password),
            role     : req.body.role
        }
        user.update(data , {where: param})
        .then(result => {
            res.json({
                message : 'data has been updated',
                success : 1,
                data : result,data
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerDelete: (req,res)=>{
        const param = { id_user: req.params.id_user}
        user.destroy({where: param})
        .then(result => {
            res.json({
                message : "data has been deleted",
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerAuth: async (req,res)=>{
        const data = {
            username : req.body.username,
            password : md5(req.body.password),
            role     : req.body.role
        }
        let result = await user.findOne({where: data})
        if(result){
            // generate token
            let token = jwt.sign({ sub: result.id_user, role: result.role }, config.secret)
            res.json({
                logged: true,
                data: result,
                token: token
            })
        }else{
            res.json({
                logged: false,
                message: "Username or password is incorrect",
                data: result
            })
        }   
    }
}
