import React from 'react';
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider';
import * as moment from "moment";

const mapStateToProps = (state, ownProps) => ({
    filename: state.currentMailFilename,
    mail: state.mails.find(m => m.filename === state.currentMailFilename)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    // onMailClick: (filename) => {
    //     console.log("own props", ownProps);
    //     dispatch(displayMail(filename))
    // }
})

const MailDetails = ({ filename, mail }) => mail ? (
    <div className="MailDetails">
        <div className="MailDetails-Header">
            <div className="MailDetails-HeaderRow">
                <label>From :</label>
                <div dangerouslySetInnerHTML={{ __html: mail.content.from.html }}></div>
            </div>
            <div className="MailDetails-HeaderRow">
                <label>To :</label>
                <div dangerouslySetInnerHTML={{ __html: mail.content.to.html }}></div>
            </div>
            <div className="MailDetails-HeaderRow">
                <label>Date :</label>
                <div>{moment(mail.content.date).calendar()}</div>
            </div>
            <div className="MailDetails-HeaderRow">
                <label>Subject :</label>
                <div>{mail.content.subject}</div>
            </div>
            <div className="MailDetails-HeaderRow">
                <label>Attachments :</label>
                <div></div>
            </div>
        </div>
        <Divider />
        <div className="MailDetails-Content">
            <div dangerouslySetInnerHTML={{ __html: mail.content.html }}></div>
        </div>
    </div>
) : null;

export default connect(mapStateToProps, mapDispatchToProps)(MailDetails);
