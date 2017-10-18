
import React from 'react';
import { List, makeSelectable } from 'material-ui/List';

//import PropTypes from 'prop-types'

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends React.Component {
        // static propTypes = {
        //     children: PropTypes.node.isRequired,
        //     selectedFilename: PropTypes.string,
        // };

        render() {
            return (
                <ComposedComponent value={this.props.selectedFilename} >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

export default SelectableList;
