const express = require('express');
const filter = require('./filter')
const retrieveDef = require('../api/retrieveDef');
const createDef = require('../api/createDef');
const updateDef = require('../api/updateDef');
const deleteDef = require('../api/deleteDef');
const uploadDef = require('../api/uploadDef');
const login = require('../api/controllers/login')
const area = require('../api/controllers/area')
const major = require('../api/controllers/major')
const user = require('../api/controllers/user')
const info = require('../api/controllers/info')

module.exports = function(){
    var routes = express.Router();
    
    //login
    routes.get('/login', login.login)

    //filter
    routes.use(filter.filter)

    //area
    routes.get('/province', area.findAllProvince)
    routes.get('/city', area.findAllCity)
    routes.get('/school', area.findAllSchool)
    routes.get('/findBelongAreaByUser', area.findBelongAreaByUser)

    //major
    routes.get('/findMajorBySchool', major.findMajorBySchool)

    //user
    routes.get('/user', user.findAllUser)

    //info
    routes.get('/admission', info.findAdmissionYear)

    //old_api
    //create
    routes.post('/create', createDef.query);
    //delete
    routes.delete('/delete', deleteDef.query);
    //update
    routes.put('/update', updateDef.query);
    //retrieve
    routes.get('/retrieve', retrieveDef.query);
    //upload
    routes.post('/upload', uploadDef.query);

    return routes;
};