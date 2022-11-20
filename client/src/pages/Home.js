import { useEffect, useState } from "react";
import * as api from "../api/endpoints";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

let restroomsTest = [
  {
    _id: "This is ID",
    streetAddress: "100 Street St",
    city: "Jersey City",
    state: "NJ",
    zipCode: "07777",
  },
  {
    _id: "55555512312",
    streetAddress: "23 Elm street",
    city: "NYC",
    state: "NY",
    zipCode: "05556",
  },
  {
    _id: "444211123123312",
    streetAddress: "22222222 park street",
    city: "Hoboken",
    state: "NJ",
    zipCode: "01126",
  },
];

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    api.getAllRestrooms().then((res) => {
      setRestrooms(res);
    });
    setRestrooms(restroomsTest);
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">GottaGo</Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        {restrooms.map((restroom, index) => {
          return (
            <Container>
              <Card
                key={restroom._id}
                onClick={() => onClickListener()}
                style={{ width: "18rem" }}
              >
                <Card.Body>
                  {restroom.streetAddress}
                  <br />
                  {restroom.city},{restroom.state}
                  {restroom.zipCode}
                </Card.Body>
              </Card>
            </Container>
          );
        })}
      </div>
    </>
  );

  function onClickListener() {
    console.log("CLICK");
  }
}
