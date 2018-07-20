import React from "react";
import PropTypes from "prop-types";

export default class MailContent extends React.Component {

    componentDidMount() {
        this.updateContent(this.props.html);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.html !== nextProps.html){
            this.updateContent(nextProps.html);
        }
    }

    handleIframeOnLoad(){
        // this handler is only necessary because of firefox which seems to set a default content with a delay.
        
        // overwrite the default content
        this.updateContent(this.props.html);
    }
    
    updateContent(html){
      

        const { iframe } = this;
        if (iframe && iframe.contentDocument.body.innerHTML !== html) {
            iframe.contentDocument.body.innerHTML = html;

            //add <base target="_blank" /> in head
            const base = iframe.contentDocument.createElement("base");
            base.setAttribute("target", "_blank");
            iframe.contentDocument.head.appendChild(base);
        }
    }

    render() {

        return <iframe id="mailcontent" className="mail-iframe"
            frameBorder="0"
            ref={(iframe) => this.iframe = iframe}
            title="Mail content"
            onLoad={this.handleIframeOnLoad.bind(this)}
        />

    }
}

MailContent.propTypes = {
    html: PropTypes.string,
};
