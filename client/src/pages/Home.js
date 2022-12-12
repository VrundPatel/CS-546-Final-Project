import { useEffect, useState } from "react";
import { Card, Button, Form, Col, Row, ToggleButton, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../api/endpoints";
import axios from "axios";
import Layout from "./layout";

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);
	const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  // useEffect(() => {
  //   api.getAllRestrooms().then((res) => {
  //     setRestrooms(res);
  //   });
  // }, []);

  const navigate = useNavigate();

  const initialState = {
    searchTerm: '',
    checked: 1,
    deviceLat: '',
    deviceLong: '',
    activeFilters: []
  };

  
  const [genderNeutralCheckState, setGenderNeutralCheckState] = useState(false);
  const [adaCheckState, setAdaCheckState] = useState(false);
  const [stationCheckState, setStationCheckState] = useState(false);
  const [buyCheckState, setBuyCheckState] = useState(false);
  const [keyCheckState, setKeyCheckState] = useState(false);
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
        (position) => {
					console.log(position);
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
		// GET request with device coordinates
		try {
      const { data } = await axios.get(`http://localhost:9000/search/${lat}/${lng}`);
      setRestrooms(data);
    } catch (e) {
      alert('Error')
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
    return filteredRestroom;
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
                <Button variant="primary" type="submit" disabled={!searchTerm}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
					<div className='location-button-container'>
						<Button className = 'location-button' variant="primary" type="submit" onClick = {onLocationSubmit}>
								Search Near Me
						</Button>
					</div>
        </div>

        <div className='filter-container'>
          <Form className='filter-form' onSubmit={onSearchSubmit}>
              <Form.Label>Filters</Form.Label>
              <br/>
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
                  }}
                  disabled = {!activeFilters.filter(Boolean).length}
                >
                  Reset
                </ToggleButton>
          </Form>
        </div>

        {/* Search Results with variable preprocesser filtering*/}
        <div>
          <h2>{filteredRestrooms.length} Result{filteredRestrooms.length != 1 ? "s": ""}</h2>
          {filteredRestrooms.map((outputRestroom, index) => {
            return (
              <Card key={outputRestroom._id} style={{ width: "24rem" }}>
                <Card.Body>
                  <h3>{index + 1}</h3>
                  {outputRestroom.streetAddress}
                  <br/>
                  {outputRestroom.city}, {outputRestroom.state} {outputRestroom.zipCode}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
