import { useEffect, useState } from "react";
import * as api from '../api/endpoints';
import Card from 'react-bootstrap/Card';

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    api.getAllRestrooms().then((res) => {
      setRestrooms(res);
    })
  }, []);

  return (
    <>
      <h1>Restrooms</h1>
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