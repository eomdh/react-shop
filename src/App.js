import React, { useContext, useState, lazy, Suspense } from "react";
import "./App.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Data from "./data.js";
let Detail = lazy(()=>{ return import('./Detail.js') });
import Cart from "./Cart.js";
import axios from "axios";
import { Link, Route, Switch, useHistory } from "react-router-dom";

export let stockContext = React.createContext();

function App() {
  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ShoeShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div class="jumbotron">
            <h1 class="display-4">20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling extra
              attention to featured content or information.
            </p>
            <p class="lead">
              <a class="btn btn-primary btn-lg" href="#" role="button">
                Learn more
              </a>
            </p>
          </div>
          <div className="container">
            <stockContext.Provider value={stock}>
              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} key={i} />;
                })}
              </div>
            </stockContext.Provider>

            <button
              className="btn btn-primary"
              onClick={() => {
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    setShoes([...shoes, ...result.data]);
                  })
                  .catch(() => {
                    console.log("실패");
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <stockContext.Provider value={stock}>
            <Suspense fallback={<div>로딩중</div>}>
              <Detail shoes={shoes} stock={stock} setStock={setStock} />
            </Suspense>
          </stockContext.Provider>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>
      </Switch>

      {/* <Route path="/어쩌구" component={ Modal }></Route> */}
    </div>
  );
}

function Card(props) {
  let history = useHistory();

  return (
    <div
      className="col-md-4"
      onClick={() => {
        history.push("/detail/" + props.shoes.id);
      }}
    >
      <img
        src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"}
        width="100%"
        onClick={() => {
          history.push("/detail/" + props.shoes.id);
        }}
      />
      <h4
        onClick={() => {
          history.push("/detail/" + props.shoes.id);
        }}
      >
        {props.shoes.title}
      </h4>
      <p>
        {props.shoes.content} / {props.shoes.price}{" "}
      </p>
      <Test></Test>
    </div>
  );
}

function Test() {
  let stock = useContext(stockContext);

  return <p>{stock}</p>;
}

export default App;
