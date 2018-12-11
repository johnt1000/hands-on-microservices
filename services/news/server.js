'use strict';

require('dotenv').config()
const Hapi = require('hapi');
const axios = require('axios');

const urlBase = process.env.SHORTBOXED_ENDPOINT;

async function getNews() {
    try {
        let url = urlBase + "/new";
        const newPromise = axios(url);
        const [news] = await Promise.all([
            newPromise
        ]);
        
        return news.data;
    } catch (e) {
        console.error(e); // error
    }
}

// Create a server with a host and port
const server = Hapi.server({
    host:'0.0.0.0',
    port:8003
});

// Add the route
server.route({
    method:'GET',
    path:'/',
    handler:function(request,h) {
        return getNews();
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();