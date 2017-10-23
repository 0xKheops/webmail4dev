
import React from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import FileIcon from "../components/FileIcon";

const AttachmentChip = ({ attachment, onClick }) => (
    <Chip className="MailDetails-Attachment" onClick={onClick}>
        <Avatar icon={<FontIcon><FileIcon style={{ marginLeft: "2px", marginTop: "1px" }} /></FontIcon>} />
        {attachment.filename}
    </Chip>);

export default AttachmentChip;
