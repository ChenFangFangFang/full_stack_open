const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson }) => (
    <form onSubmit={addPerson}>
      <div>
        Name: 
        <input 
          value={newName}
          onChange={handleNameChange} 
        />
      </div>
      <div>
        Number: 
        <input 
          value={newNumber}
          onChange={handleNumberChange} 
        />
      </div>
      <button type="submit">add</button>
    </form>
  );

  export default PersonForm