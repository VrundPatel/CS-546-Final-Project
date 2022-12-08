import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import AddRestroomButton from "./AddRestroomModal/AddRestroomButton";

export default function Layout(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">GottaGo</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <AddRestroomButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </>
  );
}
