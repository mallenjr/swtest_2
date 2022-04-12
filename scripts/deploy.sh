#!/bin/bash

curl -s -X POST http://qa2.mmjr.it:5000/deploy \
    -H 'Content-Type: application/json' \
    -d "{\"new_tag\": \"latest\"}"