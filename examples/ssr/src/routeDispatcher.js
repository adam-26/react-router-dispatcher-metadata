// @flow
import { createRouteDispatchers } from 'react-router-dispatcher';
import { METADATA } from 'react-router-dispatcher-metadata';
import routes from './routes';
import LoadingIndicator from './components/LoadingIndicator';

const loadDataActionName = 'loadData';

// Define the 'actions' to be dispatched before rendering (for this app)
const dispatcherOptions = {
    loadingIndicator: LoadingIndicator
};

/*
Use the createRouteDispatcher factory, it returns a component and method for server-side rendering

Using the factory is an easy way to configure the dispatcher for both client and server renders
ensuring consistent configuration in both environments.
 */
const {
    UniversalRouteDispatcher,
    ClientRouteDispatcher,
    dispatchClientActions,
    dispatchServerActions
} = createRouteDispatchers(routes, [ /* [loadDataActionName],*/ [METADATA]], dispatcherOptions);

export {
    ClientRouteDispatcher,
    UniversalRouteDispatcher,
    dispatchClientActions,
    dispatchServerActions,
    loadDataActionName
};
