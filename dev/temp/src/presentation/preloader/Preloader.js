import React from 'react'
import {
  Loader
} from 'semantic-ui-react';
import { 
    withLocalize,
    Translate 
} from 'react-localize-redux';

const Preloader = () => (
    <div style={{minHeight: '90vh'}}>
        <Loader active size="medium">
            <Translate id='general.loading'/>
        </Loader>
    </div>
)

export default withLocalize(Preloader)