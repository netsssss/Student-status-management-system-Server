'use strict';

const express = require('express')
const estatic = require('express-static')
const bodyParser = require('body-parser')
const multer  = require('multer')
const router = require('./router/router');
const useHistory = require('connect-history-api-fallback');

var app = express();

//0.Solve Ajax cross domain problem
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Expose-Headers", "*");
    if(req.method == 'OPTIONS') {
        //Let 'options' request return quickly.
        res.sendStatus(200);
    } else {
        next();
    }
});

//1.vue-router-history
app.use(useHistory());

//2.handling-request-data
var upload = multer({dest: './static/upload'});
app.use(upload.any());
app.use(bodyParser({extended:false}));
app.use(bodyParser.json());

//3.api-route
app.use('/api/', router());

//4.putting-static-files
// app.use(estatic('./static/dist'));
app.use(express.static('./static/dist'));

//5.listen-port
const PORT = process.env.PORT || 8088;
app.listen(PORT);