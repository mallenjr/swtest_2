#!/bin/bash

curl -s -X POST https://qa2.mmjr.it/deploy -H 'Content-Type: application/json' -d "{\"new_tag\": \"latest\"}"