import { Link,useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from 'axios';
import "./style.home.css";

function Home() {
  
  const [user,setUser] = useState({});
  const [errormsg,setErrormsg] = useState('');
  const navigate = useNavigate();

 function logoutuser() {
    navigate('/login');
  }
useEffect(()=>{
    loginUser();
},[]);
  async function loginUser() {
    const token=localStorage.getItem('token');
    try{
    const userdata= await axios.post('http://localhost:8080/user',{
      
            authorization:`Bearer ${token}`,
        
    })
   if(userdata.data.user){
        setUser(userdata.data.user);
   }
    else{
      
    navigate('/login');
    setErrormsg(userdata.data.errormsg);
    console.log(errormsg);
  }
}
  catch(e){
    console.log(e);
    navigate('/login');
  }
  }	
	return (
        <div className="home-page">
               <p>User Name: {user.name}</p>
               <p>Email:  {user.email} </p>
               <p><img src={user.profilePicture}></img></p>
              <button onClick={logoutuser}>Logout</button> 
      </div>
	);
}

export default Home;