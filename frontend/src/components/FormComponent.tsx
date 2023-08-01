import "./FormComponent.css";

const Formcomponent = () => {
  return (
    <div>
      <form>
        <div className="">
          <label className="form-label">Student Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="">
          <label className="form-label">Student Age</label>
          <input name="age" type="text" className="form-control" />
        </div>
        <div className="">
          <label className="form-label">Student Avatar</label>
          <input name="avatar" type="file" className="form-control" />
          <img
            id="avatar_preview"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginTop: "10px",
            }}
            alt="Avatar Preview"
          />
        </div>
        <div className="">
          <label className="form-label">Student Class</label>
          <input name="class" type="text" className="form-control" />
        </div>
        <input type="text" hidden className="form-control" />
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default Formcomponent;
