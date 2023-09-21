import React from "react";
import Calendar from "../component/admin/calendar"
import Roombtn from "../component/admin/roombtn"
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;


function Admin() {
    return (
        <div>
            <Calendar/>
            <Container>
            <Roombtn/>
            </Container>
        </div>
    );
}

export default Admin;
