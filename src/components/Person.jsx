const Person = ({ person, onClick }) => {
    return (
        <p>{person.name} {person.number} <button id={person.id} onClick={onClick}>delete</button></p>
    )
}

export default Person