import { useCallback, useState, useEffect, useRef, LegacyRef, RefObject, MutableRefObject } from 'react'
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

import Header from '../components/Header'
import CustomAccordion from '../components/CustomAccordion'
import Skill from '../components/Skill'
import { FailurePopup, SuccessPopup, InfoPopup, LoadingPopup } from '../components/info'

import styles from '../styles/Home.module.css'

const options: any = {
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

  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLElement>();
  const contactRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState('home');

  const handleScroll = () => {
    if(!aboutRef.current || !projectsRef.current || !contactRef.current) return setActive('home');

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

  const [isAnimComplete, setAnimComplete] = useState(false);

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
              .typeString('<span>Hi, I\'m <span style="color: #ffd400;">Dan</span></span>')
              .pauseFor(500)
              .typeString("<br/><span>Full-Stack Dev &<br/> Technical Lead</span>")
              .callFunction(() => setAnimComplete(true))
              .start()
          }} />
          </div>
      </div>  
      <div className="button-wrapper">
        <a href="https://www.linkedin.com/in/daniel-bly/" target='_blank' rel="noreferrer">
          LinkedIn
        </a>
        <a href="#contact">
          Get In Touch
          <Image src="/res/down.svg" alt="Cross" width={15} height={15} />
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
          <p>Fill out the form bellow and I will get back to you as soon as possible! {/* You can also <a href="/downloads/daniel-bly-developer-cv-2023.pdf" download={'daniel-bly-developer-cv-2023.pdf'}>download a copy of my CV.</a> */}</p>
        </div>
        <div className="form-wrapper">
          <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group w-100">
                  <input className="form-control w-100" placeholder='Name' {...register('name')} />
                  <div className="invalid-feedback">{errors.name?.message?.toString()}</div>
              </div>
              <div className="form-group">
                  <input className="form-control w-100" placeholder="Email" {...register('email')} />
                  <div className="invalid-feedback">{errors.email?.message?.toString()}</div>
              </div>
              <div className="form-group">
                  <textarea className="form-control w-100" placeholder="Message" {...register('message')} />
                  <div className="invalid-feedback">{errors.message?.message?.toString()}</div>
              </div>
              <input className="button" type="SUBMIT" />
          </form>
        </div>
      </div>
    </div>
    <div className="footer">
      <div className="socials">
        <a href="https://www.linkedin.com/in/daniel-bly/" target="_blank" rel="noreferrer">
          <Image src={`/res/linkedin.svg`} alt="LinkedIn Logo" height={25} width={25} />
        </a>
        <a href="https://www.github.com/daniel-bly" target="_blank" rel="noreferrer">
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
