import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function Cart(props) {
  let state = useSelector((state) => state.reducer);
  let dispatch = useDispatch();

  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>번호</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {state.map((a, i) => {
            return (
              <tr key={i}>
                <td>{a.id + 1}</td>
                <td>{a.name}</td>
                <td>{a.quan}</td>
                <td>
                  <button
                    onClick={() => {dispatch({ type: "수량증가", payload: a.id });}}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량감소", payload: a.id });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.alert === true ? (
        <div className="my-alert2">
          <p>지금 구매하면 신규 회원 할인 20%</p>
          <button
            onClick={() => {
              props.dispatch({ type: "닫기" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
    </div>
  );
}

// function state를props화(state) {
//   return {
//     state: state.reducer,
//     alert: state.reducer2,
//   };
// }

// export default connect(state를props화)(Cart);

export default Cart;
