'use strict';

require('dotenv').config()
const Hapi = require('hapi');
const axios = require('axios');

const urlBase = process.env.COMICVINE_ENDPOINT;
const privateKey = process.env.COMICVINE_PRIVATE_KEY;
const format = process.env.COMICVINE_FORMAT_RESPONSE;
const urlComplment = '?api_key=' + privateKey + '&format=' + format;

async function getPowers(name) {
    try {
        let url = urlBase + "/powers/" + urlComplment+ "&limit=100&name=" + name;
        const powerPromise = axios(url);
        const [powers] = await Promise.all([
            powerPromise
        ]);

        return powers.data;
    } catch (e) {
        console.error(e); // error
    }
}

// Create a server with a host and port
const server = Hapi.server({
    host:'0.0.0.0',
    port:8000
});

// Add the route

server.route({
    method:'GET',
    path:'/find/name/{name}',
    handler:function(request,h) {
        let name = request.params.name;
        if(id != "") {
            return getPowers(name);
        } else {
            return { results: { data: {} } };
        }
        
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