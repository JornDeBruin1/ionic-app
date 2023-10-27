import { AppInitialState } from "../AppInitialState"
import { LoginState } from "./LoginState"
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions"
import { loginReducer } from "./login.reducers"

describe("login store", () => {

    it('recoverPassword', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, recoverPassword());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        })
    })

    it('recoverPasswordSucces', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, recoverPasswordSuccess());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        })
    })

    it('recoverPasswordFail', () => {
        const initialState: LoginState = AppInitialState.login;
        const error = { error: "error" };
        const newState = loginReducer(initialState, recoverPasswordFail({ error }));
        expect(newState).toEqual({
            ...initialState,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        })
    })
})