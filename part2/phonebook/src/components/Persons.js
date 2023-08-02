const Persons = ({persons, handleClick}) => {
    return(
        persons
            .map(person => 
                <Person 
                key={person.id}
                id={person.id}
                name={person.name}
                number={person.number}
                handleClick={handleClick}/>)
    )
}

const Person = ({id, name, number, handleClick}) => {
    return(
        <>
            <div>
                {name} {number}
                <button onClick={(event) => handleClick(event, id)}> Delete </button>
            </div>
        </>
    )
}

export default Persons