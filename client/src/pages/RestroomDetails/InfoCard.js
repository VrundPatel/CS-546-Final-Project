import { Badge, Button, Card, Table } from "react-bootstrap";
import axios from "axios";

function InfoCard(props) {
  console.log(props);
  const { onReport } = props;
  const {
    _id: id,
    streetAddress,
    city,
    state,
    zipCode,
    openingHours,
    closingHours,
    tags,
    overallRating,
    lastUpdated
  } = props.restroomData;

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>
          <h1>{`${streetAddress}, ${city}, ${state}, ${zipCode}`}</h1> <br />
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${streetAddress}`}>Navigate</a>
        </Card.Title>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Hours</td>
              <td>
                {openingHours}-
                {closingHours}
              </td>
            </tr>
            <tr>
              <td>Tags</td>
              <td>
                {tags.map((tag, idx) => {
                  return (
                    <Badge pill bg="primary" key={tag}>
                      {tag}
                    </Badge>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td>overallRating</td>
              <td>{overallRating}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="text-muted">
        Last updated:{" "}
        {new Date(lastUpdated).toLocaleDateString()}{" "}
        <Button size="sm" onClick={onReport}>Report</Button>
      </Card.Footer>
    </Card>
  );
}

export default InfoCard;
