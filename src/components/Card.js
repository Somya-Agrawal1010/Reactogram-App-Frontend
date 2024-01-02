import React from 'react'
import './Card.css'
import moreAction from '../images/more-action.PNG';
import { useSelector } from 'react-redux/es/hooks/useSelector';




const Card = (props) => {

  const user = useSelector(state => state.userReducer);
  return (

    <div>
      <div className='card shadow-sm'>
        <div className='card-body px-2'>
          <div className='row'>
            <div className='col-6 d-flex'>
              <img className='p-2 profile-pic' alt="profile-pic" src="https://plus.unsplash.com/premium_photo-1681412205172-8c06ca667689?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80 " />
              <div className=' mt-2'>
                <p className='fs-6 fw-bold'>{props.postData.author.fullName}</p>
                <p className='location'>{props.postData.location}</p>
              </div>
            </div>
            {props.postData.author._id === user.user._id ? <div className='col-6 '>
              <img onClick={() => props.deletePost(props.postData._id)} style={{ cursor: "pointer" }} className='float-end fs- p-2 mt-' alt="more action" src={moreAction} />
            </div> : ""}

            <div className='row'>
              <div className='col-12'>
                <img style={{ borderRadius: '10px' }} className='p-2 img-fluid ' alt={props.postData.description} src={props.postData.image} />
              </div>
            </div>
            <div className='row'>
              <div className='col-6 d-flex '>
                <i className=" fs-4 p-1 fa-regular fa-thumbs-up"></i>
                <i className=" fs-4 p-1 fa-regular fa-thumbs-down"></i>
                <i  className="fs-4  p-1 fa-regular fa-comment"></i>

              </div>
              <div className='col-6'>
              <span className=' pe-2 fs-6 fw-bold float-end'>likes</span>
              </div>

            </div>
           
           




            <div className='row'>
              <div className='col-12'>
                <p className='active'>2 Hours ago</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>


  )
}


export default Card;

