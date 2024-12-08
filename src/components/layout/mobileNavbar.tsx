import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const MobileNavbar: React.FC = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <Navbar expand="md" className="bg-body-tertiary d-md-none" fixed="top">
      <Container>
        <Navbar.Brand onClick={() => window.location.href = "/"} className="logo">
          My<span>News</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/category/business">Business</Nav.Link>
            <Nav.Link href="/category/health">Health</Nav.Link>
            <Nav.Link href="/category/science">Science</Nav.Link>
            <Nav.Link href="/category/sports">Sports</Nav.Link>
            <Nav.Link href="/category/technology">Technology</Nav.Link>
            {user?.access_token && <Nav.Link href="/bookmarks">Bookmarks</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MobileNavbar;
