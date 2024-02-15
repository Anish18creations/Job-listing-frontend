import React, { useEffect, useState } from 'react';
import styles from "./Jobinfo.module.css";
import middle from "../../assets/images/middle.png";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import titlespace from "../../assets/images/titlespace.png";
import stipend from "../../assets/images/stipend.png";
import duration from "../../assets/images/duration.png";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getjobinfo } from '../../apis/job';

export default function Jobinfo({ }) {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setdata] = useState(true);
  const [k, setk] = useState([]);

  useEffect(() => {
    fetchjobdetailsbyid();
  }, []);

  const fetchjobdetailsbyid = async () => {
    const jobid = window.location.pathname?.split("/").slice(-1)[0];
    console.log(jobid);
    if (!jobid)
    {
      return;
    }
      
    /*else
    {
      toast.error("Please provide correct job id to view details!!", { duration: 2000 });
      setTimeout(success, 3000);
    }*/
      
    const response = await getjobinfo(jobid);
    /*if(typeof response == String || response == null)
    {
      toast.error("Please provide correct job id to view details!!", { duration: 2000 });
      setTimeout(success, 3000);
    }*/
    console.log(response);
    setdata(response);
    setk(response.skills);
  }

  const logout = () => {
    localStorage.clear();
    toast.success('You have been logged out!', { duration: 2000 });
    setTimeout(success, 3000);
  }

  const success = () => {
    navigate("/");
  }

  return (
    <>
      {
        data ? (
          <>
            <div className={styles.titlebox} />
            <img src={middle} className={styles.middle} alt=''></img>
            <img src={left} className={styles.left} alt=''></img>
            <img src={right} className={styles.right} alt=''>
            </img>
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
            <div className={styles.jobfinder}>Jobfinder</div>

            <img src={titlespace} className={styles.firstbox} alt=''></img>
            <div style={{ position: 'absolute', top: '10vh', left: '14vw' }} className={styles.heading}>
              {data.title}&nbsp;{data.mode}&nbsp;job/internship at {data.companyName}
            </div>
            <div className={styles.info}>

              <div className={styles.firstline}>
                <span>1w ago</span>&ensp;
                <span>.</span>&ensp;
                <span>{data.type}</span>&ensp;
                <span>{/* data.logourl */}</span>&ensp;
                <span>{data.companyName}</span>&ensp;
              </div>

              <div className={styles.secondline}>
                <span style={{ letterSpacing: '0.02rem', width: '70vw' }}>{data.title}</span>
                {token ? <><span className={styles.editbtn} onClick={() => {
                  navigate('/job-post',
                    { state: { id: data._id, data: data, edit: true } })
                }}>Edit job</span></>
                  :
                  ""
                }
              </div>

              <div className={styles.thirdline}>
                {data.location}
              </div>

              <div className={styles.fourthline}>
                <span>
                  <img src={stipend} alt='' style={{ width: '1.5vw', height: '2vh' }}></img>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  &emsp;&emsp;
                  <img src={duration} alt='' style={{ width: '1.5vw', height: '2vh' }}></img>
                </span>
              </div>

              <div className={styles.fifthline}>
                Rs&nbsp;{data.salary}/month
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
                {data.duration}
              </div>

              <div className={styles.company}>
                About company
              </div>

              <div className={styles.aboutcompany}>
                {data.about}
              </div>

              <div className={styles.company} style={{marginTop:'0vh'}}>
                About the  job/internship
              </div>

              <div className={styles.aboutcompany}>
                {data.description}
              </div>

              <div className={styles.company} style={{marginTop:'19vh'}}>
                Skill(s) required
              </div>

              <div className={styles.showskills}>
              {k.map((skill, index) => {
                return (
                  <span key={index} className={styles.skills}>
                    {skill}&nbsp;
                  </span>
                )
              })}
              </div>

              <div className={styles.company}>
                Additional Information
              </div>

              <div className={styles.aboutcompany}>
                {data.information}
              </div>

            </div>
            <div className={styles.stipend}>Stipend</div>
            <div className={styles.stipend} style={{ left: '34.5vw' }}>Duration</div>

          </>
        ) : ""
      }

    </>
  )
}