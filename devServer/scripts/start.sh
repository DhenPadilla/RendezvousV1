#!/bin/bash

cd ../

# Make sure the env variables have been exported
source ./.envrc

# Start up PSQL
psql postgres -U dhen