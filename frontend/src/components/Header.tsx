/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { FaBars, FaMobileScreenButton, FaInfo } from "react-icons/fa6";
import { FaHome, FaPeopleCarry } from "react-icons/fa";
import { AiFillHeart, AiOutlineLogout, AiTwotoneSetting } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';

const Header = () => {
    const [ show, setShow ] = useState(false);
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [telegram, setTelegram] = useState('');
    const [theImage, setTheImage] = useState({ preview: '', data: '' });

    const theName = window.localStorage.getItem('theName');
    const theEmail = window.localStorage.getItem('theEmail');
    const socialLinks = window.localStorage.getItem('social_media');
    const myImage = window.localStorage.getItem('myImage'); 

    const confirmLinks =  async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try{
            await axios.post('https://custom-portfolio.onrender.com/api/sociallinks', {
                theEmail,
                facebook,
                instagram,
                whatsapp,
                telegram
            })
            .then((response) => {
                window.localStorage.setItem('social_media', JSON.stringify(response.data));
            })
            .catch((err) => console.log(err));
        }catch(err){
            console.log(err);
        }
        const input_link = document.querySelectorAll('#social-links-settings form .input-link');
        input_link.forEach((item) => {
            item.ariaPlaceholder = "";
        })
    }

    const handleImageChange = async (e:any) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        setTheImage(img);
    }

    const handleImageUpload = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', theImage.data);
        formData.append('email', String(theEmail));
        await fetch('https://custom-portfolio.onrender.com/api/upload/image/', {
            method: 'POST',
            body: formData,
        }).then((response) => {
            return response;
        }).then((response) => response.json())
        .then((res) => {
            window.localStorage.setItem('myImage' , res.blob);
        })
        .catch((error) => console.log(error))
        window.location.reload();
    };

    const hiddenClass = () => {
        if(!theName){
            return 'hidden';
        }
    }

    return (
        <div id="nav-header">
            <div id="logo">{theName? theName : 'no user'}</div>
            <div className="links">
                <div>
                    <Link to='/'>Home</Link>
                    <Link to='/about' className={hiddenClass()}>About</Link>
                    <Link to='/services' className={hiddenClass()}>Services</Link>
                    <Link to='/contact' className={hiddenClass()}>Contact</Link>
                </div>
            </div>
            <div className={theName? 'hidden' : 'shown'}>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
            </div>
            <div className={theName? 'shown' : 'hidden'}>
                <div id='sidebar'>
                    <div id='info-container'>
                        <img id='profile-icon' src={myImage || "/vite.svg" } alt='avatar'/>
                        <div><a href="#" onClick={() => {setShow(!show)}}><FaBars /></a></div>
                    </div>
                    <div id="wrapper" className={ show ? 'showSide' : 'hideSide' }>
                        <h1>SETTING</h1>
                        <div className="sidelinks">
                            <div className="myLink">
                                <Link to='/'>Home</Link>
                                <span className='myIcon'><FaHome /></span>
                            </div>
                            <div className='myLink'>
                                <Link to='/about' className={hiddenClass()}>About</Link>
                                <span className='myIcon'><FaInfo /></span>
                            </div>
                            <div className="myLink">
                                <Link to='/services' className={hiddenClass()}>Services</Link>
                                <span className='myIcon'><FaPeopleCarry /></span>
                            </div>
                            <div className="myLink">
                                <Link to='/contact' className={hiddenClass()}>Contact</Link>
                                <span className='myIcon'><FaMobileScreenButton /></span>
                            </div>
                        </div>
                        <div className='hr'></div>
                        <div className={socialLinks? 'hide-global' : 'side'}>
                            <div className="myLink">
                                <Popup trigger={<button className='pop-btn'>Links Setting</button>} modal nested>
                                    <div id="social-links-settings">
                                        <h1>Links</h1>
                                        <form action="POST">
                                            <input type='url' className='input-link' placeholder='Facebook-Link' onChange={(e) => {setFacebook(e.target.value)}} required/>
                                            <input type='url' className='input-link' placeholder='Instagram-Link' onChange={(e) => {setInstagram(e.target.value)}} required/>
                                            <input type='url' className='input-link' placeholder='Whatsapp-Link' onChange={(e) => {setWhatsapp(e.target.value)}} required/>
                                            <input type='url' className='input-link' placeholder='Telegram-Link' onChange={(e) => {setTelegram(e.target.value)}} required/>
                                            <input type='submit' name="submit-links" id="submit-links" value='OK' onClick={confirmLinks} />
                                        </form>
                                    </div>
                                </Popup>
                                <span className='myIcon'><AiFillHeart /></span>
                            </div>
                        </div>
                        <div className="side">
                            <div className="myLink">
                                <Popup trigger={<button className='pop-btn'>Setting</button>} modal nested>
                                    <div id="profile-setting">
                                        <h1>PROFILE</h1>
                                        <img id="photoUpload" src={myImage || "/vite.svg" } alt='avatar' />
                                        <form onSubmit={handleImageUpload} >
                                            <input type='file'  id='uploadfile' onChange={handleImageChange}/>
                                            <input type='submit' value='upload'  />
                                        </form>
                                    </div>
                                </Popup>
                                <span className="myIcon"><AiTwotoneSetting /></span>
                            </div>
                        </div>
                        <div className='side'>
                            <div className="myLink">
                                <a href="" onClick={() => {
                                    window.localStorage.setItem('theName', '');
                                    window.localStorage.setItem('theEmail', '');
                                    window.localStorage.setItem('social_media', '');
                                    window.localStorage.setItem('myImage', '');
                                }}>Logout</a>
                                <span className="myIcon"><AiOutlineLogout /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;
