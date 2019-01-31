#!/usr/bin/env sh

yarn run build

rm -rf dist/data
cp -r public/data dist/
