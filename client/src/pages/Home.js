import { Link,useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from 'axios';
import "./style.home.css";
function Home() {
  
  const [user,setUser] = useState({});
  const [edituser,setEditUser] = useState({});
  const [edit,setEdit] = useState(false);
  const [errormsg,setErrormsg] = useState('');
  const navigate = useNavigate();

 function logoutuser() {
  localStorage.setItem('token',"");
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
        setEditUser(user);
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
  async function submit() {
    console.log(edituser);
    const token=localStorage.getItem('token');
    try{
    const userdata= await axios.put('http://localhost:8080/user',{
      
            authorization:`Bearer ${token}`,
            user:edituser
        
    })
   if(userdata.data.user){
    console.log(userdata.data.user)
        setUser(userdata.data.user);
        setEditUser(user);
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
            <button onClick={()=>{setEdit(!edit)}}>Edit</button>
               <p>User Name: {user.name}</p>
               { edit ? (
                <div>
                <p>User Name:</p>
                <input type="text" value={edituser.name} onChange={(e) => setEditUser({...edituser,username:e.target.value})} ></input>
                </div>
               ):""

               }
               <p>Email:  {user.email} </p>
               { edit && (
                <div>
                <p>Email:</p>
                <input type="text" value={edituser.email} onChange={(e) => setEditUser({...edituser,email:e.target.value})} ></input>
                </div>
               )

               }
               <p><img src={user.profilePicture}></img></p>
               { edit && (
                <div>
                <p>profilePicture:</p>
                <input type="text" value={edituser.profilePicture} onChange={(e) => setEditUser({...edituser,profilePicture:e.target.value})} ></input>
                </div>
               )

               }
               <p>Last Active: {user.lastActive}</p>
               { edit &&
               <button onClick={submit}>submit</button>
               }
              <button onClick={logoutuser}>Logout</button> 
      </div>
	);
  
}

export default Home;


