import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { RegisterState } from "./RegisterState";
import { register, registerFail, registerSuccess } from "./register.actions";

const initialState = AppInitialState.register;

const reducer = createReducer(initialState,
    on(register, state => {
        return{
            ...state,
            error: null,
            isRegisterd: false,
            isRegistering: true
        }
    }),
    on(registerSuccess, state=>{
        return{
            ...state,
            isRegisterd:true,
            isRegistering:false
        }
    }),
    on(registerFail, (state, action) =>{
        return{
            ...state,
            error: action.error,
            isRegisterd:false,
            isRegistering:false
        }
    })
);

export function registerReducer(state: RegisterState, action:any){
    return reducer(state, action)
}