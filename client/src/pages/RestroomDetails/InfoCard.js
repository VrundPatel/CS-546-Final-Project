import { Badge, Button, Card, Table } from "react-bootstrap";

function InfoCard(props) {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>
          <h1>{`${props.restroomData.streetAddress}, ${props.restroomData.city}, ${props.restroomData.state}, ${props.restroomData.zipCode}`}</h1>
        </Card.Title>
        <Card.Text>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Hours</td>
                <td>
                  {props.restroomData.openingHours}-
                  {props.restroomData.closingHours}
                </td>
              </tr>
              <tr>
                <td>Tags</td>
                <td>
                  {props.restroomData.tags.map((tag, idx) => {
                    return (
                      <Badge pill bg="primary">
                        {tag}
                      </Badge>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td>overallRating</td>
                <td>{props.restroomData.overallRating}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        Last updated:{" "}
        {new Date(props.restroomData.lastUpdated).toLocaleDateString()}{" "}
        <Button size="sm">Report</Button>
      </Card.Footer>
    </Card>
  );
}

export default InfoCard;
