import Image from "next/image"

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

export default FailurePopup