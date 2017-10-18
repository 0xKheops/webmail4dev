import React from 'react';

const RecipientsRow = ({ label, recipients }) => (
    recipients ? <div className="MailDetails-HeaderRow" >
        <label>{label}</label>
        <div dangerouslySetInnerHTML={{ __html: recipients.html }}></div>
    </div> : null
);

export default RecipientsRow;
