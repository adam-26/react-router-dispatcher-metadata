// @flow
import { Metadata } from 'react-html-metadata';
import withReactRouterMetadata from 'react-router-metadata';

export const METADATA = 'metadata';

export default function metadataAction(options?: {
        mapParamsToProps?: (params: Object, routerCtx: Object) => Object,
        staticMethodName?: string,
        componentStaticMethodName?: string,
        metadataPropName?: string
    }) {
    const {
        mapParamsToProps,
        ...metadataOpts
    } = Object.assign({ mapParamsToProps: params => params }, options);

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
            ...mapParamsToProps(params, routerCtx),
            metadata: params.metadata
        }),

        hoc: (Component) => withReactRouterMetadata(metadataOpts)(Component)
    };
}
