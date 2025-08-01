#!/bin/bash
set -e

env=$1
project=altarf
subDomain=lookout
domain=celestialstudio.net

echo ====================================================================================
echo env: $env
echo project: $project
echo domain: $subDomain.$domain
echo ====================================================================================

# echo execute db scripts...
# cd ./db
# host=$(aws ssm get-parameter --name $env-db-host | jq .Parameter.Value | sed -e 's/^"//' -e 's/"$//')
# user=$(aws ssm get-parameter --name $env-db-user | jq .Parameter.Value | sed -e 's/^"//' -e 's/"$//')
# pwd=$(aws ssm get-parameter --name $env-db-pwd | jq .Parameter.Value | sed -e 's/^"//' -e 's/"$//')
# cluster=$(aws ssm get-parameter --name $env-db-cluster | jq .Parameter.Value | sed -e 's/^"//' -e 's/"$//')
# psql postgresql://$user:$pwd@$host:26257/$cluster.$project -f deploy.sql
# echo ====================================================================================

echo deploy backend AWS...
cd ./backend
npm install
npm run pre:deploy
aws cloudformation package --template-file aws/cloudformation/template.yaml --output-template-file packaged.yaml --s3-bucket y-cf-midway-ap-east-2
aws cloudformation deploy --template-file packaged.yaml --stack-name $project-$env-stack --parameter-overrides TargetEnvr=$env Project=$project SubDomain=$subDomain Domain=$domain --no-fail-on-empty-changeset --s3-bucket y-cf-midway-ap-east-2 --capabilities CAPABILITY_NAMED_IAM
echo ====================================================================================

echo prepare frontend files...
rm -rf ../webapp/src/model/backend
rm -rf ../webapp/src/constant/backend
cp -R lib/src/model ../webapp/src/model/backend
cp -R src/constant ../webapp/src/constant/backend
echo ====================================================================================

echo deploy frontend to S3...
cd ../webapp
npm i
npm run build
aws s3 sync ./dist s3://$project-$env --delete --cache-control no-cache
echo ====================================================================================
