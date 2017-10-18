import React, { Component } from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { displayMail } from "../actions";
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { deleteAllMails } from "../actions";

const mapStateToProps = (state, ownProps) => (state);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({

    ...stateProps,

    ...ownProps,

    onMailClick: (filename) => {
        if (filename !== stateProps.currentMailFilename)
            dispatchProps.dispatch(displayMail(filename))
    },

    onDeleteAllClick: (filename) => {
        fetch("/api/mails", {
            method: 'DELETE',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON'
            },
            credentials: 'same-origin'
        }).then(() => dispatchProps.dispatch(deleteAllMails()));
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


const MailList = ({ mails, currentMailFilename, onMailClick, onDeleteAllClick }) => (
    <div className="MailList">
        <div className="MailList-Content">
            <SelectableList selectedFilename={currentMailFilename}>
                <Subheader>Inbox</Subheader>
                {mails.map(m => <ListItem key={m.filename}
                    value={m.filename}
                    primaryText={m.content.from.text}
                    secondaryText={m.content.subject}
                    onClick={() => onMailClick(m.filename)} />)}
            </SelectableList>
        </div>
        <Toolbar className="MailList-Toolbar">
            <ToolbarGroup firstChild={true}>
                <RaisedButton label="Delete all" primary={true} onClick={onDeleteAllClick} />
            </ToolbarGroup>
        </Toolbar>
    </div>
)

MailList.propTypes = {
    mails: PropTypes.arrayOf(PropTypes.shape({
        filename: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
    }).isRequired).isRequired,
    currentMailFilename: PropTypes.string,
}

export default connect(mapStateToProps, null, mergeProps)(MailList);
