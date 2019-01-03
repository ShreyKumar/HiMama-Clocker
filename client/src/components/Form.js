import React, { Component } from 'react';
import "./../scss/Form.scss";

class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      "inoutswitch": "in",
      "firstname": "",
      "lastname": "",
      "firstnamevalid": false,
      "lastnamevalid": false
    }

    this.inOutSwitch = this.inOutSwitch.bind(this)
    this.checkFirstname = this.checkFirstname.bind(this)
    this.checkLastname = this.checkLastname.bind(this)
    this.clock = this.clock.bind(this)
  }

  inOutSwitch(){
    if(this.state.inoutswitch == "in"){
      this.setState({"inoutswitch": "out"})
    } else {
      this.setState({"inoutswitch": "in"})
    }
  }

  checkFirstname(e){
    e.preventDefault();
    if(e.target.value.length > 1){
      this.setState({
        "firstname": e.target.value,
        "firstnamevalid": true
      })
    } else {
      this.setState({
        "firstnamevalid": false
      })
    }

  }

  checkLastname(e){
    e.preventDefault();
    if(e.target.value.length > 1){
      this.setState({
        "lastname": e.target.value,
        "lastnamevalid": true
      })
    } else {
      this.setState({
        "lastnamevalid": false
      })
    }
  }

  clock(e){
    e.preventDefault()
    if(this.state.firstnamevalid && this.state.lastnamevalid){
      //post to server

    }
  }

  render(){
    let btnswitch = "invalid"
    if(!this.state.firstnamevalid || !this.state.lastnamevalid){
      btnswitch = "invalid"
    } else {
      btnswitch = ""
    }

    return (
      <form className="clock-form">
        <input onChange={this.checkFirstname} onBlur={this.checkFirstname} className="firstname" placeholder="Firstname" />
        <input onChange={this.checkLastname} onBlur={this.checkLastname} className="lastname" placeholder="Lastname"/>
        <div className="inorout" onClick={this.inOutSwitch}>
          <div className="in">
            <span>IN</span>
          </div>
          <div className="out">
            <span>OUT</span>
          </div>
          <div className={"selected " + this.state.inoutswitch}></div>
        </div>
        <a href="#" onClick={this.clock} className={"submit-btn " + btnswitch}>Submit</a>
        <span className="errormsg">Error msg</span>
      </form>
    )
  }
}

export default Form;
