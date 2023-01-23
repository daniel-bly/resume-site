import { useCallback, useState } from 'react'
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

import CustomAccordion from '../components/CustomAccordion'

import styles from '../styles/Home.module.css'

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

const Skill = ({logo, alt, text, scale = 1, invert = false}: { logo: string, alt: string, text: string, scale?: number, invert?: boolean}) => {
  const baseScale = 70

  return (
    <div className={invert ? "skill inverted" : "skill"}>
      <Image src={`/skills/${logo}`} alt={alt} height={baseScale * scale} width={baseScale * scale} />
      <span>{text}</span>
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

  const onSubmit = async (data: object) => {
    console.log(data)
  }

  const addGitHubColaborator = async (repo: string) => {
    const password = prompt('This repository includes proprietary code. Please enter the password:')
    if(!password) return
    const username = prompt('Enter your GitHub username:')
    if(!username) return
    const result = await axios.put(process.env.NEXT_PUBLIC_BASE_PATH + '/api/add-github-colaborator', { repo: repo, username: username, pass: password })

    if(result.status === 201) {
      window.alert("You have successfully been added to the repository. Please check your GitHub account.")
    } else if (result.status === 401) {
      window.alert("The password you entered was incorrect. Please try again.")
    } else {
      window.alert(result.data.message)
    }
  }

  const [exapanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  }


  return (
    <div style={{backgroundColor: 'black'}}>
    <div className="landing-wrapper" style={{height: '100vh'}}>
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={options} canvasClassName="particlesCanvas" />
      <div className={styles.typewriter_wrapper} style={{zIndex: 1000}}>
        <div style={{height: 138, width: '80%'}}>
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
    </div>
    {/* <div className={styles.background_particles} >
      <Particles id="tsparticles2" init={particlesInit} loaded={particlesLoaded} options={options} canvasClassName="particlesCanvas" />
    </div> */}
    <div className="about-wrapper">
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
            <Skill logo="jest.svg" alt="Jest logo" text="Jest JS" />
          </CustomAccordion>
        </div>
      </div>
    </div>
    <div className="projects-wrapper">
      <h1 className="heading">Projects</h1>
      <div className="project">
        <div className="image-wrapper">
          <Image src="/commuter-v2-site-capture.JPG" alt="Commuter v2 Screenshot" width={740} height={360} layout="responsive" />
        </div>
        <div className="text-wrapper">
          <h2>Commuter v2</h2>
          <p>Full stack application created with PHP7 and Laravel designed to refresh Skycity’s outdated fleet management system.</p>
          <a href="" target="_blank"><div className="link-button">LIVE APP</div></a>
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
        <div className="image-wrapper">
          <Image src="/flicka-site-capture.JPG" alt="Flicka Screenshot" width={740} height={360} layout="responsive" />
        </div>
      </div>
      <div className="project">
        <div className="image-wrapper">
          <Image src="/dataset-site-capture.JPG" alt="Dataset Screenshot" width={740} height={360} layout="responsive" />
        </div>
        <div className="text-wrapper">
          <h2>Dataset (Beta)</h2>
          <p>A social media application designed to aid in the discovery of up-and-coming electronic music artists. Created using Next.js and Express.js with a Neo4j graph database and AWS S3 file storage.</p>
          <a href="https://beta.dataset.co.nz" target="_blank"><div className="link-button">LIVE APP</div></a>
          <a onClick={() => addGitHubColaborator('dataset')}><div className="link-button">VIEW CODE</div></a>
        </div>
      </div>
      <div className="project inverted">
        <div className="text-wrapper">
          <h2>Commuter v3 (WIP)</h2>
          <p>I am currently developing Commuter v3 in partnership with it’s owner as modular cooperate booking software. It is being created in Typescript with a Nest.js backend running a MongoDB database and will implement a Next.js frontend.</p>
          <a href="" target="_blank"><div className="link-button">LIVE APP</div></a>
          <a onClick={() => addGitHubColaborator('commute-v3')}><div className="link-button">VIEW CODE</div></a>
        </div>
        <div className="image-wrapper">
          <Image src="/wip.jpg" alt="Flicka Screenshot" width={740} height={360} layout="responsive" />
        </div>
      </div>
    </div>
    <div className="contact-wrapper">
      <h1 className="heading">Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
              <input className="form-control w-100" placeholder='Name' name="name" {...register('name')} />
              <div className="invalid-feedback">{errors.fname?.message?.toString()}</div>
          </div>
          <div className="form-group">
              <input className="form-control w-100" placeholder="Email" name="email" {...register('email')} />
              <div className="invalid-feedback">{errors.email?.message?.toString()}</div>
          </div>
          <div className="form-group">
              <textarea className="form-control w-100" placeholder="Message" name="message"  {...register('message')} />
              <div className="invalid-feedback">{errors.confirm_password?.message?.toString()}</div>
          </div>
          <input className="button" type="submit" />
      </form>
    </div>
    </div>
  )
}

export default Home
