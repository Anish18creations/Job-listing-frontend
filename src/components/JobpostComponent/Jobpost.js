import React, { useState } from 'react';
import styles from './Jobpost.module.css';
import recruiter from '../../assets/images/recruiter.png';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { createJobPost, editJobPost } from '../../apis/job';
import { useLocation } from 'react-router-dom';

export default function Jobpost() {

  const { state } = useLocation();
  let p;

  const [iseditexistingjobpost] = useState(false || state?.edit);
  if (!state) {
    p = [];
  }
  else {
    p = state.data.skills;
  }

  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    companyName: "" || state?.data?.companyName,
    logourl: "" || state?.data?.logourl,
    salary: "" || state?.data?.salary,
    title: "" || state?.data?.title,
    description: "" || state?.data?.description,
    location: "" || state?.data?.location,
    about: "" || state?.data?.about,
    information: "" || state?.data?.information,
    size: "" || state?.data?.size,
    duration: "" || state?.data?.duration,
    skills: p,
    type: "" || state?.data?.type,
    mode: "" || state?.data?.mode,
  });

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const handlechange2 = (e) => {
    setformdata({ ...formdata, [e.target.name]: Number(e.target.value) });
  }

  const skillsselect = () => {
    for (var option of document.getElementById('common').options) {
      if (option.selected) {
        const newArr = formdata.skills.filter((skill) => skill === option.value);
        if (!newArr.length) {
          formdata.skills.push(option.value);
          setformdata({ ...formdata });
        }
        document.getElementById('common').value = "";
      }
    }
  }

  const deleteskill = (selectedskill) => {
    const index = formdata.skills.indexOf(selectedskill);
    formdata.skills.splice(index, 1);
    setformdata({ ...formdata });
  };

  const handlesubmit = async () => {
    if (!formdata.companyName || !formdata.logourl || !formdata.salary || !formdata.title
      || !formdata.description || !formdata.location || !formdata.about || !formdata.information
      || !formdata.size || !formdata.duration || !formdata.type || !formdata.mode || !formdata.skills.length) {

      toast.error("Please fill in all the fields!!", { duration: 1000 });
      return;
    }

    if (iseditexistingjobpost) {
      const response = await editJobPost(state.id, { ...formdata });
      if (response)
        toast.success("Job Details have been edited", { duration: 2000 });
      setTimeout(edit, 3000);
    }
    else {
      const response = await createJobPost({ ...formdata });
      if (response)
        toast.success("New job has been created", { duration: 2000 });
      setTimeout(success, 3000);
    }

  }

  const edit = () => {
    navigate(`/job-info/${state.id}`);
  }

  const success = () => {
    navigate("/");
  }

  const goback = () => {
    if (state?.flag)
      navigate('/');
    else
      navigate(`/job-info/${state.id}`);
  }

  return (
    <div>
      <img src={recruiter} className={styles.recruit} alt=''></img>
      <div className={styles.job}>Recruiter {iseditexistingjobpost ? <>edit</> : <>add</>} job details here</div>
      <div className={styles.title}>
        {iseditexistingjobpost ? <>Edit</> : <>Add</>} job description
      </div>
      <div className={styles.label}>Company Name</div>
      <input className={styles.box} onChange={handlechange} type='text' required name='companyName'
        value={formdata.companyName} placeholder='Enter your company name here'></input>

      <div className={styles.label} style={{ top: '17vh' }}>Add logo URL</div>
      <input className={styles.box} onChange={handlechange} type='text' required name='logourl'
        value={formdata.logourl} placeholder='Enter the link' style={{ top: '17vh' }}></input>

      <div className={styles.label} style={{ top: '22vh' }}>Job position</div>
      <input className={styles.box} onChange={handlechange} type='text' required name='title'
        value={formdata.title} placeholder='Enter job position' style={{ top: '22vh' }}></input>

      <div className={styles.label} style={{ top: '27vh' }}>Monthly salary</div>
      <input className={styles.box} onChange={handlechange2} type='text' required name='salary'
        value={formdata.salary} placeholder='Enter Amount in rupees' style={{ top: '27vh' }}></input>

      <div className={styles.label} style={{ top: '32vh' }}>Job Type</div>
      <select required className={styles.skillsdesign} name='type'
        onChange={handlechange} value={formdata.type} style={{ top: '32vh' }}>
        <option value='' disabled selected>Select</option>
        <option value='Part time'>Part time</option>
        <option value='Full time'>Full time</option>
      </select>

      <div className={styles.label} style={{ top: '37vh' }}>Remote/office</div>
      <select required className={styles.skillsdesign} name='mode'
        onChange={handlechange} value={formdata.mode} style={{ top: '37vh' }}>
        <option value='' disabled selected>Select</option>
        <option value='Remote'>Remote</option>
        <option value='Office'>Office</option>
      </select>

      <div className={styles.label} style={{ top: '42vh' }}>Location</div>
      <input className={styles.box} onChange={handlechange} type='text' required name='location'
        value={formdata.location} placeholder='Enter Location' style={{ top: '42vh' }}></input>

      <div className={styles.label} style={{ top: '49.5vh' }}>Job Description</div>
      <input className={styles.box} onChange={handlechange} type='text' required name='description'
        value={formdata.description} placeholder='Type the job description' style={{
          top: '47vh', height: '4vh'
          , padding: '1vw'
        }}></input>

      <div className={styles.label} style={{ top: '60.5vh' }}>About Company</div>
      <input className={styles.box} onChange={handlechange} type='text' required name='about'
        value={formdata.about} placeholder='Type about your company' style={{
          top: '58vh', height: '4vh'
          , padding: '1vw'
        }}></input>

      <div className={styles.label} style={{ top: '69vh' }}>Skills Required</div>
      <select id='common' required onChange={skillsselect} className={styles.skillsdesign}>
        <option value='' selected defaultValue=''>Select</option>
        <option value='Html'>Html</option>
        <option value='Js'>Js</option>
        <option value='Css'>Css</option>
        <option value='React'>React</option>
        <option value='Python'>Python</option>
        <option value='Jquery'>Jquery</option>
        <option value='Java'>Java</option>
        <option value='C'>C</option>
        <option value='Wordpress'>Wordpress</option>
        <option value='Php'>PHP</option>
      </select>

      <div style={{
        position: 'absolute', top: '69vh', left: '30vw',
        width: '15vw', height: '5vh', overflow: 'auto', scrollbarWidth: 'thin'
      }}>
        {formdata.skills.map((skill, index) => {
          return (
            <>
              <span className={styles.displayskills} key={index}>
                {skill}
              </span>
              <span className={styles.cross} onClick={() => deleteskill(skill)}>
                X
              </span>
            </>
          )
        })}
      </div>

      <div className={styles.label} style={{ top: '76.5vh' }}>Information</div>
      <input className={styles.box} onChange={handlechange} type='text' required name='information'
        value={formdata.information} placeholder='Enter the additional information' style={{
          top: '74.5vh', height: '3vh'
          , padding: '1vw'
        }}></input>

      <div className={styles.label} style={{ top: '84.5vh' }}>Company Size</div>
      <input className={styles.box} onChange={handlechange} type='text' required name='size'
        value={formdata.size} placeholder='Enter Company Size' style={{ top: '84.5vh' }}></input>

      <div className={styles.label} style={{ top: '89.5vh' }}>Duration</div>
      <input className={styles.box} onChange={handlechange} type='text' required name='duration'
        value={formdata.duration} placeholder='Enter Duration' style={{ top: '89.5vh' }}></input>

      {iseditexistingjobpost ? (
        <>
          <button onClick={goback} className={styles.cancel}>
            Cancel
          </button>
          <button onClick={handlesubmit} className={styles.add}>
            Edit Job
          </button><Toaster />
        </>
      ) : (
        <>
          <button onClick={() => { navigate("/") }} className={styles.cancel}>
            Cancel
          </button>
          <button onClick={handlesubmit} className={styles.add}>
            + Add Job
          </button><Toaster />
        </>
      )}

    </div>
  )
}
