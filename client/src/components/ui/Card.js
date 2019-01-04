import React, { Component } from "react";
import Switch from "./Switch.js";
import "./../../scss/ui/Card.scss";

class Card extends Component {
  constructor(props){
    super(props)

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

    this.state = {
      "editmode": false,
      "firstname": this.props.data.firstname,
      "lastname": this.props.data.lastname,
      "mode": this.props.data.mode,
      "hours": hours,
      "mins": mins,
      "secs": secs,
      "ampm": ampm,
      "fieldsvalid": false,
      "errormsg": ""
    }

    this.editMode = this.editMode.bind(this)
    this.updateFirstname = this.updateFirstname.bind(this)
    this.updateLastname = this.updateLastname.bind(this)
    this.updateMode = this.updateMode.bind(this)
    this.updateHours = this.updateHours.bind(this)
    this.updateMinutes = this.updateMinutes.bind(this)
    this.updateSeconds = this.updateSeconds.bind(this)
    this.updateAMPM = this.updateAMPM.bind(this)

    this.save = this.save.bind(this)

    this.namechecker = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-{1,}]/;
  }

  editMode(){
    this.setState({"editmode": true})
  }

  updateFirstname(e){
    this.setState({
      firstname: e.target.value
    })
  }

  updateLastname(e){
    this.setState({
      lastname: e.target.value
    })
  }

  updateMode(mode){
    this.setState({
      mode: mode
    })
  }

  updateHours(e){
    this.setState({
      hours: e.target.value
    })
  }

  updateMinutes(e){
    this.setState({
      mins: e.target.value
    })
  }

  updateSeconds(e){
    this.setState({
      secs: e.target.value
    })
  }

  updateAMPM(e){
    this.setState({
      ampm: e.target.value
    })
  }

  save(e){
    if(e.keyCode == 13){
      let newState = {
        "fieldsvalid": false,
        "errormsg": ""
      }

      //firstname
      if(this.namechecker.test(this.state.firstname)){
        newState.fieldsvalid = true
        newState.errormsg = ""
      } else {
        newState.fieldsvalid = false
        newState.errormsg = "Invalid Firstname!"
      }

      //lastname
      if(this.namechecker.test(this.state.lastname)){
        newState.fieldsvalid = true
        newState.errormsg = ""
      } else {
        newState.fieldsvalid = false
        newState.errormsg = "Invalid Lastname!"
      }

      //hours
      let toSaveHours = parseInt(this.state.hours)
      if(!toSaveHours || toSaveHours <= 0 || toSaveHours > 12){
        newState.fieldsvalid = false
        newState.errormsg = "Invalid Time!"
        console.log("here")
      } else {
        newState.fieldsvalid = true
        newState.errormsg = ""
      }

      //minutes
      let toSaveMinutes = parseInt(this.state.mins)
      if(!toSaveMinutes || toSaveMinutes <= 0 || toSaveMinutes >= 60){
        newState.fieldsvalid = false
        newState.errormsg = "Invalid Time!"
        console.log("here")
      } else {
        newState.fieldsvalid = true
        newState.errormsg = ""
      }

      //seconds
      let toSaveSeconds = parseInt(this.state.secs)
      if(!toSaveSeconds || toSaveSeconds <= 0 || toSaveSeconds >= 60){
        newState.fieldsvalid = false
        newState.errormsg = "Invalid Time!"
        console.log("here")
      } else {
        newState.fieldsvalid = true
        newState.errormsg = ""
      }

      if(/^\d+$/.test(this.state.ampm)
      || (this.state.ampm.toUpperCase() != "AM"
      && this.state.ampm.toUpperCase() != "PM")){
        newState.fieldsvalid = false
        newState.errormsg = "Invalid Time!"

        console.log(/^\d+$/.test(this.state.ampm))
        console.log(this.state.ampm.toUpperCase() != "AM")
        console.log(this.state.ampm.toUpperCase() != "PM")
        console.log(this.state.ampm.toUpperCase())
        console.log("here")
      } else {
        newState.fieldsvalid = true
        newState.errormsg = ""
      }

      if(newState.fieldsvalid){
        alert("valid fields")
      } else {
        this.setState(newState)
      }

    }
  }



  render(){
    if(this.state.editmode){
      console.log("edit mode on")

      return (
        <div className="Card editmode" onKeyUp={this.save}>
          <input onChange={this.updateFirstname} className="firstname" type="text" value={this.state.firstname} />
          <input onChange={this.updateLastname} className="lastname" type="text" value={this.state.lastname} />
          <Switch sendSwitchValue={this.updateMode} toggle={this.state.mode} />
          <input onChange={this.updateHours} type="text" className="hours" value={this.state.hours} />
          <span className="mark">:</span>
          <input onChange={this.updateMinutes} type="text" className="mins" value={this.state.mins} />
          <span className="mark">:</span>
          <input onChange={this.updateSeconds} type="text" className="secs" value={this.state.secs} />
          <input onChange={this.updateAMPM} type="text" className="ampm" value={this.state.ampm} />
          <span className="errormsg">{this.state.errormsg}</span>
        </div>
      )
    } else {
      console.log("edit mode off")
      return(
        <div className="Card">
          <p onDoubleClick={this.editMode} className="item firstname">{this.props.data.firstname}</p>
          <p onDoubleClick={this.editMode} className="item lastname">{this.props.data.lastname}</p>
          <p onDoubleClick={this.editMode} className={"item mode " + this.props.data.mode}>{this.props.data.mode.toUpperCase()}</p>
          <p onDoubleClick={this.editMode} className="item time">{new Date(this.props.data.time).toLocaleTimeString()}</p>
        </div>
      )
    }
  }
}

export default Card
