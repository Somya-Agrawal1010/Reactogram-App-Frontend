import { combineReducers } from "redux";
import { userReducer } from "./useReducer";

export const combineReducer = combineReducers({ userReducer: userReducer });