#!/usr/bin/env node

require('dotenv').config();
var amqp = require('amqplib/callback_api');
var pdf = require('pdfkit');
var fs = require('fs');

const urlBase = process.env.URL_BASE_PROXY;

amqp.connect('amqp://marvel:marvel@rabbit', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'rpc_queue';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    ch.consume(q, function reply(msg) {
      var data = JSON.parse(msg.content.toString());
      var r = printCharacter(data);

      ch.sendToQueue(msg.properties.replyTo, new Buffer(r.toString()), {correlationId: msg.properties.correlationId});
      ch.ack(msg);
    });
  });
});

function printCharacter(data) {
  try {
      var myDoc = new pdf;
      myDoc.pipe(fs.createWriteStream('public/pdf/character/' + data.id + '.pdf'));
      myDoc.font('fonts/the-fontry_avengeance/AVENGEANCE.ttf')
          .fontSize(30)
          .text(data.name + " - " + data.id, 20, 20)
          .fontSize(18)
          .text('Description', 20, 100)
          .text(data.description, 20, 140)
      
      if ( myDoc.end() ) {
        return urlBase + '/character/' + data.id + '.pdf';
      } else {
        return null;
      }
  } catch (e) {
      console.error(e); // error
  }
}