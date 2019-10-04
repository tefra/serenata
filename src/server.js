const net = require('net');
const utils = require('./utils.js');
const Header = require('./models/header.js').Header;

const server = net.createServer();

const handleConnection = (conn) => {
  const remoteAddress = `${conn.remoteAddress}:${conn.remotePort}`;
  console.log('new client connection from %s', remoteAddress);
  let rawData = Buffer.alloc(0);
  let header = null;
  let request = null;

  const onConnData = (d) => {
    rawData = Buffer.concat([rawData, d]);
    if (rawData.length >= 100 && header == null) {
      const length = rawData.readUInt32BE(0);
      const created = rawData.readUInt32BE(4);
      const messageId = rawData.readUInt32BE(8);
      const customerId = rawData.readUInt16BE(44);
      const flagOne = rawData.readUInt16BE(46);
      const flagTwo = rawData.readUInt16BE(47);
      const keyId = rawData.readUInt32BE(48);
      header = new Header(length, messageId, customerId, keyId);
    }

    if (header && (rawData.length - 100) === header.getLength()) {
      request = rawData.slice(100).toString();

      conn.write(header.getBytes());
      conn.write(utils.fetchRandomSample());
      conn.end();
      console.log('server responding to %s: %s', remoteAddress, rawData.toString());
    } else {
      console.log('buffering connection data from %s: %s', remoteAddress, d);
    }
  }

  const onConnClose = () => {
    console.log('connection from %s closed', remoteAddress);
  };

  const onConnError = (err) => {
    console.log('Connection %s error: %s', remoteAddress, err.message);
  };

  conn.on('data', onConnData);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);
};

server.on('connection', handleConnection);
server.listen(6789, () => {
  console.log('server listening to %j', server.address());
});
