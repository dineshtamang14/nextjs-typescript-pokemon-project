curl "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "[\"/pokemon/1\"]"
