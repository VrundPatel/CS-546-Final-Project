import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Layout(props) {

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            GottaGo
          </Navbar.Brand>
        </Container>
      </Navbar>
      {props.children}
    </>
  )
}