import React, { Component } from 'react';
import "./../../scss/ui/Switch.scss";

class Switch extends Component {
  constructor(props){
    super(props)

    if(!this.props.toggle){
      this.state = {
        "inoutswitch": "in"
      }
    } else {
      this.state = {
        "inoutswitch": this.props.toggle
      }
    }

    this.inOutSwitch = this.inOutSwitch.bind(this)
  }

  inOutSwitch(){
    if(this.state.inoutswitch == "in"){
      this.setState({"inoutswitch": "out"})
      this.props.sendSwitchValue("out")

      if(this.props.detectClick){
        this.props.detectClick()
      }
    } else {
      this.setState({"inoutswitch": "in"})
      this.props.sendSwitchValue("in")
      if(this.props.detectClick){
        this.props.detectClick()
      }
    }
  }

  render(){
    return (
      <div className="inorout" onClick={this.inOutSwitch}>
        <div className="in">
          <span>IN</span>
        </div>
        <div className="out">
          <span>OUT</span>
        </div>
        <div className={"selected " + this.state.inoutswitch}></div>
      </div>
    )
  }
}
export default Switch
