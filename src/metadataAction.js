// @flow
import { Metadata } from 'react-html-metadata';
import withReactRouterMetadata from 'react-router-metadata';

export const METADATA = 'metadata';

export default function metadataAction(
    paramsToProps?: (params: Object, routerCtx: Object) => Object = () => {},
    metadataOpts?: {
        staticMethodName?: string,
        componentStaticMethodName?: string,
        metadataPropName?: string
    }) {
    return {
        name: METADATA,

        staticMethodName: 'preloadMetadata',

        initServerAction: ({ metadata }) => ({
            metadata: metadata || Metadata.createNew()
        }),

        initClientAction: ({ metadata }) => ({
            metadata: metadata || Metadata.createForHydration()
        }),

        mapParamsToProps: (params, routerCtx) => ({
            ...paramsToProps(params, routerCtx),
            metadata: params.metadata
        }),

        hoc: (Component) => withReactRouterMetadata(params => params, metadataOpts)(Component)
    };
}
