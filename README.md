![build-status](https://travis-ci.org/concord-consortium/vid-meter.svg?branch=master)

# vid-meter

Demo: http://concord-consortium.github.io/vid-meter/

## Development

First, you need to make sure that webpack is installed and all the NPM packages required by this project are available:

```
npm install -g webpack
npm install
```
Then you can build the project files using:
```
webpack
```
or start webpack dev server:
```
npm install -g webpack-dev-server 
webpack-dev-server
```
and open http://localhost:8080/ or http://localhost:8080/webpack-dev-server/ (auto-reload after each code change).

## Test
There are two scripts defined in `package.json`: `test` and `test:watch`.  These commands can be run from the terminal using the syntax `npm run test` and `npm run test:watch` respectively. The former script run the mocha test suite one time. The latter watches `test/**/*.js?x` files for changes, and runs the given test suite when the file changes.

 These tests were setup using [this tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#unit-testing-support) as a guide.  They use [mocha](https://mochajs.org/), [chai](http://chaijs.com/api/bdd/), and [react test utils](https://facebook.github.io/react/docs/test-utils.html).

## Deployment

#### Github Pages:
You can build a simple github page deployment by following these steps:
1. prepare the destination directory: `rm -rf ./dist`
1. clone the gh-pages branch to dist: `git clone -b gh-pages git@github.com:concord-consortium/vid-meter.git dist`
1. build: `webpack`
1. add the files and commit: `cd dist; git add .; git commit -m "gh-pages build"`
1. push the changes to github: `git push`

#### Travis S3 Deployment:
Travis automatically builds and deploys branches and tags. A simple `git push` initiate a deployment of the current branch to amazon S3. Once completed the build we be available at `http://vid-meter.concord.org/branch/<branchname>`.  The production branch deploys to [http://vid-meter.concord.org/](http://vid-meter.concord.org/branch/master/)

#### Manual S3 Deployment
If you want to do a manual deployment, put your S3 credentials in `.env` and copy `s3_deploy.sh` to a local git-ignored script. Fill in missing ENV vars, and then run that script.


### Frameworks, conventions

This app is built using [React](https://facebook.github.io/react/)
It also uses lots of ES6 syntax, so it might be good to review it first. Semicolons are discussable, but I've decided to follow Redux examples style.

Some things that may be confusing when you start working with Redux (or at least they had been confusing for me):


### CSS styles

* Webpack parses URLs in CSS too, so it will either copy resources automatically to `/dist` or inline them in CSS file. That applies to images and fonts (take a look at webpack config).
* All the styles are included by related components in JS files. Please make sure that those styles are scoped to the top-level component class, so we don't pollute the whole page. It's not very important right now, but might become important if this page becomes part of the larger UI. And I believe it's a good practice anyway.


## License

[MIT](https://github.com/concord-consortium/grasp-seasons/blob/master/LICENSE)
