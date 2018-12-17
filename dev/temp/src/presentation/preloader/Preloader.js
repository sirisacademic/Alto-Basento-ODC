import React from 'react'
import {
  Loader
} from 'semantic-ui-react';

const Preloader = () => (
    <div style={{minHeight: '90vh'}}>
        <Loader active size="medium">Loading...</Loader>
    </div>
)

export default Preloader