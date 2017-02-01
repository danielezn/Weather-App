import FS from 'fs';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import baseManager from './base';
import Cities from '../cities/cities'
import weatherError from './errors';
import redis from 'redis';
import nconf from 'nconf';
import apiResult from '../cities/api-example'

const routeManager = Object.assign({}, baseManager, {

    configureDevelopmentEnv(app) {
        const api = this.handlerApiRouter();
        const pages = this.handlerPageRouter();
        app.use('/api', api);
        app.use('/', pages);
    },

    handlerPageRouter() {
        const router = express.Router();
        router.get('*', (req, res) => {
            res.render('index');
        });
        return router;
    },

    handlerApiRouter(app) {
        const router = express.Router();
        const cities = new Cities();
        const client = redis.createClient(nconf.get('redis-port'), nconf.get('redis-url'));

        router.get('/updated-cities', (req, res) => {
            try{
                if (Math.random(0, 9) < 0.1) throw new weatherError("How unfortunate! The API Request Failed");
                cities.getAll((result) => res.json(result));
                // apiResult.map((city)=>{
                //     city['img'] = "/assets/images/" + city.timezone + ".jpg";
                // });
                // res.json(apiResult)
            }catch(e){
                if(e instanceof weatherError){
                    console.log('Error custom')
                    client.hset('api.errors', Date.now().toString(), e.message);
                    res.json({'error': e})
                }
            }

        });

        return router;
    }

});

export default routeManager;