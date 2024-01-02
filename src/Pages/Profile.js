
import React, { useState, useEffect } from 'react'
import './profile.css'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Swal from 'sweetalert2';



const Profile = () => {

    const user = useSelector(state => state.userReducer);

    const navigate = useNavigate();
    const [image, setImage] = useState({ preview: '', data: '' })
    const [myallposts, setMyallposts] = useState([]);
    const [postdetail , setPostDetail] = useState()
    const [show,setShow] =  useState('')
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    const handleShow = () => setShow(true);

    const [showPost, setShowPost] = useState(false);
    const handlePostClose = () => setShowPost(false);
    const handlePostShow = () => setShowPost(true);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const deletePost = async (postId) => {
        debugger;
        const response = await axios.delete('${API_BASE_URL}/deletepost/${postId}')

        if (response.status === 200) {
            getMyPosts();
            setShow(false);
        }
    }
    const handleFileSelect = (event) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0]
        }
        setImage(img);
    }

    const handleImgUpload = async () => {
        let formData= new FormData();
        formData.append('file', image.data);

        const response = axios.post(`${API_BASE_URL}/uploadFile`, formData)
        return response;
    }

    const getMyPosts = async () => {
        const response = await axios.get(`${API_BASE_URL}/allposts`, CONFIG_OBJ);

        if (response.status === 200) {
            setMyallposts(response.data.posts);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all your posts'
            })
        }
    }




    const showDetail = (post) => {
        setPostDetail(post);
    }
    const addPost = async () => {

        if (image.preview === '') {
            Swal.fire({
                icon: 'error',
                title: 'Post image is mandatory!'
            })
        } else if (caption === '') {
            Swal.fire({
                icon: 'error',
                title: 'Post caption is mandatory!'
            })
        } else if (location === '') {
            Swal.fire({
                icon: 'error',
                title: 'Location is mandatory!'
            })
        } else {
            setLoading(true);
            const imgRes = await handleImgUpload();
            const request = { description: caption, location: location, image: `${API_BASE_URL}/files/${imgRes.data.fileName}` }
            // write api call to create post
            const postResponse = await axios.post(`${API_BASE_URL}/createpost`, request, CONFIG_OBJ)
            setLoading(false);
            if (postResponse.status === 201) {
                navigate("/posts")
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred while creating post'
                })
            }
        }
    }


    useEffect(() => {
        getMyPosts();
    },);

    return (
        <div>
            <div className='container shadow-sm mt-4 p-4 '>
                <div className='row mt-6'>
                    <div className='col-md-6 d-flex flex-column'>
                        <img className=' profile-pic p-2 img-fluid ' alt="post pic" src="https://images.unsplash.com/photo-1690147022157-5fdfaa28cd6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
                        <p className='ms-2 fs-5 fw-bold'>{user.user.email}</p>
                        <p className='ms-2 '>{user.user.fullName}</p>
                        <p className='ms-2 '>UI/UX Designer | Follow @{user.user.fullName}</p>
                        <p className='ms-2 '>follow me on social media</p>
                    </div>
                    <div className='col-md-6 d-flex flex-column justify-content-between mt-4'>
                        <div className='d-flex justify-content-equal'>
                            <div className='count-section  pe-2 pe-md-5 fw-bold'>
                                <h4>{myallposts.length}</h4>
                                <p className='text-center fw-5'>Posts</p>
                            </div>
                            <div className='count-section px-4 ps-md-5 fw-bold'>
                                <h4>50</h4>
                                <p className='text-center fw-5'>Followers</p>
                            </div>
                            <div className=' count-section ps-md-5 ps-2 fw-bold'>
                                <h4>100</h4>
                                <p className='text-align fw-5'>Following</p>
                            </div>
                        </div>
                        <div className='mx-auto mt-auto mt-md-0 mt-4 '>
                            <button className='custom-btn custom-btn-white me-md-2 float-end'>
                                <span className='fs-6'>Edit Profile</span>
                            </button>
                            <button className='custom-btn custom-btn-white '>
                                <span className='fs-6' onClick={handlePostShow}>Upload Profile</span>
                            </button>
                        </div>

                    </div>


                </div>
                <div className='row my-4'>
                    <div className='col-12'>
                        <hr />
                    </div>
                </div>
                <div className='row mb-4'>
                    {myallposts.map((post) => {
                        return (
                            <div className='col-md-4 col-sm-12' key={post._id}>
                                <div className="card" onClick={handleShow}>
                                    <img onClick={() => showDetail(post)} src={post.image} className="card-img-top" alt={post.description} />
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <Modal show={showPost} onHide={handlePostClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <span>UploadPost</span>

                    </Modal.Header>

                    <Modal.Body>
                        <div className='row'>
                            <div className='col-md-6 col-sm-12'>
                                <div className='upload-box'>
                                    <div className=' mt- 4 dropContainer'>
                                        <input name="file" type="file" id="drop_zone" className='FileUpload' accept=".jpg,.png,.gif" onChange={handleFileSelect} />

                                        <div className='dropZoneOverlay'> {image.preview && <img src={image.preview} width={150} height={150} alt='...' />}
                                            <span class=" fs - 1 material-symbols-outlined">
                                                cloud_upload
                                            </span> <br /> Upload Photo Form Computer</div>
                                    </div>

                                </div>

                            </div>
                            <div className='col-md-6 col-sm-12 d-flex flex-column justify-content-between'>
                                <div className='row'>

                                    <div className='col-sm-12'>
                                        <div className="form-floating mb-3">
                                            <textarea onChange={(ev) => setCaption(ev.target.value)} className="form-control " id="floatingInput" placeholder="Add caption" />
                                            <label for="floatingTextarea">Add Caption</label>
                                        </div>
                                        <div className='col-sm-12'>
                                            <div className="form-floating mb-3">
                                                <input type="text" onChange={(ev) => setLocation(ev.target.value)} className="form-control " id="floatingInput" placeholder="Add Location" />
                                                <label for="floatingInput "><span class="material-symbols-outlined p-2 ">
                                                    location_on
                                                </span>Add Location</label>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <div className='row d'>
                                    <div className='col-sm-12'>
                                        {loading ? <div className='col-md-12 mt-3 text-center'>
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div> : ''}
                                        <button onClick={() => addPost()} className="custom-btn custom-btn-pink float-end">
                                            <span className='fs-6 fw-600'>Post</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Modal.Body>


                </Modal>


            </div>



        </div>
    )
}

export default Profile;


