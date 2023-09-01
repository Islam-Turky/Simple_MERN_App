import { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';

const Header = () => {
    const [ show, setShow ] = useState(false);
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [telegram, setTelegram] = useState('');
    const theName = window.localStorage.getItem('theName');
    const theEmail = window.localStorage.getItem('theEmail');
    const socialLinks = window.localStorage.getItem('social_media');

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

    return (
        <div id="nav-header">
            <div id="logo">{theName? theName : 'no user'}</div>
            <div className="links">
                <div>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/services'>Services</Link>
                    <Link to='/contact'>Contact</Link>
                </div>
            </div>
            <div className={theName? 'hidden' : 'shown'}>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
            </div>
            <div className={theName? 'shown' : 'hidden'}>
                <div id='sidebar'>
                    <div><a href="#" onClick={() => {setShow(!show)}}><FaBars /></a></div>
                    <div id="wrapper" className={ show ? 'showSide' : 'hideSide' }>
                        <div className={socialLinks? 'hideSide' : 'side'}>
                            <Popup trigger={<button className='pop-btn'>Links Setting</button>} modal nested>
                                <div id="social-links-settings">
                                    <h1>Links</h1>
                                    <form action="POST">
                                        <input type='text' className='input-link' placeholder='Facebook-Link' onChange={(e) => {setFacebook(e.target.value)}} required/>
                                        <input type='text' className='input-link' placeholder='Instagram-Link' onChange={(e) => {setInstagram(e.target.value)}} required/>
                                        <input type='text' className='input-link' placeholder='Whatsapp-Link' onChange={(e) => {setWhatsapp(e.target.value)}} required/>
                                        <input type='text' className='input-link' placeholder='Telegram-Link' onChange={(e) => {setTelegram(e.target.value)}} required/>
                                        <input type='submit' name="submit-links" id="submit-links" value='OK' onClick={confirmLinks} />
                                    </form>
                                </div>
                            </Popup>
                        </div>
                        <div className='side'>
                            <a href="" onClick={() => {
                                window.localStorage.setItem('theName', '');
                                window.localStorage.setItem('theEmail', '');
                                window.localStorage.setItem('social_media', '');
                            }}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;