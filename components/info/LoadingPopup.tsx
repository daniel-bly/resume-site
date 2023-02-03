import ClipLoader from "react-spinners/ClipLoader"

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

export default LoadingPopup