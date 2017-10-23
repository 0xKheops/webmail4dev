import * as types from '../actions/actionTypes';
import currentMailFilename from "./currentMailFilename";

describe("currentMailFilename reducer", () => {

    it('should return the initial state', () => {

        expect(currentMailFilename(undefined, {})).toEqual(null);

    });

    it('should change currentFilename mails', () => {

        const stateBefore = null;
        const action = { type: types.DISPLAY_MAILS_SUCCESS, mails: [{ filename: "toto" }, { filename: "tata" }] }
        const stateAfter = "toto";

        expect(currentMailFilename(stateBefore, action)).toEqual(stateAfter);

    });

    it('should display mail', () => {

        const stateBefore = "tata";
        const action = { type: types.DISPLAY_MAIL, filename:"test" }
        const stateAfter = "test";

        expect(currentMailFilename(stateBefore, action)).toEqual(stateAfter);

    });

});
