import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SetStateAction, useState } from 'react';

const Signup = () => {
    document.title = "Signup";

    const history = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeUser, setTypeUser] = useState('user');

    const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try{
            await axios.post('https://custom-portfolio.onrender.com/signup', {
                name,
                email,
                password,
                typeUser
            }).then((res) => {
                if(res.data === "User already registered" || res.data === "Admin already registered"){
                    alert("User already registered, please login");
                    history('/login');
                }else if(res.data === "User Not exist" || res.data === "Admin Not exist"){
                    window.localStorage.setItem('theName', name);
                    history('/');
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
        console.log(typeUser);
    }

    return (
        <>
            <div id="signup">
                <h1>Signup</h1>
                <form action="POST">
                    <div className="enter-data">
                        <label htmlFor="userType">type of user </label>
                        <select name="userType" id="userType" onChange={handleSelect}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="enter-data">
                        <input type="text" id="name" placeholder="Name" onChange={(e) => { setName(e.target.value) }}/>
                    </div>
                    <div className="enter-data">
                        <input type="email" id="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="enter-data">
                        <input type="password" id="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="sub">
                        <input type='submit' value='Signup' onClick={submit}/>
                    </div>
                </form>
                <Link to='/login'>Login</Link>
            </div>
        </>
    )
}
export default Signup;