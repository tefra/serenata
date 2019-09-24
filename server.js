const net = require('net');
const utils = require('./utils.js');

const server = net.createServer();

const handleConnection = (conn) => {
  const remoteAddress = `${conn.remoteAddress}:${conn.remotePort}`;
  console.log('new client connection from %s', remoteAddress);

  const onConnData = (d) => {
    console.log('connection data from %s: %j', remoteAddress, d);
    conn.write(utils.fetchRandomSample());
  };

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
