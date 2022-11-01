import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import './login.css';

export default function Login() {
  return (
    <div className='login-form-container'>
      <Form className='login-form'>
        <h2 style={{ 'textAlign': 'center'}}>Login to GottaGo</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <p>Don't have an account? 
          <Link to='/sign-up'>Sign Up</Link>
        </p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
