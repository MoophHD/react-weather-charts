import {
    GET_WEATHER_REQUEST,
    GET_WEATHER_SUCCESS,
    TOGGLE_DEGREE
} from '../constants/page'

export function getWeather(area) {
    return (dispatch, getState) => {
        dispatch({
            type: GET_WEATHER_REQUEST
        })

        let archiveW = getState().archive[area];
        
        console.log(archiveW);

        if (archiveW) {
            dispatch({
                type: GET_WEATHER_SUCCESS,
                payload: archiveW
            })

            return;
        }

        let req = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${area}") and u=\'c\' `
        let xhr = new XMLHttpRequest();
      
        xhr.open("GET",`https://query.yahooapis.com/v1/public/yql?q=${req}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,true);
        xhr.send(); 
        
        xhr.onreadystatechange = function(){
          if(xhr.readyState == 4 && xhr.status == 200){ 
          
            let w = JSON.parse(xhr.responseText);
            
            dispatch({
                type: GET_WEATHER_SUCCESS,
                payload: w,
                key: area
            })
    
          }
        };
    }
}

export function toggleDegree() {
    return {
        type: TOGGLE_DEGREE
    }
}