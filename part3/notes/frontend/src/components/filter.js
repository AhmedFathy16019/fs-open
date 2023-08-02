const Filter = ({value, handleValue}) => {
    return(
        <div>
            find countries  <input value={value} onChange={handleValue}/>
        </div>
    )
}

export default Filter;