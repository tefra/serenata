var net = require('net');
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
client.connect(34322, '193.104.87.251', function () {
// client.connect(6789, 'localhost', function () {
  console.log('Connected');
  console.log('Message Length: ' + keyInfo.length);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(keyInfo.length);
  const created = Buffer.alloc(4);
  console.log(Math.floor(Date.now() / 1000));
  created.writeUInt32LE(Math.floor(Date.now() / 1000));
  const messageId = Buffer.alloc(4);
  messageId.writeUInt32BE(999)

  const reserved = Buffer.alloc(32);
  const customerId = Buffer.alloc(2);
  customerId.writeUInt16BE(8153);
  const flagOne = Buffer.alloc(1);
  const flagTwo = Buffer.alloc(1);
  const keyId = Buffer.alloc(4);
  keyId.writeUInt32BE(444)
  const suffix = Buffer.alloc(48);

  const headers = Buffer.concat([
    length, created, messageId,
    reserved, customerId, flagOne,
    flagTwo, keyId, suffix
  ], 100);

  const request = Buffer.from(keyInfo);

  const message = Buffer.concat([headers, request], headers.length + request.length);

  console.log(headers.toString('hex'));
  // console.log(message.toString());
  client.write(message);
});

client.on('data', function (data) {
  console.log('Received: ' + data);

});

client.on('close', function () {
  client.destroy(); // kill client after server's response
  console.log('Connection closed');
});
