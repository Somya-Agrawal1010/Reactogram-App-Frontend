import React from 'react'
import './Navbar.css'
import logoImage from '../components/logo.PNG'
import {  NavLink,  } from 'react-router-dom'
import {  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.userReducer);
  

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    navigate("/login");
  } 

 
  return (
    <div>

      <nav className="navbar navbar bg-light shadow-sm ">
        <div className="container-fluid ms-5">
          <NavLink className=" navbar-brand ">

            <img alt="logo" className='logoImage' src={logoImage} style={{ height: '50px' }} ms-5 />
          </NavLink>
          <form className=" d-flex me-md-5" >
            <input className="searchbox me-2 text-muted" type="search" placeholder="Search" aria-label="Search" />
            <NavLink className=" searchIcon text-dark fs-4  " to="#"><i className="fa-solid fa-magnifying-glass"></i></NavLink>
              <NavLink className="nav-link text-dark mt-2 ms- 4 fs-4" to="/posts" href="#"><i className="fa-solid fa-house"></i></NavLink>
            {localStorage.getItem("token")  ? <NavLink className="nav-link text-dark  mt-2 ms-4 fs-4" to="#"><i className="fa-regular fa-heart"></i></NavLink> : ''}

              <div className="dropdown ">
             {localStorage.getItem("token") ? <> <NavLink className="btn" to="#" role="button" data-bs-toggle="dropdown"> 
                  <img className='p-2 navbar-profile-pic' alt="profile-pic" src="https://plus.unsplash.com/premium_photo-1681412205172-8c06ca667689?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" />

                </NavLink>

                <ul className="dropdown-menu">

                  <li>
                    <NavLink className="dropdown-item" to="/myprofile">My Profile</NavLink>

                  </li>
                  <li><a className="dropdown-item" href to ="#" onClick={() => logout()} >
                    Log Out
                  </a></li>

                </ul> </>:''}
              </div>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default Navbar


