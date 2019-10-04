var net = require('net');
var Header = require('./models/header.js').Header;
var keyInfo = '<?xml version="1.0" encoding="UTF-8"?>' +
  '<sirena>' +
  '<query>' +
  '<iclient_pub_key>' +
  '<pub_key>MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCuNN' +
  'drDTCHfFK4SVafOOfJeJvW2JdiV2jE2PJj7wCii/dL' +
  'H+65QC4X0qwGOQZ+T+SRvrkEqzcf04pUwlti8cLjHjC' +
  'ROscuyswFm02pnAjZaNl2h4nEOel8pi8tlwXpL/Vwph' +
  'EDdrRK5Pd9fYS7x5EtuRnrWuhUUV478Nz2GW5AgQIDAQAB</pub_key>' +
  '</iclient_pub_key>' +
  '</query>' +
  '</sirena>';

var client = new net.Socket();
client.connect(6789, 'localhost', function () {
// client.connect(6789, 'localhost', function () {
  const headers = new Header(keyInfo.length, 444, 8153, 444).getBytes();
  const request = Buffer.from(keyInfo);
  const message = Buffer.concat([headers, request]);

  console.log(headers.toString('hex'));
  client.write(message);
});

client.on('data', function (data) {
  console.log('Received: ' + data);

});

client.on('close', function () {
  client.destroy(); // kill client after server's response
  console.log('Connection closed');
});
