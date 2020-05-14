import React, {useState} from 'react';
import * as yup from 'yup';


let schema = yup.object().shape({
  firstName: yup.string('test').required('First name is required').ensure(),
  lastName: yup.string().required('Last name is required').ensure(),
  age: yup
    .number()
    .required('Age is required')
    .positive()
    .integer(),
  location: yup.string().required('Location is required').ensure(),
  position: yup.string().required('position is required').ensure(),
  bio: yup.string().required('Bio is required').ensure(),
});

function App() {
  let profile = {
    firstName: 'Yuliia',
    lastName: 'Talashova',
    position: 'Backend developer',
    location: 'Kyiv',
    age: 29,
    bio: 'Test test textarea',
  }
  let [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    position: profile.position,
    location: profile.location,
    age: String(profile.age),
    bio: profile.bio,
    subscribe: true,
  })
  let [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    position: '',
    age: '',
    bio: ''
  })

  function handleChange(event) {
    let {name, type, checked, value, selected} = event.target
    value = type === 'checkbox' ? checked : (selected || value)
    setForm({...form, [name]: value})
    schema.validateAt(name, {[name]: value})
      .then(_=> {
        setErrors({...errors, [name]: ""})
      })
      .catch(err => {
        setErrors({...errors, [name]: err.errors.join()})
      })
  }

  function handleSubmit(event) {
    event.preventDefault();
    schema.validate(form, {abortEarly: false})
      .then(_ => setErrors({}))
      .catch(errors => {
        if (errors.inner) {
          return errors.inner.reduce((z, item) => {
          let name = (item.path || "").includes(".")
             ? item.path.split(".")[0]
             : item.path || ""
          return z[item.path || ""] ? z : {...z, [name]: item.message}}, {})
            } else {
                throw errors
            }
      })
  }
  let {firstName, lastName, position, location, age, bio, subscribe} = form


  return (
    <div className="App">
      <form autoComplete="off" className="form-edit" onSubmit={handleSubmit}>
        <label>First name</label>
        <input type="text" name="firstName" onChange={handleChange}
               value={firstName} placeholder="Enter your name"/>
        <div className="err">{errors.firstName}</div>
        <label>Last name</label>
        <input type="text" name="lastName" onChange={handleChange}
               value={lastName} placeholder="Enter your last name"/>
        <div className="err">{errors.lastName}</div>

        <label htmlFor="age">Your age</label>
        <input type="number" name="age" onChange={handleChange}
               value={age} placeholder="Enter your age"/>
        <div className="err">{errors.age}</div>


        <label htmlFor="position">Position</label>
        <select id="position" name="position" onChange={handleChange} value={position}>
          <option>Backend developer</option>
          <option>Frontend developer</option>
          <option>QA</option>
          <option>Project Manager</option>
        </select>
        <div className="err">{errors.position}</div>

        <label>Your location</label>
        <input type="text" name="location" onChange={handleChange}
               value={location}/>
        <div className="err">{errors.location}</div>

        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" onChange={handleChange}
                  placeholder="Tell a little about yourself" value={bio}></textarea>
        <div className="err">{errors.bio}</div>
        <label>
          <input type="checkbox" name="subscribe" onChange={handleChange}
                checked={subscribe}/>
          <span>Subscribe for newsletter</span>
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default App;
