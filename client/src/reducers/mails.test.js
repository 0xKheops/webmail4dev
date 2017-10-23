import * as types from '../actions/actionTypes';
import mails from "./mails";

describe("mails reducer", () => {

    it('should return the initial state', () => {

        expect(mails(undefined, {})).toEqual([]);
        
    });

    it('should receive mails', () => {

        const mailsBefore = [];
        const action = { type: types.DISPLAY_MAILS_SUCCESS, mails: [{ filename: "toto" }, { filename: "tata" }] }
        const mailsAfter = [{ filename: "toto" }, { filename: "tata" }];

        expect(mails(mailsBefore, action)).toEqual(mailsAfter);

    });

    it('should delete mail', () => {

        const mailsBefore = [{ filename: "toto" }, { filename: "tata" }];
        const action = { type: types.DELETE_MAIL_SUCCESS, filename: "toto" }
        const mailsAfter = [{ filename: "tata" }];

        expect(mails(mailsBefore, action)).toEqual(mailsAfter);

    });

});
