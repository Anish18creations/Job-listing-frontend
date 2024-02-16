import React, { useState } from 'react';
import jobfinder from '../../assets/images/jobfinder.png';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../../apis/auth';

export default function Register() {

  const navigate = useNavigate();

  const [data, setdata] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  })

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.mobile || !data.password) {
      toast.error('Please fill in all the fields', { duration: 1000 });
      return;
    }

    const box = document.querySelector('#check');
    if (!box.checked) {
      toast.error('Click on the checkbox to proceed', { duration: 1000 });
      return;
    }

    const response = await registerUser({ ...data });
    if (response) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.name);
      toast.success('Congrats! User registered successfully', { duration: 2000 })
      setTimeout(success, 3000);
    }
  }

  const success = () => {
    navigate("/");
  }

  return (
    <div style={{ cursor: 'default' }}>
      <img src={jobfinder} alt='' className={styles.image} />
      <div className={styles.jobfindertext}>Your Personal Job Finder</div>

      <input type='text' placeholder='Name' className={styles.name} required onChange={handlechange}
        name='name' value={data.name}></input>

      <input type='email' placeholder='Email' className={styles.name} style={{ top: '46vh' }} required
        onChange={handlechange} name='email' value={data.email}></input>

      <input type='tel' placeholder='Mobile' className={styles.name} style={{ top: '57vh' }} required
        onChange={handlechange} name='mobile' value={data.mobile}></input>

      <input type='password' placeholder='Password' className={styles.name} style={{ top: '68vh' }} required
        onChange={handlechange} name='password' value={data.password}></input>

      <input type='checkbox' id='check' required className={styles.checkbox}></input>

      <div className={styles.createaccount}>Create an account</div>
      <div className={styles.personaljobfinder}>Your personal job finder is here</div>
      <div className={styles.checkbox_text}>By creating an account, I agree to our terms of use and privacy policy
      </div>
      <div className={styles.createaccountbox} onClick={handlesubmit}><p style={{ marginTop: '2vh' }}>
        Create Account</p></div><Toaster />
      <div className={styles.already} onClick={() => { navigate('/login') }}>Already have an account?&ensp;
        <u style={{ color: '#000000', textDecorationColor: '#525252' }}>Sign In</u></div>
    </div>
  )
}
