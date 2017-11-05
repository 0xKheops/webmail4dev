
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
function uint6ToB64(nUint6) {

    return nUint6 < 26 ?
        nUint6 + 65 :
        nUint6 < 52 ?
            nUint6 + 71 :
            nUint6 < 62 ?
                nUint6 - 4 :
                nUint6 === 62 ?
                    43 :
                    nUint6 === 63 ? 47 : 65;

}

// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
function base64EncArr(aBytes) {

    var nMod3 = 2, sB64Enc = "";

    for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
        nMod3 = nIdx % 3;
        if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) { sB64Enc += "\r\n"; }
        nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
        if (nMod3 === 2 || aBytes.length - nIdx === 1) {
            sB64Enc += String.fromCharCode(uint6ToB64(nUint24 >>> 18 & 63), uint6ToB64(nUint24 >>> 12 & 63), uint6ToB64(nUint24 >>> 6 & 63), uint6ToB64(nUint24 & 63));
            nUint24 = 0;
        }
    }

    return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==");

}

exports.encodeMailContentInHtml = (mail) => {

    const regContentId = /<img\b[^>]*src\s*=\s*"(cid:[^"]*)"[^>]*>/gi;

    // changes the html to base64 embed missing images
    mail.html = mail.html.replace(regContentId, function (match, cid) {

        const contentId = cid.substring(4); // remove the "cid:" prefix to get the real content id

        //find the attachment that matches the cid
        const attachment = mail.attachments.find(att => att.cid === contentId);
        if (attachment != null) {
            //encode attachment in base 64
            const base64 = base64EncArr(attachment.content);

            //replace by 
            return match.replace(cid, "data:" + attachment.contentType + ";base64," + base64);
        }

        return match;
    });

};