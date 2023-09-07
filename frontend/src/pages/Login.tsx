import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SetStateAction, useState } from 'react';


const Login = () => {
    document.title = "Login";

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeUser, setTypeUser] = useState('user');

    const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try{
            await axios.post('https://custom-portfolio.onrender.com/', {
                email,
                password,
                typeUser
            }).then((res) => {
                if(res.data.msg === 'Ok User exist' || res.data.msg === 'Ok Admin exist'){
                    window.localStorage.setItem('theName', res.data.name);
                    window.localStorage.setItem('theEmail', email);
                    window.localStorage.setItem('social_media', res.data.mySocialLinks? JSON.stringify(res.data.mySocialLinks) : '');
                    window.localStorage.setItem('myImage', res.data.blob);
                    history('/');
                }else if(res.data.msg === 'User not found'){
                    alert('User not found');
                }else{
                    alert("Something went wrong!");
                }
            }).catch((err) => console.log('Error : '+ err));
        }catch(err){
            console.log(err);
        }finally{
            console.log('Process finished!!!');
        }
    }

    const handleSelect = (e: { target: { value: SetStateAction<string>; }; }) => {
        setTypeUser(e.target.value);
    }

    return (
        <>
            <div id="login">
                <h1>Login</h1>
                <form action="POST">
                    <div className="enter-data">
                        <label htmlFor="userType">type of user </label>
                        <select name="userType" id="userType" color='black' onChange={handleSelect}>
                            <option value="user" color='black' >User</option>
                            <option value="admin" color='black'>Admin</option>
                        </select>
                    </div>
                    <div className="enter-data">
                        <input type="email" id="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className="enter-data">
                        <input type="password" id="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <div className="sub">
                        <input type='submit' value='Login' onClick={submit}/>
                    </div>
                </form>
                <Link to='/signup'>Signup</Link>
            </div>
        </>
    )
}
export default Login;