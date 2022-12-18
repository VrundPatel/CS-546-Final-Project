import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { checkFullname, checkCity, checkState, checkEmail, checkPassword } from '../validator';
import './login.css';

export default function SignUp() {
  const navigate = useNavigate();

  const initialState = {
    fullName: '',
    city: '',
    state: '',
    email: '',
    password: ''
  };

  const [formState, setFormState] = useState(initialState);
  const { fullName, city, state, email, password } = formState;

  const handleOnChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:9000/users', {
        ...formState,
      });
      setFormState(initialState);
      if (!!data) {
        navigate('/home');
      }
    } catch (e) {
      alert('User already exits')
    }
    try {
      checkFullname(fullName)
    }
    catch (e) {
      alert('Please Type in a valid fullname')
    }
    try {
      checkCity(city)
    }
    catch (e) {
      alert('Please Type in a valid city')
    }
    try {
      checkState(state)
    }
    catch (e) {
      alert('Please Type in a valid State')
    }
    try {
      checkEmail(email)
    }
    catch (e) {
      alert('Please Type in a valid email')
    }
    try {
      checkPassword(password)
    }
    catch (e) {
      alert('Please Type in a valid password')
    }
  }

  return (
    <div className='form-container'>
      <Form className='custom-form' onSubmit={handleSubmit}>
        <h2 style={{ 'textAlign': 'center' }}>SignUp for GottaGo</h2>

        <Form.Group className="mb-3" controlId="userFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            value = {fullName}
            name='fullName'
            type="text"
            placeholder="Enter full name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            value={city}
            name='city'
            type="text"
            placeholder="City" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userState">
          <Form.Label>State</Form.Label>
          <ul>
            <li>Please input state abbreviation(NY, NJ, FL, etc)</li>
          </ul>
          <Form.Control
            onChange={handleOnChange}
            value={state}
            name='state'
            type="text"
            placeholder="State" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            value={email}
            name='email'
            type="email"
            placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <ul>
            <li>No empty spaces and no spaces</li>
            <li>At least 6 characters long</li>
            <li>At least 1 uppercase character</li>
            <li>At least 1 number</li>
            <li>At least 1 special character(@, $, %, etc)</li>
          </ul>
          <Form.Control
            onChange={handleOnChange}
            value={password}
            name='password'
            type="password"
            placeholder="Password" />
        </Form.Group>

        <p>Already have an account?
          <Link to='/login'>Login</Link>
        </p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
