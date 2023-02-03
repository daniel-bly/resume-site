import Image from 'next/image'

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

export default SuccessPopup