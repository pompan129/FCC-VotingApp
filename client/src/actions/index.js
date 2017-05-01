
//Actions
export const SET_AUTH = "SET_AUTH";


export const setAuth = (auth)=>{
    return {
      type:SET_AUTH,
      payload: auth
    }
}
