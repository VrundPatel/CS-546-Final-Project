import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Layout from './layout';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/users')
      .then(({ data }) => {
        console.log('user returned ', data);
        setUser(data.user);
      })
      .catch();
  }, [])

  return (
    <Layout>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-4'>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" />
              <Card.Body>
                <Card.Title>{user?.fullName}</Card.Title>
                <Card.Text>
                 {user?.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className='col-8'>8</div>
        </div>
      </div>
    </Layout>
  )
}