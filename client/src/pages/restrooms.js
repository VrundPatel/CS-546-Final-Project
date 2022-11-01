import { useEffect, useState } from "react";
import * as api from '../api/endpoints';

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    api.getAllRestrooms().then((res) => {
      setRestrooms(res);
    })
  }, []);

  return (
    <>
      <h1>Restrooms</h1>
      <div>{JSON.stringify(restrooms)}</div>
    </>
  )
}