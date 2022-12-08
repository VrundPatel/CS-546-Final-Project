import { useRef, useState } from "react";
import { Button, Form, Row, Col, ProgressBar } from "react-bootstrap";
import CityGroup from "./CityGroup";
import StreetAddressGroup from "./StreetAddressGroup";
import StateGroup from "./StateGroup";
import ZipGroup from "./ZipGroup";
import { propTypes } from "react-bootstrap/esm/Image";

const states = {
  AL: "Alabama",
  AK: "Alaska",
  AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

function RestroomAddress(props) {
  const [streetValid, setStreetValid] = useState(false);
  const [cityValid, setCityValid] = useState(false);
  const [stateValid, setStateValid] = useState(false);
  const [zipValid, setZipValid] = useState(false);

  function onNext() {
    props.nextStep(props.step + 1);
  }

  function onPrev() {
    props.nextStep(props.step - 1);
  }

  return (
    <Form noValidate>
      <Row className="mb-3">
        <StreetAddressGroup
          populate={props.populate}
          obj={props.obj}
          validCB={setStreetValid}
        />
      </Row>
      <Row className="mb-3">
        <CityGroup
          populate={props.populate}
          obj={props.obj}
          validCB={setCityValid}
        />
        <StateGroup
          populate={props.populate}
          obj={props.obj}
          validCB={setStateValid}
          states={states}
        />
        <ZipGroup
          populate={props.populate}
          obj={props.obj}
          validCB={setZipValid}
        />
      </Row>
      <Row>
        <Col>
          <Button
            onClick={onNext}
            disabled={
              streetValid && cityValid && stateValid && zipValid ? false : true
            }
          >
            Next
          </Button>
        </Col>
        <Col>
          <Button onClick={onPrev} disabled={props.step === 1 ? true : false}>
            Prev
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default RestroomAddress;
