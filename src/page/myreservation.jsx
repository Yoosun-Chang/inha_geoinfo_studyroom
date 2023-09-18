import React, { useState, useEffect } from "react";
import Top from "../component/top";
import List from "../component/myreservation/list";
import Wave from "../component/Wave";
import { useParams } from "react-router-dom";
import axios from "axios";
function Myreservation() {
  const { id } = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    axios.get(`https://geostudyroom.store/myreservation/`).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div>
      <Top />
      <List />
      <List />
      <List />
      <List />
      <List />
      <Wave />
    </div>
  );
}

export default Myreservation;
