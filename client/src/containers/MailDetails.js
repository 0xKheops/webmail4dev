import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from "../actions";
import * as moment from "moment";

import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import RecipientsRow from "../components/RecipientsRow";
import AttachmentChip from "../components/AttachmentChip";

class MailDetails extends React.Component {
    
    onDeleteClick() {

        this.props.actions.deleteMail(this.props.filename);

    }

    render() {

        const { mail } = this.props;

        if (!mail) {
            return null;
        }

        return <div className="MailDetails">
            <Toolbar>
                <ToolbarGroup />
                <ToolbarGroup lastChild={true}>
                    <FlatButton label="Delete" primary={true} onClick={this.onDeleteClick.bind(this)} />
                </ToolbarGroup>
            </Toolbar>
            <div className="MailDetails-Header">
                <RecipientsRow label="From :" recipients={mail.content.from} />
                <RecipientsRow label="To :" recipients={mail.content.to} />
                <RecipientsRow label="Cc :" recipients={mail.content.cc} />
                <RecipientsRow label="Bcc :" recipients={mail.content.bcc} />
                <div className="MailDetails-HeaderRow">
                    <label>Date :</label>
                    <div>{moment(mail.content.date).calendar()}</div>
                </div>
                <div className="MailDetails-HeaderRow">
                    <label>Subject :</label>
                    <div>{mail.content.subject}</div>
                </div>
                <div className="MailDetails-HeaderRow">
                    <div className="MailDetails-Attachments">{mail.content.attachments.map((att, idx) => <AttachmentChip key={idx} attachment={att} />)}</div>
                </div>
            </div>
            <Divider />
            <div className="MailDetails-Content">
                <div dangerouslySetInnerHTML={{ __html: mail.content.html }}></div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => ({
    filename: state.currentMailFilename,
    mail: (state.mails && state.currentMailFilename) ?
        state.mails.find(m => m.filename === state.currentMailFilename) :
        null,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MailDetails);
