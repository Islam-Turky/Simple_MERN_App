import { FaFacebook, FaWhatsapp, FaInstagram, FaTelegram } from 'react-icons/fa';

const Footer = () => {
    const social_media = window.localStorage.getItem('social_media');
    const social_media_url = social_media ? JSON.parse(social_media) : '#';
    const { facebook, instagram, whatsapp, telegram } = social_media_url;
    return (
        <div id="footer">
            @{window.localStorage.getItem('theName')} Copyright (c)
            <div className="links">
                <a href={facebook} target='_blank' id='facebook'><FaFacebook /></a>
                <a href={instagram} target='_blank' id='instagram'><FaInstagram /></a>
                <a href={whatsapp} target='_blank' id='whatsapp'><FaWhatsapp /></a>
                <a href={telegram} target='_blank' id='telegram'><FaTelegram /></a>
            </div>
        </div>
    )
}
export default Footer;