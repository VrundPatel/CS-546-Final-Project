import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import './login.css';
import axios from 'axios';

export default function SignUp() {
  const initialState = {
    fullName: '',
    email: '',
    password: ''
  };

  const [formState, setFormState] = useState(initialState);
  const { fullName, email, password } = formState;

  const handleOnChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form state ', formState);
    setFormState(initialState);
    const { data } = await axios.post('http://localhost:9000/users', formState);
  }

  return (
    <div className='form-container'>
      <Form className='custom-form' onSubmit={handleSubmit}>
        <h2 style={{ 'textAlign': 'center' }}>SignUp for GottaGo</h2>

        <Form.Group className="mb-3" controlId="userFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            value={fullName}
            name='fullName'
            type="text"
            placeholder="Enter full name" />
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
  );
}
