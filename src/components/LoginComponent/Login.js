import React, { useState } from 'react';
import job from '../../assets/images/jobfinder.png';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { loginUser } from '../../apis/auth';

export default function Login() {

  const navigate = useNavigate();

  const [data, setdata] = useState({
    email: "",
    password: "",
  })

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const handlesubmit = async(e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error('Please fill in all the fields', { duration: 1000 });
      return;
    }

    const response = await loginUser({...data});
    if(response){
      localStorage.setItem("token" , response.token);
      localStorage.setItem("username", response.name);
      /*toast.success('Congrats! User logged in successfully', { duration: 2000 })
      setTimeout(success,3000);*/
      navigate("/");
    }
    else{
      toast.error('Invalid credentials , User cannot be logged in!!', { duration: 1000 });
    }

  }

  /*const success = () => {
    navigate("/");
  }*/

  return (
    <div style={{ cursor: 'default' }}>
      <img src={job} alt='' className={styles.image} />
      <div className={styles.jobfindertext}>Your Personal Job Finder</div>
      <div className={styles.title}>Already have an account?</div>
      <div className={styles.personaljobfinder}>Your personal job finder is here</div>

      <input type='email' placeholder='Email' className={styles.email} required onChange={handlechange}
        name='email' value={data.email}></input>

      <input type='password' placeholder='Password' className={styles.email} style={{ top: "54vh" }} name='password'
        value={data.password} onChange={handlechange} required></input>

      <div className={styles.signinbox} onClick={handlesubmit}><p style={{ marginTop: '2vh' }}>Sign in</p></div>
      <Toaster />
      <div className={styles.dont} onClick={() => { navigate('/register') }}>Don’t have an account?&ensp;
        <u style={{ color: '#000000', textDecorationColor: '#525252' }}>Sign Up</u></div>
    </div>
  )
}
