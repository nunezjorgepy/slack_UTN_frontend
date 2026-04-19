import { passwordValidation } from "./shared/password.validation"


export const changePasswordValidations = (password, confirmPassword) => {
    return passwordValidation(password, confirmPassword)
}