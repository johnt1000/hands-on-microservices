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
        let url = urlBase + "/characters/" + urlComplment+ "&limit=1&field_list=name,api_detail_url&filter=name:" + name;
        const powerPromise = axios(url);
        const [powers] = await Promise.all([
            powerPromise
        ]);

        if(powers.data.results.length > 0) {
            let url = powers.data.results[0].api_detail_url + urlComplment + "&field_list=name,powers";
            const powersPromise = axios(url);
            const [powersChar] = await Promise.all([
                powersPromise
            ]);

            return powersChar.data.results;
        } else {
            return { results: { data: {} } };
        }
    } catch (e) {
        console.error(e); // error
    }
}

// Create a server with a host and port
const server = Hapi.server({
    host:'0.0.0.0',
    port:8001
});

// Add the route

server.route({
    method:'GET',
    path:'/byCharacter/{name}',
    handler:function(request,h) {
        let name = request.params.name;
        if(name != "") {
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