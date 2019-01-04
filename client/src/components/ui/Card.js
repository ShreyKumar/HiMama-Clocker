import React, { Component } from "react";
import Switch from "./Switch.js";
import "./../../scss/ui/Card.scss";

class Card extends Component {
  constructor(props){
    super(props)

    this.state = {
      "editmode": false,
      data: this.props.data
    }

    this.editMode = this.editMode.bind(this)
  }

  editMode(){
    this.setState({"editmode": true})
  }


  render(){
    if(this.state.editmode){
      let d = new Date(this.props.data.time)
      let hours = d.getHours()
      let ampm = ""
      if(hours > 12){
        hours -= 12
        ampm = "PM"
      } else if(hours == 0){
        hours = 12
        ampm = "AM"
      } else {
        ampm = "AM"
      }
      let mins = d.getMinutes()
      let secs = d.getSeconds()

      return (
        <div className="Card editmode">
          <input className="firstname" type="text" value={this.state.data.firstname} />
          <input className="lastname" type="text" value={this.state.data.lastname} />
          <Switch toggle={this.state.data.mode} />
          <input type="text" className="hours" value={hours} />
          <span className="mark">:</span>
          <input type="text" className="mins" value={mins} />
          <span className="mark">:</span>
          <input type="text" className="secs" value={secs} />
          <input type="text" className="ampm" value={ampm} />
        </div>
      )
    } else {
      return(
        <div className="Card">
          <p onDoubleClick={this.editMode} className="item firstname">{this.state.data.firstname}</p>
          <p onDoubleClick={this.editMode} className="item lastname">{this.state.data.lastname}</p>
          <p onDoubleClick={this.editMode} className={"item mode " + this.state.data.mode}>{this.state.data.mode.toUpperCase()}</p>
          <p onDoubleClick={this.editMode} className="item time">{new Date(this.state.data.time).toLocaleTimeString()}</p>
        </div>
      )
    }
  }
}

export default Card
