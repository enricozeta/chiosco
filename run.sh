#!/bin/bash
mongod --config /usr/local/etc/mongod.conf
cd FE
ng serve
cd ../BE
node server.js