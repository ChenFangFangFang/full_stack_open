const FilterPerson = ({persons, findName,deletePerson}) => {
    const newList = persons.filter((person) => person.name.toLowerCase().includes(findName.toLowerCase()))
    return (
      <ul>
        {newList.map(person => (
          <li key={person.id} >
            {person.name} {person.phone}
            <button onClick={()=> deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    )
  }

export default FilterPerson