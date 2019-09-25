# serenata
Dummy tcp server

## Clone

```
git clone git@github.com:tefra/serenata.git
```

## Run through docker

```
make up
```

## Run with local node

```
npm install
npm start
```


### Run output

````
serenata_1  | 
serenata_1  | > serenata@1.0.0 start /usr/app
serenata_1  | > nodemon --inspect src/server.js
serenata_1  | 
serenata_1  | [nodemon] 1.19.2
serenata_1  | [nodemon] to restart at any time, enter `rs`
serenata_1  | [nodemon] watching dir(s): *.*
serenata_1  | [nodemon] starting `node --inspect src/server.js`
serenata_1  | Debugger listening on ws://127.0.0.1:9229/722351d5-804b-48ca-9814-35bf87712447
serenata_1  | For help, see: https://nodejs.org/en/docs/inspector
serenata_1  | server listening to {"address":"::","family":"IPv6","port":6789}

````
