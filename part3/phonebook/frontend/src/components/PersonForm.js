const PersonForm = ({valueName, valueNumber, handleName, handleNumber, click}) => {
    return(
        <form>
            <div>
            name: <input value={valueName} onChange={handleName} />
            </div>
            <div>
            number: <input value={valueNumber} onChange={handleNumber} />
            </div>
            <div>
            <button type="submit" onClick={click} >add</button>
            </div>
        </form>
    )
}

export default PersonForm