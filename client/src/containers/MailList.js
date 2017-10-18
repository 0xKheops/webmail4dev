import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from "../actions";

import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import SelectableList from "../components/SelectableList";

// import PropTypes from 'prop-types'

class MailList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            mails: Object.assign([], [...this.props.mails]),
            currentMailFilename: this.props.currentMailFilename,
        };

    }

    onMailClick(filename) {
        if (filename !== this.state.currentMailFilename)
            this.props.actions.displayMail(filename);
    }

    onDeleteAllClick() {
        this.props.actions.deleteAllMails();
    }

    render() {
        return <div className="MailList">
            <div className="MailList-Content">
                <SelectableList selectedFilename={this.props.currentMailFilename}>
                    <Subheader>Inbox</Subheader>
                    {this.props.mails.map(m => <ListItem key={m.filename}
                        value={m.filename}
                        primaryText={m.content.from.text}
                        secondaryText={m.content.subject}
                        onClick={() => this.onMailClick(m.filename)} />)}
                </SelectableList>
            </div>
            <Toolbar className="MailList-Toolbar">
                <ToolbarGroup firstChild={true}>
                    <RaisedButton label="Delete all" primary={true} onClick={this.onDeleteAllClick.bind(this)} />
                </ToolbarGroup>
            </Toolbar>
        </div>;
    }
}

// MailList.propTypes = {
//     mails: PropTypes.array.isRequired,
//     currentMailFilename: PropTypes.string,
// }

function mapStateToProps(state, ownProps) {

    // const stateMails = state.mails;
    // const filename = state.filename;

    return {
        mails: [...state.mails],
        state: state.currentMailFilename,
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MailList);
