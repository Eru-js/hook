import * as actionTypes from './actionTypes';

export const setData = (data, sectionID) => {
    switch (sectionID) {
        case 1:
            return {
                type: actionTypes.SET_DATA_SUMMARY,
                data: data,
            };
        case 2:
            return {
                type: actionTypes.SET_DATA_PROFILE,
                data: data,
            };
        default:
            return {
                type: actionTypes.NO_RESPONSE
            };
    }
}

export const serviceFailure = () => {
    return {
        type: actionTypes.SERVICE_DOWN
    };
};

export const initData = (uid, sid) => {
    return dispatch => {
        fetch('https://cors-anywhere.herokuapp.com/https://project-populus-default-rtdb.firebaseio.com/user/' + uid + '/' + sid + '.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            dispatch(setData(data, sid))
        })
        .catch((error) => {
            dispatch(serviceFailure());
        });
    };
};

export const updateData = (uid, sid, data) => {
    return dispatch => {
        // $.ajax({
        //     url: 'https://localhost:44351/api/onboarding/save/'+ eid + "/" + sid,
        //     type: 'POST',
        //     data: JSON.stringify(data),
        //     contentType: "application/json",
        //     success: response => {
        //         dispatch(setData(response, sid));
        //         dispatch(initData(eid, 1));
        //     },
        //     error: error => {
        //         console.log(error)
        //         dispatch(serviceFailure());
        //     }
        // });
        fetch('https://cors-anywhere.herokuapp.com/https://project-populus-default-rtdb.firebaseio.com/user/' + uid + '/' + sid + '.json', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // dispatch(setData(data, sid))
        })
        .catch((error) => {
            dispatch(serviceFailure());
        });
    }
}