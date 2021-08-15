#!/bin/bash

git pull origin master
npm i
npm run-script build
chown -R root:www-data .
systemctl reload nginx
