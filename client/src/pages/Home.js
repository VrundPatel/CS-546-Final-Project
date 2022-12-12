import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link, useNavigate } from "react-router-dom";
import * as api from "../api/endpoints";
import axios from "axios";
import Layout from "./layout";

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    api.getAllRestrooms().then((res) => {
      setRestrooms(res);
    });
  }, []);

  const navigate = useNavigate();

  const initialState = {
    searchTerm: '',
    checked: 1,
    deviceLat: '',
    deviceLong: ''
  };

  const [adaCheckState, setAdaCheckState] = useState(false);
  const [genderNeutralCheckState, setGenderNeutralCheckState] = useState(false);
  const [stationCheckState, setStationCheckState] = useState(false);
  const [keyCheckState, setKeyCheckState] = useState(false);
  const [ampleCheckState, setAmpleCheckState] = useState(false);
  const [noTouchCheckState, setNoTouchCheckState] = useState(false);
  const [seatCoversCheckState, setSeatCoversCheckState] = useState(false);
  const [resetCheckState, setResetCheckState] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [deviceLat, deviceLong] = useState(initialState);
  const { searchTerm } = formState;

  const handleOnChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSearchSubmit = async (event) => {
    event.preventDefault();
		console.log("searching by term");
    try {
      const { data } = await axios.post(`http://localhost:9000/search`, {
        "searchRestrooms": searchTerm
      });
      setRestrooms(data);
      // if (!!data) {
      //   console.log('data returned ', data);
      //   const foundRestroom = await compare(searchTerm, data.streetAddress);
      //   if (foundRestroom) {
      //     setRestrooms(data);
      //   }
      //   else {
      //     alert(`Not Found! No such a restroom`);
      //   }
      // }
    } catch (e) {
      alert('Error')
    }
  }

  const onLocationSubmit = async (event) => {
    event.preventDefault();
    console.log("searching by device location");
    // Fetch device location
    if (!navigator.geolocation) {
      setStatus("Can't get location, try a different browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);

          try {
            const { data } = await axios.get(`http://localhost:9000/search/${position.coords.latitude}/${position.coords.longitude}`);
            setRestrooms(data);
          } catch (e) {
            alert('Error')
          }
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }

  const activeFilters = [genderNeutralCheckState, adaCheckState, stationCheckState, buyCheckState, keyCheckState];

  const filteredRestrooms = restrooms.filter(filteredRestroom => {
    if (genderNeutralCheckState && !filteredRestroom.tags.includes("Gender-neutral")) {
      return false;
    }
    if (adaCheckState && !filteredRestroom.tags.includes("ADA compliant")) {
      return false;
    }
    if (stationCheckState && !filteredRestroom.tags.includes("Baby-changing")) {
      return false;
    }
    if (buyCheckState && !filteredRestroom.tags.includes("Gotta buy something")) {
      return false;
    }
    if (keyCheckState && !filteredRestroom.tags.includes("Ask for key")) {
      return false;
    }
    if (ampleCheckState && !filteredRestroom.tags.includes("Ample stalls")) {
      return false;
    }
    if (noTouchCheckState && !filteredRestroom.tags.includes("No-touch")) {
      return false;
    }
    if (seatCoversCheckState && !filteredRestroom.tags.includes("Seat covers")) {
      return false;
    }
    return filteredRestrooms;
  });

  return (
    <>
      <Layout>
        <div className='search-bar-container'>
          <Form className='search-form' onSubmit={onSearchSubmit}>
            <h2 style={{ 'textAlign': 'center' }}>GottaGo</h2>
            <Row className="mb-3">
              <Form.Label>Search</Form.Label>
              <Col>
                <Form.Control
                  onChange={handleOnChange}
                  value={searchTerm}
                  name="searchTerm"
                  type="searchTerm"
                  placeholder="Enter search term" />
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
            <div className='location-button-container'>
              <Button className = 'location-button' variant="primary" type="submit">
                  TODO: Closest Near Me
              </Button>
            </div>
          </Form>
        </div>

        <div className='filter-container'>
          <Form className='filter-form' onSubmit={onSearchSubmit}>
            <Form.Label>Filters</Form.Label>
            <br />
            <ToggleButton
              id="gender-neutral-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={genderNeutralCheckState}
              value="1"
              onChange={(e) => {
                setGenderNeutralCheckState(e.currentTarget.checked);
              }}
            >
              Gender-neutral
            </ToggleButton>
            {" "}
            <ToggleButton
              id="ada-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={adaCheckState}
              value="1"
              onChange={(e) => {
                setAdaCheckState(e.currentTarget.checked);
              }}
            >
              ADA compliant
            </ToggleButton>
            {" "}
            <ToggleButton
              id="station-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={stationCheckState}
              value="1"
              onChange={(e) => {
                setStationCheckState(e.currentTarget.checked);
              }}
            >
              Baby-Changing Station
            </ToggleButton>
            {" "}
            <ToggleButton
              id="buy-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={buyCheckState}
              value="1"
              onChange={(e) => {
                setBuyCheckState(e.currentTarget.checked);
              }}
            >
              Gotta Buy Something
            </ToggleButton>
            {" "}
            <ToggleButton
              id="key-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={keyCheckState}
              value="1"
              onChange={(e) => {
                setKeyCheckState(e.currentTarget.checked);
              }}
            >
              Ask For Key
            </ToggleButton>
            {" "}
            <ToggleButton
              id="ample-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={ampleCheckState}
              value="1"
              onChange={(e) => {
                setAmpleCheckState(e.currentTarget.checked);
              }}
            >
              Ample stalls
            </ToggleButton>
            {" "}
            <ToggleButton
              id="no-touch-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={noTouchCheckState}
              value="1"
              onChange={(e) => {
                setNoTouchCheckState(e.currentTarget.checked);
              }}
            >
              No-touch
            </ToggleButton>
            {" "}
            <ToggleButton
              id="seat-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={seatCoversCheckState}
              value="1"
              onChange={(e) => {
                setSeatCoversCheckState(e.currentTarget.checked);
              }}
            >
              Seat covers
            </ToggleButton>
            {" "}
            <ToggleButton
              id="reset-toggle-check"
              type="checkbox"
              variant="secondary"
              checked={resetCheckState}
              value="1"
              onChange={() => {
                setGenderNeutralCheckState(false);
                setAdaCheckState(false);
                setStationCheckState(false);
                setBuyCheckState(false);
                setKeyCheckState(false);
                setAmpleCheckState(false);
                setNoTouchCheckState(false);
                setSeatCoversCheckState(false);
              }}
              disabled={!activeFilters.filter(Boolean).length}
            >
              Reset
            </ToggleButton>
          </Form>
        </div>

        {/* Search Results with preprocessing filter*/}
        <div>
          <h2> Results </h2>
          {restrooms.map((restroom, index) => {
            return (
              <Card key={restroom._id} style={{ width: "18rem" }}>
                <Card.Body>
                  {restroom.streetAddress}
                  <br />
                  {restroom.city},{restroom.state}
                  {restroom.zipCode}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
