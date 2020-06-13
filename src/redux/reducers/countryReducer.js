const initialState = {
    countryCode: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'COUNTRY_SET_COUNTRY_CODE':
            return {
                ...state,
                countryCode: action.countryCode
            }

        default:
            return state
    }
}
