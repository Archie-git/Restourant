let store=require('store');
const USER_KEY='user_key';
export default{
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },
    removeUser(USER_KEY){
        // localStorage.removeItem(USER_KEY)R_KEY
        store.remove(USER_KEY)
    }
}