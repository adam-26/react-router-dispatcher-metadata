// @flow
import { withActions } from 'react-router-dispatcher';
import metadataAction from './';

export default function withMetadata({ mapParamsToProps, ...metadataOptions }) {
    return withActions(mapParamsToProps, metadataAction(metadataOptions));
}
