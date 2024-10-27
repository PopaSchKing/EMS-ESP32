#!/bin/sh

#
# Command line test for the API
#

# EMS_ESP API

emsesp_url="http://192.168.1.206"
emsesp_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWV9.2bHpWya2C7Q12WjNUBD6_7N3RCD7CMl-EGhyQVzFdDg"

curl -X GET ${emsesp_url}/api/system/info
echo "\n"

curl -X POST \
    -H "Authorization: Bearer ${emsesp_token}" \
    -H "Content-Type: application/json" \
    -d '{"data":"8 1"}' \
    ${emsesp_url}/api/system/read

echo "\n"

# HA API

ha_url="http://192.168.1.42:8123"
ha_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMzMyZjU1MjhlZmM0NGIyOTgyMjIxNThiODU1NDkyNSIsImlhdCI6MTcyMTMwNDg2NSwiZXhwIjoyMDM2NjY0ODY1fQ.Q-Y7E_i7clH3ff4Ma-OMmhZfbN7aMi_CahKwmoar"

# curl -X POST \
#     ${ha_url}/api/services/script/test_notify \
#     -H "Authorization: Bearer ${ha_token}" \
#     -H "Content-Type: application/json"
