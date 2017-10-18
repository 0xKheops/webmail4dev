import React from 'react';
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider';
import * as moment from "moment";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { deleteMail } from "../actions";
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import FileIcon from "../components/FileIcon";

const mapStateToProps = (state, ownProps) => ({
    filename: state.currentMailFilename,
    mail: state.mails.find(m => m.filename === state.currentMailFilename)
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({

    ...stateProps,

    ...ownProps,

    onDeleteClick: () => {

        fetch("/api/mails/" + stateProps.filename, {
            method: 'DELETE',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON'
            },
            credentials: 'same-origin'
        }).then(() => dispatchProps.dispatch(deleteMail(stateProps.filename)));
    }

});

const RecipientsRow = ({ label, recipients }) => (
    recipients ? <div className="MailDetails-HeaderRow" >
        <label>{label}</label>
        <div dangerouslySetInnerHTML={{ __html: recipients.html }}></div>
    </div> : null
);

const AttachmentChip = ({ attachment }) => (
    <Chip className="MailDetails-Attachment" onClick={() => {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var blob = new Blob([new Uint8Array(attachment.content.data)], { type: attachment.contentType }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = attachment.filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }}>
        <Avatar icon={<FontIcon><FileIcon style={{ marginLeft: "2px", marginTop: "1px" }} /></FontIcon>} />
        {attachment.filename}
    </Chip>);

const MailDetails = ({ filename, mail, onDeleteClick }) => mail ? (
    <div className="MailDetails">
        <Toolbar>
            <ToolbarGroup />
            <ToolbarGroup lastChild={true}>
                <FlatButton label="Delete" primary={true} onClick={onDeleteClick} />
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


    </div>
) : null;

export default connect(mapStateToProps, null, mergeProps)(MailDetails);
