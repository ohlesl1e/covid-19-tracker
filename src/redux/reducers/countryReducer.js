const initialState = {
    countryCode: '',
    region: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'COUNTRY_SET_COUNTRY_CODE':
            return {
                ...state,
                countryCode: action.countryCode
            }
        case 'COUNTRY_SET_REGION':
            return {
                ...state,
                region: action.region
            }

        default:
            return state
    }
}
