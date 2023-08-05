const Notification = ({isError, message}) => {
    if (message === null) {
        return null
    }

    if (isError) {
        return (
            <div className="error">
                {message}
            </div>
        )
    } else {
        return (
            <div className="message">
                {message}
            </div>
        )
    }
}

export default Notification