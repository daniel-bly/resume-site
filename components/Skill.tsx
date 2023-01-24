import Image from 'next/image'

const Skill = ({logo, alt, text, scale = 1, invert = false}: { logo: string, alt: string, text: string, scale?: number, invert?: boolean}) => {
    const baseScale = 70
  
    return (
      <div className={invert ? "skill inverted" : "skill"}>
        <Image src={`/skills/${logo}`} alt={alt} height={baseScale * scale} width={baseScale * scale} />
        <span>{text}</span>
      </div>
    )
}

export default Skill