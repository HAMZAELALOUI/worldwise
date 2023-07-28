import { createContext, useContext, useReducer } from "react";


const AuthContext=createContext()
 
const initialState={
  user:null,
  isAuthentecated:false
}

const FAKE_USER = {
  name: "hamza",
  email: "hamza@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state,action){
  switch (action.type) {
    case 'login':
      return {
        ...state , user :action.payload, isAuthentecated :true
      }
    case 'logout':
      return {
        ...state , user :null, isAuthentecated :false
      }
  
    default:
      throw new Error('Unkown Action')
  }

}

function AuthProvider({children}){
  const [{user,isAuthentecated},dispatch]=useReducer(reducer ,initialState)
  function login(email ,password){
    if(email === FAKE_USER.email && password === FAKE_USER.password)
     dispatch({type:'login', user:FAKE_USER})
  }
  function logout(){
    dispatch({type : 'logout'})
  }
  return <AuthContext.Provider value={{
    isAuthentecated,
    user,
    login,
    logout

  }}>
    {children}
  </AuthContext.Provider>
}

function useAuth(){
  const context=useContext(AuthContext)
    if(context === undefined) throw new Error('AuthContext was used outside AuthProvider')
    return context
}
export {AuthProvider ,useAuth}