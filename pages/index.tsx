import { useCallback, useState, useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Particles from 'react-tsparticles'
import type { Container, Engine, IOptions } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import Typewriter from 'typewriter-effect'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"

import Header from '../components/Header'
import CustomAccordion from '../components/CustomAccordion'
import Skill from '../components/Skill'

import styles from '../styles/Home.module.css'
import { fail } from 'assert'

const options: IOptions = {
  background: {
    color: {
      value: "#252222",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "grab",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        quantity: 20,
      },
      repulse: {
        distance: 150,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#9900ff",
    },
    links: {
      color: "#f700ff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 500,
      },
      value: 100,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 2 },
    },
  },
  detectRetina: true,
}

const canvasStyle = `

  width: 100% !important; 
  height: 100% !important; 
  pointer-events: none; 
  position: absolute !important; 
  z-index: 0 !important; 
  top: 0px !important; 
  left: 0px !important; 
  background-color: rgb(37, 34, 34);
`

const LoadingPopup = ({ showPopup }: { showPopup: boolean }) => {
  return (
      <div className={showPopup ? "popup-wrapper" : "popup-wrapper hidden"}>
          <div className="popup loading">
              <ClipLoader loading={true} color="#9900ff" size={100} />
              <p>Sending...</p>
          </div>
      </div>
  )
}

const SuccessPopup = ({ showPopup }: { showPopup: boolean }) => {
    const close = () => {
        window.location.reload()
    }

    return (
        <div className={showPopup ? "popup-wrapper" : "popup-wrapper hidden"}>
            <div className="popup success">
                <Image src="/res/check.svg" alt="Check" width={90} height={90} />
                <h2>Message Sent Successfully</h2>
                <p>Thank you for getting in touch. I will get back to you shortly!</p>
                <input type="submit" value="Ok" className="btn btn-primary btn-block"  onClick={close} />
            </div>
        </div>
    )
}

const FailurePopup = ({ showPopup, setFailPopup }: { showPopup: boolean, setFailPopup: (params: any) => any }) => {
    const close = () => {
        setFailPopup(false)
    }

    return (
        <div className={showPopup ? "popup-wrapper" : "popup-wrapper hidden"}>
            <div className="popup fail">
                <Image src="/res/cross.svg" alt="Cross" width={90} height={90} />
                <h2>Message Sent Unsuccessfully</h2>
                <p>Please try again later. If the issue persists, please let me know via danielbly999@gmail.com.</p>
                <input type="submit" value="Ok" className="btn btn-primary btn-block" onClick={close} />
            </div>
        </div>
    )
}

const InfoPopup = ({ showPopup, setInfoPopup, title, children }: { showPopup: boolean, setInfoPopup: (params: any) => any, title: string, children: any }) => {
    const close = () => {
        setInfoPopup(false)
    }

    return (
        <div className={showPopup ? "popup-wrapper" : "popup-wrapper hidden"}>
            <div className="popup fail">
                <h2>{title}</h2>
                <p>{children}</p>
                <input type="submit" value="Ok" className="btn btn-primary btn-block" onClick={close} />
            </div>
        </div>
    )
}

