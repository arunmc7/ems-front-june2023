import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand className="fw-bolder text-light">

            <Link to={'/'} style={{textDecoration:'none'}}>
              <i style={{color:'white'}} class="fa-solid fa-layer-group me-2"></i>
              <span style={{color:'white'}}>EMS-APPLICATION</span>
            </Link>

          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
