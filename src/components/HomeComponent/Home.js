import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import left from "../../assets/images/left.png";
import middle from "../../assets/images/middle.png";
import right from "../../assets/images/right.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getalljobs } from "../../apis/job";
import people from "../../assets/images/people.png";
import rupee from "../../assets/images/rupee.png";
import searchicon from "../../assets/icons/searchicon.png";
import { DEFAULT_SKILLS } from "../../utils/constant";

export default function Home() {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    toast.success('You have been logged out!', { duration: 2000 });
    setTimeout(success, 3000);
  }

  const success = () => {
    navigate("/");
  }

  const [skillset, setSkillset] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    getjobsonfilter();
  }, [skillset, search]);

  const [display, setdisplay] = useState([]);

  const getjobsonfilter = async () => {
    const reqPayload = {
      skills: skillset.join(),
      title: search,
    }
    const response = await getalljobs(reqPayload);
    setdisplay(response);
  }

  const colorchange = (f) => {
    document.getElementById(f).style.backgroundColor = "rgb(255, 0, 0)";
  }

  const colorchange2 = (g) => {
    document.getElementById(g).style.backgroundColor = "rgb(255, 255, 255)";
  }

  const title = (e) => {
    setsearch(e.target.value);
  }

  const skillsselect = (event) => {
    event.preventDefault();
    if (!event.target.value) return;

    const newArr = skillset.filter((skill) => skill === event.target.value);
    if (!newArr.length) {
      setSkillset([...skillset, event.target.value]);
    }
    document.getElementById('choice').value = "";
  };

  const deleteskill = (selectedskill) => {
    const newArr = skillset.filter((skill) => skill !== selectedskill);
    setSkillset([...newArr]);
  };

  const clearskills = () => {
    skillset.length = 0;
    setSkillset([...skillset]);
  }

  return (
    <>
      <div className={styles.titlebox}></div>
      <img src={middle} className={styles.middle} alt=''></img>
      <img src={left} className={styles.left} alt=''></img>
      <img src={right} className={styles.right} alt=''></img>
      <div className={styles.jobfinder}>Jobfinder</div>
      {token ?
        <>
          <div onClick={logout} className={styles.logout}>Logout</div><Toaster />
          <div className={styles.logout} style={{ left: '79.5vw' }}>Hello! Recruiter</div>
        </>
        :
        <>
          <div onClick={() => { navigate('/login') }} className={styles.login}>Login</div>
          <div onClick={() => { navigate('/register') }} className={styles.register} style={{ left: '89vw' }}>Register</div>
        </>
      }
      <div className={styles.searchbox}>
        <div className={styles.searchbar}>
          <img src={searchicon} className={styles.search}></img>
          <input className={styles.title} type="text" placeholder="Type any job title" onChange={title}
            style={{ border: 'none', outline: 'none' }}></input>
        </div>
        {
          token ?
            <>
              <div className={styles.addjob} onClick={() => { navigate('/job-post') }}>+ Add Job</div>
            </>
            :
            ""
        }
        {
          !token ?
            <>
              <div style={{ height: '9vh' }}></div>
            </>
            :
            ""
        }

        <div style={{ display: 'flex', marginTop: '-4.6vh' }}>
          <select id="choice" onChange={skillsselect} className={styles.skillsdesign} >
            <option value='' selected defaultValue=''>Skills</option>
            {DEFAULT_SKILLS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>


          <div style={{ width: '22vw', height: '10vh', overflow: 'auto', scrollbarWidth: 'none' }}>
            {skillset.map((skill, index) => {
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

          {
            (skillset.length > 0)
              ?

              (!token)
                ?
                <div className={styles.clear} onClick={() => clearskills()}>
                  Clear
                </div>
                :
                <div className={styles.clear} style={{ top: '17.5vh', left: '34vw' }} onClick={() => clearskills()}>
                  Clear
                </div>
              :
              ""
          }

        </div>

      </div>
      <div className={styles.jobdisplay}>
        {display ?
          <>
            {display.map((data, index) => {
              return (
                <>
                  <div key={index} className={styles.displaybox} onMouseOver={() => { colorchange(data.title) }}
                    onMouseOut={() => { colorchange2(data.title) }}>

                    <div style={{ height: '16vh', width: '0.7vw', marginLeft: '0vw' }} id={data.title} />


                    <div style={{ marginLeft: '5vw' }} className={styles.title}>
                      {data.title}
                      <br />
                      <div style={{ display: 'flex' }}>
                        <img src={people} style={{
                          width: '1.18rem', height: '0.7rem', marginLeft: '0vw'
                          , marginTop: '2vh'
                        }}></img>
                        <div className={styles.size}>{data.size}</div>
                        <img className={styles.rupee} style={{ marginLeft: '1.1vw' }} src={rupee}></img>
                        <div className={styles.size} style={{ marginLeft: '0.3vw', marginTop: '1.5vh' }}>{data.salary}</div>
                        <div className={styles.size} style={{ marginLeft: '4.3vw', marginTop: '1.5vh' }}>{data.location}</div>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div className={styles.mode}>{data.mode}</div>
                        <div className={styles.mode} style={{ marginLeft: '3vw' }}>{data.type}</div>
                      </div>
                    </div>

                    <div className={styles.skills}>
                      {data.skills.map((skill, index) => {
                        return (
                          <>
                            <span key={index} className={styles.skillsdisplay}>
                              {skill}
                            </span>

                          </>
                        )
                      })}

                    </div>

                  </div>

                  {
                    token ?
                      <>
                        <div className={styles.edit} onClick={() => {
                          navigate('/job-post', {
                            state: {
                              id: data._id,
                              data: data,
                              edit: true,
                              flag: true,
                            }
                          })
                        }}>Edit job</div>
                        <a href={`http://localhost:3000/job-info/${data._id}`} target="_blank" rel="noreferrer"
                          style={{ textDecoration: 'none', cursor: 'default' }}>

                          <div className={styles.details}>View details</div></a>
                      </>
                      :
                      <>
                        <a href={`http://localhost:3000/job-info/${data._id}`} target="_blank" rel="noreferrer"
                          style={{ textDecoration: 'none', cursor: 'default' }}>

                          <div className={styles.details} style={{ marginTop: '-6vh' }}>View details</div></a>
                      </>
                  }



                  <div style={{ height: '5vh' }}></div>
                </>
              )
            })}
          </>
          :
          ""
        }
      </div>
    </>
  )
}
