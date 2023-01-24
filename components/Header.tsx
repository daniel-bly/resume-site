const Header = ({active}: {active: string}) => {
    return (
        <div className="nav" style={{color: 'white'}}>
          <div className="options">
            <a className={active == "home" ? "active" : ""} href="#home">Home</a>
            <a className={active == "about" ? "active" : ""} href="#about">About</a>
            <a className={active == "projects" ? "active" : ""} href="#projects">Projects</a>
            <a className={active == "contact" ? "active" : ""} href="#contact">Contact</a>
          </div>
        </div>
    )
}

export default Header