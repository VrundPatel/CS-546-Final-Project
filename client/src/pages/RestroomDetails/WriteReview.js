import { Fragment, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

function WriteReview() {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      //Post to rating endpoint
      console.log("Submit");
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeRating = (e) => {
    setRating(e.target.value);
  };

  const onChangeComments = (e) => {
    setComments(e.target.value);
  };

  return (
    <Fragment>
      <Card className="text-center">
        <Card.Header as="h5">Write a review</Card.Header>
        <Card.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Rating</Form.Label>
              <Form.Select onChange={onChangeRating}>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                onChange={onChangeComments}
                as="textarea"
                rows="7"
                placeholder="Write here!"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default WriteReview;
