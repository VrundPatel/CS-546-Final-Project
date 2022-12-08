import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import * as api from '../api/endpoints';
import axios from 'axios';
import Layout from "./layout";

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    api.getAllRestrooms().then((res) => {
      setRestrooms(res);
    });
  }, []);

	const navigate = useNavigate();

  const initialState = {
    searchTerm: ''
  };

  const [formState, setFormState] = useState(initialState);
  const { searchTerm } = formState;

  const handleOnChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const onSearchSubmit = async (event) => {
    event.preventDefault();
		console.log("searching by term");
    try {
      const { data } = await axios.post(`http://localhost:9000/search`, {
        "searchRestrooms": searchTerm
      });
			console.log('data returned ', data);
			setRestrooms(data);
    } catch (e) {
      alert('Error')
    }
  }

	const onLocationSubmit = async (event) => {
    event.preventDefault();
		console.log("searching by location");
    try {
      const { data } = await axios.get(`http://localhost:9000/search`)
			console.log('data returned ', data);
    } catch (e) {
      alert('Error')
    }
  }

  return (
    <>
      <Layout>
			<div className='form-container'>
      <Form className='custom-form' onSubmit={onSearchSubmit}>
        <h2 style={{ 'textAlign': 'center' }}>GottaGo</h2>
        <Form.Group className="mb-3" controlId="usersearchTerm">
          <Form.Label>Search</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            value={searchTerm}
            name='searchTerm'
            type="searchTerm"
            placeholder="Enter search term" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
			<Form className='custom-form' onSubmit={onLocationSubmit}>
				<Button variant="primary" type="submit">
						TODO: Closest Near Me
				</Button>
			</Form>
    </div>
				<div>
          {restrooms.filter((restroom, index) => {
						if (restrooms.amenities.toLowerCase.includes("gendered")) {
							return restroom
						}
					}).map((restroom, index) => {
            return (
              <Card key={restroom._id} style={{ width: "18rem" }}>
                <Card.Body>
                  {restroom.streetAddress}
                  <br/>
                  {restroom.city}, {restroom.state} {restroom.zipCode}
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <div>
          {restrooms.map((restroom, index) => {
            return (
              <Card key={restroom._id} style={{ width: "18rem" }}>
                <Card.Body>
                  {restroom.streetAddress}
                  <br/>
                  {restroom.city}, {restroom.state} {restroom.zipCode}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
