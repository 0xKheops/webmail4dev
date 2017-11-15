import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

import { ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import RaisedButton from "material-ui/RaisedButton";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import SelectableList from "../components/SelectableList";

import PropTypes from 'prop-types'

class MailList extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    try {
      // update if current mail changes
      if (this.props.mailId !== nextProps.mailId) return true;

      // update if new mails are received
      if (this.props.mails.length !== nextProps.mails.length) return true;

      return false;
    } catch (err) {
      console.error(err);
      return true;
    }
  }

  onMailClick(id) {
    if (id !== this.props.mailId) {
      // display
      this.props.actions.displayMail(id);
    }
  }

  onDeleteAllClick() {
    this.props.actions.deleteAllMails();
  }

  render() {
    return (
      <div className="MailList">
        <div className="MailList-Content">
          <SelectableList selectedMailId={this.props.mailId}>
            <Subheader>Inbox</Subheader>
            {this.props.mails.map(m => (
              <ListItem
                key={m._id}
                value={m._id}
                style={{ fontWeight: m.read ? "normal" : "bold" }}
                primaryText={
                  m.from.value && m.from.value.length === 1
                    ? m.from.value[0].name || m.from.value[0].address
                    : m.from.text
                }
                secondaryText={m.subject}
                onClick={() => this.onMailClick(m._id)}
              />
            ))}
          </SelectableList>
        </div>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <RaisedButton
                label="Delete all"
                primary={true}
                onClick={this.onDeleteAllClick.bind(this)}
              />
            </ToolbarGroup>
          </Toolbar>
        </div>
      </div>
    );
  }
}

MailList.propTypes = {
    mails: PropTypes.array.isRequired,
    mailId: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
  mails: state.mails,
  mailId: state.ui.mailId ? state.ui.mailId : null
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MailList);
