import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

import { ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import RaisedButton from "material-ui/RaisedButton";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import SelectableList from "../components/SelectableList";

// import PropTypes from 'prop-types'

class MailList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      mails: Object.assign([], [...this.props.mails]),
      currentMailFilename: props.currentMailFilename
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
    return (
      <div className="MailList">
        <div className="MailList-Content">
          <SelectableList selectedFilename={this.props.currentMailFilename}>
            <Subheader>Inbox</Subheader>
            {this.props.mails.map(m => (
              <ListItem
                key={m._id}
                value={m._id}
                primaryText={
                  m.from.value.length === 1
                    ? m.from.value[0].name || m.from.value[0].address
                    : m.from.text
                }
                secondaryText={m.subject}
                onClick={() => this.onMailClick(m._id)}
              />
            ))}
          </SelectableList>
        </div>
        <div  className="MailList-Toolbar">
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

// MailList.propTypes = {
//     mails: PropTypes.array.isRequired,
//     currentMailFilename: PropTypes.string,
// }

const mapStateToProps = (state, ownProps) => ({
  mails: [...state.mails],
  currentMailFilename: state.currentMailFilename
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MailList);
