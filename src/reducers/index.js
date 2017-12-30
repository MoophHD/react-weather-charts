let initialState = {
    w: {},
    degree: 'c',
    fetching: false,
    archive: {}
};

import {
    GET_WEATHER_REQUEST,
    GET_WEATHER_SUCCESS,
    TOGGLE_DEGREE
} from '../constants/page'


export default function index(state=initialState, action) {
    switch (action.type) {
        case (GET_WEATHER_REQUEST): {
            return { ...state, fetching: true }
        }
        case (GET_WEATHER_SUCCESS): {
            let key = action.key;

            let respond = { ...state, 
                fetching: false, 
                w: action.payload
            };

            if (key) respond = respond = {...respond, archive: {...state.archive, [key]: action.payload}};

            return respond;
        }
        case (TOGGLE_DEGREE): {
            return { ...state, degree: state.degree == 'c' ? 'f' : 'c' }
        }
        default:
            return state
    }

}