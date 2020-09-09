# Project Incubator

This repo contains the source code for the Project Incubator client.

## Setting up a development environment

### Requirements

- You need [node (v12 LTS)](https://nodejs.org/en/) to run the app.
- We're using [prettier@2.0.5](https://prettier.io/) for code styling. To install prettier, run `npm install --global --save-exact prettier@2.0.5`.

**Important**: A `pre-commit` configured to run prettier is in the `hooks` folder. If this is a first-time setup, you must run the following command from the project's root directory.

```sh
# create a symbolic link
$ ln -sf ../../hooks/pre-commit .git/hooks/pre-commit
```

### Starting the app

```sh
# install/update dependencies
$ npm install

# start the app
$ npm start
```

This let's you run the app on localhost. It should reload the page on file changes automatically.

### Code formatting

```sh
# check files with prettier
$ npm run prettier
# or
$ prettier --no-editorconfig -c .

# fix styling
# note: this will write to your files, you should stage them before you run this
$ npm run prettier-fix
# or
$ prettier --no-editorconfig --write .
```
