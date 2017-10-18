
import React from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import FileIcon from "../components/FileIcon";

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

export default AttachmentChip;