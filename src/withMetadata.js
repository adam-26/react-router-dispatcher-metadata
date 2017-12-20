// @flow
import { withActions } from 'react-router-dispatcher';
import metadataAction from './';

export default function withMetadata(options) {
    return withActions(metadataAction(options));
}
