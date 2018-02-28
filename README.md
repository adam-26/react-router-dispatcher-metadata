# react-router-dispatcher-metadata

[![Greenkeeper badge](https://badges.greenkeeper.io/adam-26/react-router-dispatcher-metadata.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/react-router-dispatcher-metadata.svg)](https://www.npmjs.com/package/react-router-dispatcher-metadata)
[![npm](https://img.shields.io/npm/dm/react-router-dispatcher-metadata.svg)](https://www.npmjs.com/package/react-router-dispatcher-metadata)
[![CircleCI branch](https://img.shields.io/circleci/project/github/adam-26/react-router-dispatcher-metadata/master.svg)](https://circleci.com/gh/adam-26/react-router-dispatcher-metadata/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/60ba2c7c8b6a2a73d599/maintainability)](https://codeclimate.com/github/adam-26/react-router-dispatcher-metadata/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/60ba2c7c8b6a2a73d599/test_coverage)](https://codeclimate.com/github/adam-26/react-router-dispatcher-metadata/test_coverage)
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
import metadataAction, { withMetadata, METADATA } from 'react-router-dispatcher-metadata';

// METADATA is the action name, used to configure react-router-dispatcher
```

### Example

##### Using the metadata action

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withMetadata } from 'react-router-dispatcher-metadata';

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

export default withMetadata({ mapParamsToProps })(AppRoot);
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

`metadataAction(options)`

#### Options

**mapParamsToProps**: `(params: Object, routerCtx: Object) => Object`

  * An optional function that maps action parameters to component props

### Contribute
For questions or issues, please [open an issue](https://github.com/adam-26/react-router-dispatcher-metadata/issues), and you're welcome to submit a PR for bug fixes and feature requests.

Before submitting a PR, ensure you run `npm test` to verify that your coe adheres to the configured lint rules and passes all tests. Be sure to include unit tests for any code changes or additions.

### License
MIT