const Home: NextPage = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Logic goes here :)
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    const element = document.getElementsByClassName("particlesCanvas")[0]
    element.setAttribute("style", canvasStyle)
    await console.log(container)
  }, [])
  
  const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Please enter your name"),
    email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter your email"),
    message: Yup.string()
        .required("Please include a message"),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  const [loadingPopup, setLoadingPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [failPopup, setFailPopup] = useState(false);

  const [infoPopup1, setInfoPopup1] = useState(false);
  const [infoPopup2, setInfoPopup2] = useState(false);

  const onSubmit = async (data: object) => {
    console.log(data)
    setLoadingPopup(true)
    axios.post('/api/submit-form', data)
      .then((res) => {
        setLoadingPopup(false)
        setSuccessPopup(true)
      }).catch((err) => {
        console.log(err)
        setLoadingPopup(false)
        setFailPopup(true)
      }
    )
  }

  const addGitHubColaborator = async (repo: string) => {
    const password = prompt('This repository includes proprietary code. Please enter the password:')
    if(!password) return
    const username = prompt('Enter your GitHub username:')
    if(!username) return
    
    console.log("Begining request")

    axios.put('/api/add-github-colaborator', { repo: repo, username: username, pass: password })
      .then((result) => {
        window.alert("You have successfully been added to the repository. Please check your GitHub account.")
      }).catch((error) => {
        if (error.response.status === 401) {
          window.alert("The password you entered was incorrect. Please try again.")
        } else {
          window.alert("Something went wrong. Please try again. If the issue persists please let me know via danielbly999@gmail.com.")
        }
      })
  }

  const [exapanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  }

  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  const [active, setActive] = useState('home')

  const handleScroll = () => {
    const headerHeight = 60
    const { top, height } = document?.body.getBoundingClientRect() ?? 0
    setActive('contacts')
    if (-top < aboutRef.current.offsetTop - headerHeight)
      setActive('home')
    else if (-top < projectsRef.current.offsetTop - headerHeight)
      setActive('about')
    else if (-top < contactRef.current.offsetTop - headerHeight && -top < height - window.innerHeight - (contactRef.current.clientHeight / 2))
      setActive('projects')
    else
      setActive('contact')
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
    }
  })

  useEffect(() => {
    console.log(active)
  }, [active])

  return (
    <div style={{backgroundColor: 'black'}}>
    <div className="anchor" id="home" />
    <div className="landing-wrapper" style={{height: '100vh'}}>
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={options} canvasClassName="particlesCanvas" />
      <div className={styles.typewriter_wrapper} style={{zIndex: 1000}}>
        <div className="typewriter-wrapper">
        <Typewriter
          onInit={(typewriter) => {
            typewriter.changeDelay(50)
              .typeString('<span>Hi,<br/> I am <span style="color: #ffd400;">Daniel</span></span>')
              .pauseFor(500)
              .typeString("<br/><span>A Full-Stack SaaS Developer</span>")
              .start()
          }} />
          </div>
      </div>  
      <a href="#about">
        Learn More
        <Image src="/res/down.svg" alt="Cross" width={15} height={15} />
      </a>
    </div>
    {/* <div className={styles.background_particles} >
      <Particles id="tsparticles2" init={particlesInit} loaded={particlesLoaded} options={options} canvasClassName="particlesCanvas" />
    </div> */}
    <Header active={active} />
    <div className="anchor" id="about" />
    <div className="about-wrapper" ref={aboutRef}>
      <h1 className="heading">About</h1>
      <div className="flex-wrapper">
        <div className="text-wrapper">
          <Image className="image" src="/Profile.svg" width={300} height={300} />
          <p>Since learning programming during my childhood as a way to create my own video games, coding has become part of my daily life.</p>
          <p>As a freelance Full-Stack SaaS developer I have further harnessed my love of learning to develop skills in a wide range of technologies and frameworks, allowing me to deliver the best solution to my clients.</p>
          <p>When I am not at my computer I enjoy reading, SIM racing, tabletop gaming and playing guitar or piano.</p>
        </div>
        <div className="skills-wrapper">
          <CustomAccordion 
            title="Languages" 
            expanded={exapanded == 'panel1'} 
            handleChange={() => handleChange('panel1')}
            id="panel1">
            <Skill logo="HTML5.svg" alt="HTML5 logo" text="HTML5" />
            <Skill logo="CSS3.svg" alt="CSS3 logo" text="CSS3" />
            <Skill logo="PHP.svg" alt="PHP logo" text="PHP" />
            <Skill logo="Javascript.svg" alt="Javascript logo" text="Javascript" />
            <Skill logo="Typescript.svg" alt="Typescript logo" text="Typescript" />
            <Skill logo="CSharp.svg" alt="C# logo" text="C#" />
            <Skill logo="Java.svg" alt="Java logo" text="Java" />
          </CustomAccordion>
          <CustomAccordion 
            title="Frameworks" 
            expanded={exapanded === 'panel2'} 
            handleChange={() => handleChange('panel2')}
            id="panel2">
            <Skill logo="React.svg" alt="React logo" text="ReactJS" />
            <Skill logo="NextJS.svg" alt="NextJS logo" text="NextJS" invert />
            <Skill logo="Laravel.svg" alt="Laravel logo" text="Laravel" />
            <Skill logo="NodeJS.svg" alt="NodeJS logo" text="NodeJS" />
            <Skill logo="ExpressJS.svg" alt="ExpressJS logo" text="ExpressJS" invert />
            <Skill logo="NestJS.svg" alt="NestJS logo" text="NestJS" />
            <Skill logo="RubyOnRails.svg" alt="Ruby on Rails logo" text="Ruby on Rails" />
          </CustomAccordion>
          <CustomAccordion 
            title="Databases" 
            expanded={exapanded === 'panel3'} 
            handleChange={() => handleChange('panel3')}
            id="panel3">
            <Skill logo="MongoDB.svg" alt="MongoDB logo" text="MongoDB" />
            <Skill logo="PostgreSQL.svg" alt="PostgreSQL logo" text="PostgreSQL" />
            <Skill logo="Neo4j.svg" alt="Neo4j logo" text="Neo4j" />
            <Skill logo="MySQL.svg" alt="MySQL logo" text="MySQL" />
          </CustomAccordion>
          <CustomAccordion 
            title="DevOps" 
            expanded={exapanded === 'panel4'} 
            handleChange={() => handleChange('panel4')}
            id="panel4">
            <Skill logo="Git.svg" alt="Git logo" text="Git" />
            <Skill logo="Docker.svg" alt="Docker logo" text="Docker" />
            <Skill logo="ci-cd.svg" alt="CI/CD logo" text="CI/CD" invert />
            <Skill logo="jest.svg" alt="Jest logo" text="JestJS" />
          </CustomAccordion>
        </div>
      </div>
    </div>
    <div className="anchor" id="projects" />
    <div className="projects-wrapper" ref={projectsRef}>
      <h1 className="heading">Projects</h1>
      <InfoPopup title="Not Avaliable" setInfoPopup={setInfoPopup1} showPopup={infoPopup1}>
        This application includes proprietary software I do not have permission to host. If you would like me to request special permission from the owner please let me know.
      </InfoPopup>
      <div className="project">
        <a onClick={() => setInfoPopup1(true)} className="image-wrapper">
          <Image src="/commuter-v2-site-capture.JPG" alt="Commuter v2 Screenshot" width={740} height={360} layout="responsive" />
        </a>
        <div className="text-wrapper">
          <h2>Commuter v2</h2>
          <p>Full stack application created with PHP7 and Laravel designed to refresh Skycity’s outdated fleet management system.</p>
          <a onClick={() => setInfoPopup1(true)}><div className="link-button">LIVE APP</div></a>
          <a onClick={() => addGitHubColaborator('commute-v2')}><div className="link-button">VIEW CODE</div></a>
        </div>
      </div>
      <div className="project inverted">
        <div className="text-wrapper">
          <h2>Flicka NZ</h2>
          <p>An online marketplace with a rewards system which allows the user to take place in draws to win prizes. Created using Ruby on Rails with a PostgreSQL database and a React front-end utilizing Firebase for file storage.</p>
          <a href="https://danielbly.dev/flicka" target="_blank"><div className="link-button">LIVE APP</div></a>
          <a onClick={() => addGitHubColaborator('flicka')}><div className="link-button">VIEW CODE</div></a>
        </div>
        <a href="https://danielbly.dev/flicka" target="_blank" className="image-wrapper">
          <Image src="/flicka-site-capture.JPG" alt="Flicka Screenshot" width={740} height={360} layout="responsive" />
        </a>
      </div>
      <div className="project">
        <a href="https://beta.dataset.co.nz" target="_blank" className="image-wrapper">
          <Image src="/dataset-site-capture.JPG" alt="Dataset Screenshot" width={740} height={360} layout="responsive" />
        </a>
        <div className="text-wrapper">
          <h2>Dataset (Beta)</h2>
          <p>A social media application designed to aid in the discovery of up-and-coming electronic music artists. Created using Next.js and Express.js with a Neo4j graph database and AWS S3 file storage.</p>
          <a href="https://beta.dataset.co.nz" target="_blank"><div className="link-button">LIVE APP</div></a>
          <a onClick={() => addGitHubColaborator('dataset')}><div className="link-button">VIEW CODE</div></a>
        </div>
      </div>
      <InfoPopup title="Coming Soon!" setInfoPopup={setInfoPopup2} showPopup={infoPopup2}>
        This application is currently in development and therefore no live demo is avaliable.
      </InfoPopup>
      <div className="project inverted last">
        <div className="text-wrapper">
          <h2>Commuter v3 (WIP)</h2>
          <p>I am currently developing Commuter v3 in partnership with it’s owner as modular cooperate booking software. It is being created in Typescript with a Nest.js backend running a MongoDB database and will implement a Next.js frontend.</p>
          <a onClick={() => setInfoPopup2(true)}><div className="link-button">LIVE APP</div></a>
          <a onClick={() => addGitHubColaborator('commute-v3')}><div className="link-button">VIEW CODE</div></a>
        </div>
        <a onClick={() => setInfoPopup2(true)} className="image-wrapper">
          <Image src="/wip.jpg" alt="Flicka Screenshot" width={740} height={360} layout="responsive" />
        </a>
      </div>
    </div>

    <LoadingPopup showPopup={loadingPopup} />
    <SuccessPopup showPopup={successPopup} />
    <FailurePopup setFailPopup={setFailPopup} showPopup={failPopup} />
    <div className="anchor" id="contact" />
    <div className="contact-wrapper" ref={contactRef}>
      <h1 className="heading">Contact</h1>
      <div className="flex-wrapper">
        <div className="text-wrapper">
          <p>Fill out the form bellow and I will get back to you as soon as possible! You can also <a href="/downloads/daniel-bly-developer-cv-2023.pdf" download={'daniel-bly-developer-cv-2023.pdf'}>download a copy of my CV.</a></p>
        </div>
        <div className="form-wrapper">
          <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group w-100">
                  <input className="form-control w-100" placeholder='Name' name="name" {...register('name')} />
                  <div className="invalid-feedback">{errors.name?.message?.toString()}</div>
              </div>
              <div className="form-group">
                  <input className="form-control w-100" placeholder="Email" name="email" {...register('email')} />
                  <div className="invalid-feedback">{errors.email?.message?.toString()}</div>
              </div>
              <div className="form-group">
                  <textarea className="form-control w-100" placeholder="Message" name="message"  {...register('message')} />
                  <div className="invalid-feedback">{errors.message?.message?.toString()}</div>
              </div>
              <input className="button" type="SUBMIT" />
          </form>
        </div>
      </div>
    </div>
    <div className="footer">
      <div className="socials">
        <a href="https://www.linkedin.com/in/daniel-bly/" target="_blank">
          <Image src={`/res/linkedin.svg`} alt="LinkedIn Logo" height={25} width={25} />
        </a>
        <a href="https://www.github.com/daniel-bly" target="_blank">
          <Image src={`/res/github.svg`} alt="GitHub Logo" height={25} width={25} />
        </a>
      </div>
      <div className="copyright">
        <span>© </span>
        {`Daniel Bly ${new Date().getFullYear()}`}
      </div>
    </div>
    </div>
  )
}

export default Home
