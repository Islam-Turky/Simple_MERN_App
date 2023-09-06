import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    const targetName = window.localStorage.getItem('theName');
    document.title = targetName? targetName : 'no user';
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