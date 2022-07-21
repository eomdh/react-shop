import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Detail.scss";
import { stockContext } from "./App.js";
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

function Detail(props) {
  let [alert, setAlert] = useState(true);
  let [inputData, setInputData] = useState("");
  let [tab, setTab] = useState(0);
  let [key, setKey] = useState();
  let stock = useContext(stockContext);

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let history = useHistory();
  let { id } = useParams();
  let find = props.shoes.find(function (products) {
    return products.id == id;
  });

  return (
    <div className="container">
      {alert === true ? (
        <div className="my-alert2">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + (find.id + 1) + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{find.title}</h4>
          <p>{find.content}</p>
          <p>{find.price}원</p>

          <Info stock={props.stock} />

          <button
            className="btn btn-danger"
            onClick={() => {
              props.setStock([9, 11, 12]);
              props.dispatch({type: "항목추가", payload: { id: find.id, name: find.title, quan: 1 }});
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setTab(0);
              setKey(false);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setTab(1);
              setKey(false);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              setTab(2);
              setKey(false);
            }}
          >
            Option 3
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={key} classNames="wow" timeout={500}>
        <TabContent tab={tab} setKey={setKey} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.setKey(true);
  });

  if (props.tab === 0) {
    return <div>0</div>;
  } else if (props.tab === 1) {
    return <div>1</div>;
  } else if (props.tab === 2) {
    return <div>2</div>;
  }
}

function Info(props) {
  return <p>재고 : {props.stock[0]}</p>;
}

function state를props화(state) {
  return {
    state: state.reducer,
    alert: state.reducer2,
  };
}

export default connect(state를props화)(Detail);
