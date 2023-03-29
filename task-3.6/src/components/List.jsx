const List = ({ title, data, onChange, onAdd, onSave }) => {
  return (
    <section className="section">
      <h2>{title}</h2>
      {data.map((user, index) => (
        <div key={index}>
          <input value={user} onChange={(e) => onChange(e, index)} />
        </div>
      ))}
      <div className="btn-container">
        <button onClick={onAdd}>Add new</button>
        <button onClick={onSave}>Save</button>
      </div>
    </section>
  );
};

export default List;
