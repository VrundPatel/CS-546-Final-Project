import { Button, Card, ListGroup, ListGroupItem, Table } from "react-bootstrap";

function InfoCard(props) {
  return (
    <Card className="text-center">
      {/* <Card.Header>Featured</Card.Header> */}
      <Card.Body>
        <Card.Title>{`${props.street}, ${props.city}, ${props.state}, ${props.zipCode}`}</Card.Title>
        <Card.Text>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Hours</td>
                <td>
                  {props.open}-{props.close}
                </td>
              </tr>
              <tr>
                <td>availability</td>
                <td>avail</td>
              </tr>
              <tr>
                <td>amenities</td>
                <td>amen</td>
              </tr>
              <tr>
                <td>overallRating</td>
                <td>{props.overallRating}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        Last updated: 2 days ago <Button size="sm">Report</Button>
      </Card.Footer>
    </Card>
  );
}

export default InfoCard;
