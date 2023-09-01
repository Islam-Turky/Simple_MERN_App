const Footer = () => {
    const social_media = window.localStorage.getItem('social_media');
    const social_media_url = JSON.parse(social_media);
    const { facebook, instagram, whatsapp, telegram } = social_media_url;
    return (
        <div id="footer">
            @{window.localStorage.getItem('theName')} Copyright (c)
            <div className="links">
                <a href={facebook} target='_blank'>facebook</a>
                <a href={instagram} target='_blank'>instagram</a>
                <a href={whatsapp} target='_blank'>whatsapp</a>
                <a href={telegram} target='_blank'>telegram</a>
            </div>
        </div>
    )
}
export default Footer;