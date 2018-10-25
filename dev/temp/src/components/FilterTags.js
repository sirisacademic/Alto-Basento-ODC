import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class FilterTags extends Component {

    render() {
        return (
            <div className='FilterTags'>
                {
                    this.props.filters.map(
                        (d, index) => 
                            <div className='FilterTag' key={index}>
                                <button className='ui icon right labeled button' role='button'>
                                    {d.key}
                                    <i aria-hidden='true' className='right close icon' onClick={()=> this.props.onClickTag(d)}/>
                                </button>
                            </div>
                    )
                }
            </div>
        );
    }
}

export default FilterTags;