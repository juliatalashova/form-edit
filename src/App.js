import React from 'react';
import * as yup from 'yup';
import useForm from './lib/useForm'

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

let profile = {
    firstName: 'Yuliia',
    lastName: 'Talashova',
    position: 'Backend developer',
    location: 'Kyiv',
    age: 29,
    bio: 'Test test textarea',
  }
function App() {
  let {form, errors, handleChange, handleSubmit} = useForm( profile, schema)

  let {firstName, lastName, position, location, age, bio, subscribe} = form


  return (
    <div className="App">
      <form autoComplete="off" className="form-edit" onSubmit={handleSubmit}>
        <div className="form-field error">
          <label>First name</label>
          <input type="text" name="firstName" onChange={handleChange}
                 value={firstName} placeholder="Enter your name"/>
          <div className="error-message">{errors.firstName}</div>
        </div>

        <div className="form-field error">
          <label>Last name</label>
          <input type="text" name="lastName" onChange={handleChange}
                 value={lastName} placeholder="Enter your last name"/>
          <div className="error-message">{errors.lastName}</div>
        </div>

        <div className="form-field error">
          <label htmlFor="age">Your age</label>
          <input type="number" name="age" onChange={handleChange}
                 value={age} placeholder="Enter your age"/>
          <div className="error-message">{errors.age}</div>
        </div>


        <label htmlFor="position">Position</label>
        <select id="position" name="position" onChange={handleChange} value={position}>
          <option>Backend developer</option>
          <option>Frontend developer</option>
          <option>QA</option>
          <option>Project Manager</option>
        </select>
        <div className="error-message">{errors.position}</div>

        <div className="form-field error">
          <label>Your location</label>
          <input type="text" name="location" onChange={handleChange}
                 value={location}/>
          <div className="error-message">{errors.location}</div>
        </div>

        <div className="form-field error">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" name="bio" onChange={handleChange}
                    placeholder="Tell a little about yourself" value={bio}></textarea>
          <div className="error-message">{errors.bio}</div>
        </div>
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
