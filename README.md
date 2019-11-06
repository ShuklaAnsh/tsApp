[![Build Status](https://travis-ci.com/seng350/seng350f19-project-1-1.svg?token=5TAt8M5pirEZt3tvYP28&branch=master)](https://travis-ci.com/seng350/seng350f19-project-1-1)

[![BCH compliance](https://bettercodehub.com/edge/badge/archers1234/seng350?branch=master&token=1d63c209181344f0eaf3f14a24391b3524eca7bc)](https://bettercodehub.com/)

Team Name: ```</teamName>``` \
App Name: Creatures & Caves
---

# Sprints
### Coverage Report for Milestone 3 can be found [here](/coverage)
###### Coverage HTML page is in [this directory](/coverage/lcov-report)
### Sprint1 for Milestone 3 can be found [here](/docs/README_sprint1.md)

##### Requirements
- Node.js v10.16.3
- npm v6.11.3

### Build Instructions

##### From the root directory, run the following commands in order:
This command installs required node modules
```
npm install
```

This transpiles all of the front-end and back-end TypeScript to JavaScript
```
npm run build-ts
```

This preprocesses all of the SCSS into CSS
```
npm run build-css
```

### Run Instructions
This command starts the app
```
npm run start
```

### Lint Command
To run ts-linter use the following command:
```
npm run lint
```

### Test Command
To run the Jest unit use the following command:
```
npm run test
```

### Database Instructions

#### Mongodb CLI

To run the Mongodb CLI run the following command and use the password below
```
mongo "mongodb+srv://cluster0-ljzjx.mongodb.net/Creatures&Caves"  --username admin
```
```
password: Passw0rd
```

For information about the CLI commands refer to [here](https://docs.mongodb.com/manual/reference/mongo-shell/)
