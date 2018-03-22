[![Waffle.io - Columns and their card count](https://badge.waffle.io/shawnlauzon/joatu.png?columns=all)](https://waffle.io/shawnlauzon/joatu?utm_source=badge)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Join the chat at https://gitter.im/buildjoatu/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/buildjoatu/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# JoatU: The Jack of all trades universe

## Introduction

JoatU is a platform for incentivizing community action and getting to know your neighbors. There are two halves to this: projects and trades.

For example, the members of a community may want to plant a community garden. Someone creates a project and requests volunteers. At a certain place and time, the people come together and do whatever action is needed. All participants are then rewarded in CAPS: Community Action Points which are automatically generated from project work. Initially 1 hour of work = 15 CAPS.

What can you do with CAPS? This is where the trades come in: people can post requests for things they need and offers for things they have. For example, I might be able to shovel a sidewalk and so I offer to do this for 5 CAPS (this amount does not need to match the same 1:15 ratio for projects). Or I might want help with a problem on my computer, so I offer 20 CAPS to anyone who can resolve the problem.

The development build [is live](http://tiny.cc/joatudev).

## The code

### Environment variables

Environment variables must be set to run and deploy JoatU. We typically use a `.env` file for this which must be placed in the root JoatU directory.

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_MAPBOX_API_KEY=
```

Talk to us on [Gitter](https://gitter.im/buildjoatu/Lobby) and we can send you the development keys and IDs.

### Starting the project

First download and install all dependencies using `yarn install`. Then start the app with `yarn start`.

The following scripts are provided by [Create React App]((https://github.com/facebook/create-react-app/):

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br>

#### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### Dependencies

JoatU is built on React and Redux, connecting to [Firebase](https://firebase.google.com/) using [Cloud Firestore](https://firebase.google.com/docs/firestore/). We use (Prettier)[https://github.com/prettier/prettier] to ensure a consistent coding style.

Other important libraries:

* [Material-UI](https://material-ui-next.com/) React widgets using Material Design
* [React Router](https://reacttraining.com/react-router/) React navigation
* [Ramda](http://ramdajs.com/) We love functional programming!
* [redux-orm](https://github.com/tommikaikkonen/redux-orm) Handles the relations between objects in Redux
* [Formik](https://github.com/jaredpalmer/formik) Simplify forms with React
* [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) Display and manipulate maps
* [Create React App](https://github.com/facebook/create-react-app/) JoatU was created with this, and since we have not ejected, still is useful for understanding configuration
* [Yarn](https://yarnpkg.com/en/) We use Yarn instead of NPM for package management

## Contributors

Joatu is completely open source we love contributions! Look at the Issues list and find something which looks interesting. If you want to add something new, please open an Issue first. We also use [Waffle](https://waffle.io/shawnlauzon/joatu) to manage the project.

Then submit a pull request with your code and someone will look at it quickly.

To talk about the project, join us on [Gitter](https://gitter.im/buildjoatu/Lobby).

## License

JoatU is released under the [MIT license](./LICENSE).
