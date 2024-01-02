import React from 'react'
import Login  from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import PostOverview from './Pages/PostOverview';
import Profile from './Pages/Profile';
import './App.css'



function App () {

  
  return (
    <div className='app-bg'>   
    <Router>
          <NavBar/>
      <Routes>
        <Route exact path ="/" element = {<Login/>}></Route>
        <Route exact path ="/login" element ={<Login/>}></Route>
        <Route exact path = "/signup" element ={<Signup/>}></Route>
        <Route exact path = "/posts" element ={<PostOverview/>}></Route>
        <Route exact path = "/myprofile" element = {< Profile/>}></Route>
      </Routes>
    </Router>
    </div>
    
    
  )
}

export default App;

