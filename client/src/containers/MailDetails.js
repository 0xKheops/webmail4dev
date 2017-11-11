import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import * as moment from "moment";

import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";

import RecipientsRow from "../components/RecipientsRow";
import Loader from "../components/Loader";
import AttachmentChip from "../components/AttachmentChip";

class MailDetails extends React.Component {
  onDeleteClick() {
    this.props.actions.deleteMail(this.props.mailId);
  }

  onAttachmentClick(attachment) {
    this.props.actions.getAttachment(this.props.mailId, attachment.filename);
  }

  //   componentDidMount() {
  //     if (this.props.mail && !this.mail.loaded) {
  //       //console.log("mounting", )
  //       this.props.actions.fetchMail(this.props.mailId);
  //     }
  //   }

  componentDidUpdate() {
    const { mailId, mail, actions } = this.props;

    if (mailId && mail && !mail.loaded && !mail.loading) {
      actions.fetchMail(mailId);
    } else {
      try {
        const iframe = this.refs.iframe;
        if (iframe) {
          const document = iframe.contentDocument;
          document.body.innerHTML = mail.html;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  render() {
    const { mail, loading } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (!mail || !mail.loaded) {
      return null;
    }

    try {
      return (
        <div className="MailDetails">
          <Toolbar>
            <ToolbarGroup />
            <ToolbarGroup lastChild={true}>
              <FlatButton
                label="Delete"
                primary={true}
                onClick={this.onDeleteClick.bind(this)}
              />
            </ToolbarGroup>
          </Toolbar>
          <div className="MailDetails-Header">
            <RecipientsRow label="From :" recipients={mail.from} />
            <RecipientsRow label="To :" recipients={mail.to} />
            <RecipientsRow label="Cc :" recipients={mail.cc} />
            <RecipientsRow label="Bcc :" recipients={mail.bcc} />
            <div className="MailDetails-HeaderRow">
              <label>Date :</label>
              <div>{moment(mail.date).calendar()}</div>
            </div>
            <div className="MailDetails-HeaderRow">
              <label>Subject :</label>
              <div>{mail.subject}</div>
            </div>
            <div className="MailDetails-HeaderRow">
              <div className="MailDetails-Attachments">
                {mail.attachments
                  .filter(att => !att.related)
                  .map((att, idx) => (
                    <AttachmentChip
                      key={idx}
                      attachment={att}
                      onClick={() => this.onAttachmentClick(att)}
                    />
                  ))}
              </div>
            </div>
          </div>
          <Divider />
          <div className="MailDetails-Content">
            <iframe
              className="mail-iframe"
              frameBorder="0"
              ref="iframe"
              title={mail.subject}
            />
          </div>
        </div>
      );
    } catch (err) {
      console.error(err);
      return <div>error</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  mailId: state.ui.mailId,
  mail:
    state.mails && state.ui.mailId
      ? state.mails.find(m => m._id === state.ui.mailId)
      : null,
  loading:
    state.mails &&
    state.ui.mailId &&
    state.mails.find(m => m._id === state.ui.mailId && m.loading) != null
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MailDetails);
