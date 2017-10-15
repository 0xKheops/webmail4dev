import React, { Component } from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { displayMail } from "../actions";
import Subheader from 'material-ui/Subheader';

const mapStateToProps = (state, ownProps) => (state);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({

    ...stateProps,

    ...ownProps,

    onMailClick: (filename) => {
        if (filename !== stateProps.currentMailFilename)
            dispatchProps.dispatch(displayMail(filename))
    }

});

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            selectedFilename: PropTypes.string,
        };

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


const MailList = ({ mails, currentMailFilename, onMailClick }) => (
    <SelectableList selectedFilename={currentMailFilename}>
        <Subheader>Inbox</Subheader>
        {mails.map(m => <ListItem key={m.filename} value={m.filename} primaryText={m.content.from.text} secondaryText={m.content.subject} onClick={() => onMailClick(m.filename)} />)}
    </SelectableList>
)

MailList.propTypes = {
    mails: PropTypes.arrayOf(PropTypes.shape({
        filename: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
    }).isRequired).isRequired,
    currentMailFilename: PropTypes.string,
}

export default connect(mapStateToProps, null, mergeProps)(MailList);
