import React from 'react';
import { withMetadata } from 'react-router-dispatcher-metadata';

const About = (/*props*/) => {
    return (
        <div>
          <h1>About what?</h1>
        </div>
    );
};

About.getMetadata = (/*match, props*/) => {
    return {
        title: 'About Page'
    };
};

export default withMetadata({ mapParamsToProps: params => params })(About);
