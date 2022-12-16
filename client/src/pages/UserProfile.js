import axios from 'axios';
import { useEffect, useState } from 'react';
import { Accordion, Badge, Card } from 'react-bootstrap';
import Layout from './layout';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/profile')
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
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <p className="mb-2 h5">{user?.reports?.length}</p>
                    <p className="text-muted mb-0">Reports</p>
                  </div>
                  <div>
                    <p className="mb-2 h5">{user?.reviews?.length}</p>
                    <p className="text-muted mb-0">Reviews</p>
                  </div>
                  <div>
                    <p className="mb-2 h5">15</p>
                    <p className="text-muted mb-0">Locations</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className='col-8'>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Reviews</Accordion.Header>
                <Accordion.Body>
                  {
                    user?.reviews.map((item, index) => {
                      const { review } = item;
                      return (<Card key={review._id}>
                        <Card.Body>
                          {`${review.reviewText}`}
                          <Badge pill bg="primary" style={{ float: 'right' }}>
                            {`${review.rating}`}
                          </Badge>
                          
                        </Card.Body>
                      </Card>)
                    })
                  }
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Reports</Accordion.Header>
                <Accordion.Body>
                  {
                    user?.reports.map((item, index) => {
                      const { report } = item;
                      return (<Card key={report._id}>
                        <Card.Body>
                          {`${report.value}`}
                          <Badge pill bg="primary" style={{ float: 'right' }}>
                            {report.reportedAt}
                          </Badge>
                        </Card.Body>
                      </Card>)
                    })
                  }
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Locations</Accordion.Header>
                <Accordion.Body>
                  List of all locations added will go here
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  )
}