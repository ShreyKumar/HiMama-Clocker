import React, { Component } from 'react';
import Form from "./Form.js";
import "./../scss/Table.scss";

class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
    }

  }

  render(){
    return (
      <div className="clockin-area">
        <Form />
      </div>
    )
  }
}

export default Table;
