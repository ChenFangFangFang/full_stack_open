const Filter = ({ findName, handleFindName }) => (
    <div>
      find a name: 
      <input 
        value={findName}
        onChange={handleFindName}
      />
    </div>
  );

  export default Filter