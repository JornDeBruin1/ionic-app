import { createAction } from "@ngrx/store";
import { LoadingState } from "./LoadingState";
import { hide, show } from "./loading.actions";
import { loadingReducer } from "./loading.reducers"

describe('loading store', () => {

    it('show', () => {
        const initialState: LoadingState = { show: false };
        const newState = loadingReducer(initialState, show());

        expect(newState).toEqual({ show: true })
    })

    it('hide', () => {
        const initialState: LoadingState = { show: true };
        const newState = loadingReducer(initialState, hide());

        expect(newState).toEqual({ show: false })
    })

    it('should keep state if action is unkown', () => {
        const initialState: LoadingState = { show: true };
        const action = createAction("UNKOWN")
        const newState = loadingReducer(initialState, action);

        expect(newState).toEqual({ show: true })
    })
})