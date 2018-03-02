// @flow
import { Metadata } from 'react-html-metadata';
import withReactRouterMetadata from 'react-router-metadata';

export const METADATA = 'metadata';

export default function metadataAction(metadataOptions?: {
        mapParamsToProps?: (params: Object, routerCtx: Object) => Object,
        staticMethodName?: string,
        componentStaticMethodName?: string,
        metadataPropName?: string
    } = {}) {

    return {
        name: METADATA,

        staticMethodName: 'preloadMetadata',

        initServerAction: ({ metadata }) => ({
            metadata: metadata || Metadata.createForServerStreamRender()
        }),

        initClientAction: ({ metadata }) => ({
            metadata: metadata || Metadata.createForHydration()
        }),

        filterParamsToProps: ({ metadata }) => {
            return { metadata };
        },

        hoc: (Component) => withReactRouterMetadata(metadataOptions)(Component)
    };
}
