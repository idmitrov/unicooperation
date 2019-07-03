import { adsActionTypes } from './Ads.actions';

const adInstanceDefaults = {
    title: '',
    content: '',
    candidates: []
};

const adsDefautls = {
    instance: adInstanceDefaults,
    list: []
};

export default (state = adsDefautls, action = {}) => {
    switch (action.type) {
        case adsActionTypes.setAdInstanceApplicants: {
            return {
                ...state,
                instance: {
                    ...state.instance,
                    candidates: action.payload
                }
            }
        }
        case adsActionTypes.setAdInstance: {
            return {
                ...state,
                instance: {
                    ...state.instance,
                    ...action.payload
                }
            }
        }
        case adsActionTypes.resetAdInstance: {
            return {
                ...state,
                instance: adInstanceDefaults
            }
        }
        case adsActionTypes.setAdProp: {
            return {
                ...state,
                instance: {
                    ...state.instance,
                    [action.payload.key]: action.payload.value
                }
            }
        }
        case adsActionTypes.setAdsList:
        case adsActionTypes.updateAdsList: {
            return {
                ...state,
                list: action.payload
            }
        }
        default: return state;
    }
}
