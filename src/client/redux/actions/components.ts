import componentTypes from '../types/components'

export const loginSignupDialogBoxAction = (e) => {
    return {
            type: componentTypes.loginSignUpDialogBox,
            payload: e
    }
}