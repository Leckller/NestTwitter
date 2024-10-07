function EditProfile() {
  return (
    <div className="hd">
      <label>
        <h2>Cor de fundo</h2>
        <input type="color" />
      </label>
      <label>
        <h2>Cor do texto</h2>
        <input type="color" />
      </label>
    </div>
  );
}

export default EditProfile;
