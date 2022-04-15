import moment from "moment"
export default{
    formValidation: {
        userName:(username)=>{
           return /^[a-zA-Z0-9_-]*$/.test(username)
        },
        fullName:(name)=>{
           return /^([a-zA-Z]+\s?)*$/.test(name)
        },
        email:(email)=>{
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        },
        password:(password)=>{
            return /^\S*$/.test(password)
        },
        matchPasswords:(p1,p2)=>{
            return p1===p2
        }
    }
}
export const viewDate = (dd) => moment(dd).startOf('hour').fromNow();
export const isEmpty = value => value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length===0) || (typeof value === 'string' && value.trim().length===0)