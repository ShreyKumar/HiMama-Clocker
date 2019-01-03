import React, { Component } from 'react';
import "./../scss/Table.scss";

class Table extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <form className="clock-form">
        <input className="firstname" placeholder="Firstname" />
        <input className="lastname" placeholder="Lastname"/>
        <div className="inorout">
          <div className="in">
            <a href="#">IN</a>
          </div>
          <div className="out">
            <a href="#">OUT</a>
          </div>
          <div className="selected"></div>
        </div>
        <button className="submit-btn">Submit</button>
      </form>
    )
  }
}

export default Table;
