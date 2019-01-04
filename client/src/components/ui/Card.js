import React, { Component } from "react";
import Switch from "./Switch.js";
import "./../../scss/ui/Card.scss";

class Card extends Component {
  constructor(props){
    super(props)

    let d = new Date(this.props.data.time)
    this.hours = d.getHours()
    this.ampm = ""
    if(this.hours > 12){
      this.hours -= 12
      this.ampm = "PM"
    } else if(this.hours == 0){
      this.hours = 12
      this.ampm = "AM"
    } else {
      this.ampm = "AM"
    }
    this.mins = d.getMinutes()
    this.secs = d.getSeconds()

    this.state = {
      "editmode": false,
      "firstname": this.props.data.firstname,
      "lastname": this.props.data.lastname,
      "mode": this.props.data.mode,
      "hours": this.hours,
      "mins": this.mins,
      "secs": this.secs,
      "ampm": this.ampm,
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
    this.saveOnEnter = this.saveOnEnter.bind(this)

  }

  editMode(){
    this.setState({"editmode": true})
  }

  updateFirstname(e){
    if(e.target.value.length > 1){
      this.setState({
        firstname: e.target.value
      })
    }
  }

  updateLastname(e){
    this.setState({
      lastname: e.target.value
    })
  }

  updateMode(mode){
    console.log("changed mode")
    console.log(mode)

    this.state.mode = mode
    this.save()
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

  saveOnEnter(e){
    if(e.keyCode == 13){
      this.save()
    }
  }

  save(){
    //convert to time
    var d = new Date()

    if(this.state.ampm == "AM"){
      d.setHours(this.state.hours, this.state.mins, this.state.secs)
    } else {
      d.setHours(parseInt(this.state.hours) + 12, this.state.mins, this.state.secs)
    }

    console.log("CHANGING TO THIS DATE")
    console.log(d)

    let url;
    if(this.state.mode == "in"){
      url = "/clock/in"
    } else {
      url = "/clock/out"
    }

    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        time: d
      })
    }).then(resp => {
      console.log(resp)
      resp.json().then(data => {
        if(data.hasOwnProperty("error")){
          console.log(this.state.errormsg)
          this.setState({
            "errormsg": data["error"],
            "editmode": false,
            "firstname": this.props.data.firstname,
            "lastname": this.props.data.lastname,
            "hours": this.hours,
            "mins": this.mins,
            "secs": this.secs,
            "ampm": this.ampm,
            "mode": this.props.data.mode
          })
          this.props.finishedEditing()

          //message should disapear after 2s
          setTimeout(() => {
            this.setState({
              "errormsg": ""
            })
          }, 2000)
        } else {
          console.log("success")
          this.setState({
            "errormsg": "",
            "editmode": false
          })
          this.props.finishedEditing()
        }
      })
    })

  }



  render(){
    if(this.state.editmode){
      console.log("edit mode on")

      return (
        <div className="Card editmode" onKeyUp={this.saveOnEnter}>
          <input onChange={this.updateFirstname} className="firstname" type="text" value={this.state.firstname} />
          <input onChange={this.updateLastname} className="lastname" type="text" value={this.state.lastname} />
          <Switch detectClick={this.save} sendSwitchValue={this.updateMode} toggle={this.state.mode} />
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
          <span className="errormsg">{this.state.errormsg}</span>
        </div>
      )
    }
  }
}

export default Card
