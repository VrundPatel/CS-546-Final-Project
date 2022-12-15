import axios from "axios";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import AddRestroomButton from "./AddRestroomModal/AddRestroomButton";
import "./layout.css";
import { useCookies } from 'react-cookie';

export default function Layout(props) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);

  const onLogout = async () => {
    const { data } = await axios.post('http://localhost:9000/users/logout');
    removeCookie('auth');
    navigate('/login');
  }

  return (
    <>
      <Navbar className="navBar" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">GottaGo</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <AddRestroomButton />

            <Button className="mx-2" variant="secondary" onClick={() => navigate('/user')}>
              Profile
            </Button>
            
            <Button className="mx-2"variant="primary" onClick={() => onLogout()}>
              Logout
            </Button>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </>
  );
}
