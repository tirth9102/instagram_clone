import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Routes,Link,useNavigate} from 'react-router-dom'
import Home from './components/screens/Home'
import SignIn from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{ 
    const user = JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      navigate('/signin')
    }
  },[]) 
  return(
    <Routes>
      <Route>
        <Route exact path="/" element={<Home/>}/>
        <Route path = "/signIn" element={<SignIn/>}/>
        <Route path = "/signup" element={<Signup/>}/>
        <Route exact path = "/profile" element={<Profile/>}/>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/profile/:userid" element={<UserProfile/>}/>
        <Route path="/myfollowingpost" element={<SubscribedUserPosts/>}/>
      </Route>
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return ( 
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
