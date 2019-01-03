import React, { Component } from 'react';
import "./../scss/Table.scss";

class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
      "inoutswitch": "in"
    }

    this.inOutSwitch = this.inOutSwitch.bind(this)
  }

  inOutSwitch(){
    if(this.state.inoutswitch == "in"){
      this.setState({"inoutswitch": "out"})
    } else {
      this.setState({"inoutswitch": "in"})
    }
  }

  render(){
    return (
      <form className="clock-form">
        <input className="firstname" placeholder="Firstname" />
        <input className="lastname" placeholder="Lastname"/>
        <div className="inorout" onClick={this.inOutSwitch}>
          <div className="in">
            <span>IN</span>
          </div>
          <div className="out">
            <span>OUT</span>
          </div>
          <div className={"selected " + this.state.inoutswitch}></div>
        </div>
        <a href="#" className="submit-btn">Submit</a>
      </form>
    )
  }
}

export default Table;
