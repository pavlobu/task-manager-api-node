# Description

A task manager api built using:
nodejs, express, jsonwebtoken, mongodb, mongoose etc.
### third party apis: 
[Sendgrid](https://sendgrid.com/) -- api for sending emails to clients


# Prerequisites

* `nodejs` installed
* `npm` installed

# Setup

```bash
cd task-manager-api-node
npm install
```

# Configure heroku app:
When pushed your app to heroku repository,
you need to set environment varibales using
`heroku config`
[More info here](https://devcenter.heroku.com/articles/config-vars)
### Example:
```bash
heroku config:set JWT_SECRET=thisismyawesomesecret
MONGODB_URL=mongodb://address-to-your-mongo-db-cluster/task-manager-api # actually this one you can get for free from Mongodb Atlas
SENDGRID_API_KEY=SG.fKx9Rmi6TPCntDrycEqCpg.t5na8ORUddsfI2gsvGj1JCUPKOJ3BUsiw2R3sha9pX5i9UE
```


### don't have token for sendgrid?
Get them one free with non payed subscription form this service accordingly:
[Sendgrid](https://sendgrid.com/) -- api for sending emails to clients


# Run production mode on local machine

```bash
export PORT=3000 # if run on your local. on heroku this var is set already for you
export JWT_SECRET=thisismyawesomesecret
export MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api
export SENDGRID_API_KEY=SG.fKx9Rmi6TPCntDrycEqCpg.t5na8ORUddsfI2gsvGj1JCUPKOJ3BUsiw2R3sha9pX5i9UE
npm run
```

# Run develop mode
* Change port number on which you want server to run in `config/dev.env` in `config` folder

## Configure dev env:
Put your tokens for Sendgrid in
`config/dev.env`
dont have this file and dir? create one ^^ from the root of this project

### Example `config/dev.env`:
```
PORT=3000
JWT_SECRET=thisismyawesomesecret
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api
SENDGRID_API_KEY=SG.fKx9Rmi6TPCntDrycEqCpg.t5na8ORUddsfI2gsvGj1JCUPKOJ3BUsiw2R3sha9pX5i9UE
```
to start dev server:
* you need to have mongodb running on your local machine
```
npm run dev
```

# Run test
## Configure dev env:
Put your tokens for Sendgrid in
`config/test.env`
dont have this file and dir? create one ^^ from the root of this project in `config` folder

### Example `config/test.env`:
```
PORT=3000
JWT_SECRET=thisismyawesomesecret
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api
SENDGRID_API_KEY=SG.fKx9Rmi6TPCntDrycEqCpg.t5na8ORUddsfI2gsvGj1JCUPKOJ3BUsiw2R3sha9pX5i9UE
```

```bash
npm run test
```

# Run test dev

First do same config as in section **Run test**
then run in your terminal

```
npm run test-dev
```