import React, {useState} from 'react';

export default function useForm(profile, schema) {
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

  return {form, errors, handleChange, handleSubmit}
}
