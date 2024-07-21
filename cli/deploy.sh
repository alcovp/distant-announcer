#!/bin/bash
. ./../.env
echo "Uploading files to" $SERVER_HOST "as" $SERVER_USER"..."
rsync -av -e ssh ./../bin $SERVER_USER@$SERVER_HOST:~/distant-announcer/
rsync -av -e ssh ./../package.json $SERVER_USER@$SERVER_HOST:~/distant-announcer/
#ssh -t $SERVER_USER@$SERVER_HOST "cd distant-announcer && yarn && pm2 start bin/app.js --name distant-announcer"
ssh -t $SERVER_USER@$SERVER_HOST "cd distant-announcer && yarn && pm2 reload distant-announcer"
