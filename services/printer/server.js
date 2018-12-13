'use strict';

require('dotenv').config();
const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
var pdf = require('pdfkit');
var fs = require('fs');

const urlBase = process.env.URL_BASE_PROXY;

function printCharacter(data) {
    try {
        var myDoc = new pdf;
        myDoc.pipe(fs.createWriteStream('public/pdf/character/' + data + '.pdf'));
        myDoc.font('fonts/the-fontry_avengeance/AVENGEANCE.ttf')
            .fontSize(48)
            .text('NodeJS PDF Document ' + data, 100, 100);
        
        return myDoc.end();
    } catch (e) {
        console.error(e); // error
    }
}

// Create a server with a host and port
const server = Hapi.server({
    host:'0.0.0.0',
    port:8002,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

// Add the route
server.route({
    method:'GET',
    path:'/character/{name}',
    handler:function(request,h) {
        let name = request.params.name;
        if ( printCharacter(name) ) {
            return { result: { url: urlBase + '/character/' + name + '.pdf' } };
        } else {
            return { result: { url: null } };
        }
    }
});

const provision = async () => {

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });

    await server.start();
    console.log('Server running at:', server.info.uri);
};

provision();