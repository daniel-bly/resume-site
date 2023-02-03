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

export default InfoPopup