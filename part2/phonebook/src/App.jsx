import { useState, useEffect} from 'react'
import personService from './services/person'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import FilterPerson from './components/FilterPerson';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [findName, setFindName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);


  useEffect(()=> {
    personService
      .getAll()
      .then(initialName => {
        setPersons(initialName)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFindName = (event) => {
    setFindName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      phone: newNumber
    };
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook， replace the old number with a new one?`)){
        personService
          .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setNotificationMessage(`Updated ${returnedPerson.name}`);
            setNotificationType('update');
            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationType(null);
            }, 5000);
            
          });
      }
      
    } else{
       personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('');
        setNotificationMessage(`${returnedPerson.name} added`);
        setNotificationType('success');
            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationType(null);
            }, 5000);
      })
    }
    
   
  }

  const deletePerson = (id) => {
  
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(()=> {
          setPersons(persons.filter(p => p.id !== id))
          setNotificationMessage(`Deleted ${person.name}`);
          setNotificationType('delete');
        setTimeout(() => {
          setNotificationMessage(null);
          setNotificationType(null);
        }, 5000);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter findName={findName} handleFindName={handleFindName} />
      <h2>Add a new phonebook</h2>
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
      />
      <h2>Numbers</h2>
        <FilterPerson persons={persons} findName={findName} deletePerson={deletePerson}/>
    </div>
  );
};


export default App