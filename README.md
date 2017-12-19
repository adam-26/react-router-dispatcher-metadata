# react-router-dispatcher-metadata

[![Greenkeeper badge](https://badges.greenkeeper.io/adam-26/react-router-dispatcher-metadata.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/react-router-dispatcher-metadata.svg)](https://www.npmjs.com/package/react-router-dispatcher-metadata)
[![npm](https://img.shields.io/npm/dm/react-router-dispatcher-metadata.svg)](https://www.npmjs.com/package/react-router-dispatcher-metadata)
[![CircleCI branch](https://img.shields.io/circleci/project/github/adam-26/react-router-dispatcher-metadata/master.svg)](https://circleci.com/gh/adam-26/react-router-dispatcher-metadata/tree/master)
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/adam-26/react-router-dispatcher-metadata.svg)](https://codeclimate.com/github/adam-26/react-router-dispatcher-metadata)
[![Code Climate](https://img.shields.io/codeclimate/github/adam-26/react-router-dispatcher-metadata.svg)](https://codeclimate.com/github/adam-26/react-router-dispatcher-metadata)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A [react-router-dispatcher](https://github.com/adam-26/react-router-dispatcher) **action** for defining HTML metadata.

Read the [react-router-dispatcher](https://github.com/adam-26/react-router-dispatcher) documentation if you haven't already done so.

##### This package supports:
  * server-side rendering using **stream**s
  * composing metadata from nested components (similar to [react-helmet](https://github.com/nfl/react-helmet))

There is an [working example here](https://github.com/adam-26/react-router-dispatcher-metadata/tree/master/examples/ssr)

Internally, [react-html-metadata](https://github.com/adam-26/react-html-metadata) is used to support the use of metadata with the react SSR stream interface, for more information
about how to define metadata you should view that packages [readme file](https://github.com/adam-26/react-html-metadata).

### Install

##### NPM

```js
npm install --save react-router-dispatcher-metadata
```

##### Yarn

```js
yarn add react-router-dispatcher-metadata
```

### Usage

```js
import metadataAction, { METADATA } from 'react-router-dispatcher-metadata';

// METADATA is the action name, used to configure react-router-dispatcher
```

### Example

##### Using the metadata action

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withActions } from 'react-router-dispatcher';
import metadataAction from 'react-router-dispatcher-metadata';

class AppRoot extends Component {

    static propTypes = {
        route: PropTypes.object.isRequired,
        assets: PropTypes.object.isRequired
    };

    // define metadata for this component
    static getMetadata(match, { assets }) {
        return {
            htmlAttributes: {lang: 'en', amp: undefined},
            bodyAttributes: {className: 'root'},
            titleTemplate: "MySite.com - %s",
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [
                { rel: 'shortcut icon', href: 'favicon.ico' },
                { rel: 'stylesheet', href: assets['main.css'] }
            ]
        };
    }

    render() {
        const { route: { routes } } = this.props;
        return renderRoutes(routes || null);
    }
}

// Maps react-router-dispatcher action parameters to component prop values
// - this is used for SSR and client metadata-hydration to enable correct props to be passed to 'getMetadata()'
// - the map function MUST map params to the SAME prop values the component will receive during a normal render
const mapParamsToProps = ({ assets }) => ({ assets });

export default withActions(metadataAction(mapParamsToProps))(Root);
```

##### Configuring the metadata action using [react-router-dispatcher](https://github.com/adam-26/react-router-dispatcher)

```js
import { createRouteDispatchers } from 'react-router-dispatcher';
import { METADATA } from 'react-router-dispatcher-metadata';
import routes from './routes';

const {
    UniversalRouteDispatcher,
    ClientRouteDispatcher,
    dispatchClientActions,
    dispatchServerActions
} = createRouteDispatchers(routes, [[METADATA]]);

```

### API

`metadataAction(paramsToProps)`

#### Parameters

**paramsToProps**: `(params: Object, routerCtx: Object) => Object`

  * An optional function that maps action parameters to component props

### Contribute
For questions or issues, please [open an issue](https://github.com/adam-26/react-router-dispatcher-metadata/issues), and you're welcome to submit a PR for bug fixes and feature requests.

Before submitting a PR, ensure you run `npm test` to verify that your coe adheres to the configured lint rules and passes all tests. Be sure to include unit tests for any code changes or additions.

### License
MIT