#!/usr/bin/env sh

rm -rf public/data/*.json

TEMPLATE="export let cardset_files = ["

SET_IDS="00 01"

for SET_ID in $SET_IDS
do

echo Fetching cardset $SET_ID

URL=`http "https://playartifact.com/cardset/$SET_ID" | jq -r '.cdn_root + .url'`

FILENAME=`basename $URL`

wget $URL -O ./public/data/$FILENAME

TEMPLATE="$TEMPLATE\n  '$FILENAME',"

done

TEMPLATE="$TEMPLATE\n]"

echo -e $TEMPLATE > ./src/CardsetFiles.imba
