import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    document.title = window.localStorage.getItem('theName') ? window.localStorage.getItem('theName') : 'no user';
    return (
        <>
            <Header/>
            <div id="home">
            </div>
            <Footer />
        </>
    )
}
export default Home;