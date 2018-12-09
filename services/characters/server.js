'use strict';

require('dotenv').config()
const Hapi = require('hapi');
const axios = require('axios');
const md5 = require('md5');
const moment = require('moment');

const urlBase = process.env.MARVEL_ENDPOINT;
const privateKey = process.env.MARVEL_PRIVATE_KEY;
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const ts = moment().unix().toString();
const hash = md5(ts + privateKey + publicKey);
const urlComplment = "?ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;

async function getCharactersData(offset) {
    try {
        let url = urlBase + "/characters" + urlComplment+ "&limit=100&offset=" + offset;
        const characterPromise = axios(url);
        const [characters] = await Promise.all([
            characterPromise
        ]);

        return characters.data;
    } catch (e) {
        console.error(e); // error
    }
}

async function getCharacterData(id) {
    try {
        let url = urlBase + "/characters" + urlComplment+ "&id=" + id;
        const characterPromise = axios(url);
        const [character] = await Promise.all([
            characterPromise
        ]);

        return character.data;
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
    path:'/list/p/{page}',
    handler:function(request,h) {
        let offset = request.params.page;
        if(offset > 1) {
            // offset += 1;
            offset *= 100;
        } else {
            offset = 0;
        }
        return getCharactersData(offset);
    }
});

server.route({
    method:'GET',
    path:'/find/id/{id}',
    handler:function(request,h) {
        let id = request.params.id;
        if(id > 0) {
            return getCharacterData(request.params.id);
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