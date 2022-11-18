import { useEffect, useState } from "react";
import * as api from '../api/endpoints';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    api.getAllRestrooms().then((res) => {
      setRestrooms(res);
    })
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            GottaGo
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        {
          restrooms.map((restroom, index) => {
            return (
              <Card key={restroom._id} style={{ width: '18rem' }}>
                <Card.Body>
                  {restroom.streetAddress}<br />
                  { restroom.city}, 
                  {restroom.state} 
                  {restroom.zipCode}
                  </Card.Body>
              </Card>
            )
          })
        }

      </div>
    </>
  )
}