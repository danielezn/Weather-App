import express from 'express';
import nconf from 'nconf';

import configManager from './config/configs';
import middlewareManager from './config/middleware';
import routeManager from './config/routes';
import assetsManager from './config/assets';
import cities from './cities/data.json'
import redis from 'redis';


const app = express();
const client = redis.createClient(nconf.get('redis-port'), nconf.get('redis-url'));

for(var city of Object.keys(cities)){
	client.hset('api.cities', city, JSON.stringify(cities[city]));
}

configManager.handle(app);
middlewareManager.handle(app);
assetsManager.handle(app);
routeManager.handle(app);

app.listen(nconf.get('port'), () => {
    console.log('Weather node listening: http://' + nconf.get('host') + ':' + nconf.get('port'));
});