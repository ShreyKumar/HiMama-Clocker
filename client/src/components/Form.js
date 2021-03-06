import React, { Component } from 'react';
import Switch from "./ui/Switch.js";
import "./../scss/Form.scss";

class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      "inoutswitch": "in",
      "firstname": "",
      "lastname": "",
      "firstnamevalid": false,
      "lastnamevalid": false,
      "errormsg": ""
    }

    this.checkFirstname = this.checkFirstname.bind(this)
    this.checkLastname = this.checkLastname.bind(this)
    this.clock = this.clock.bind(this)

    this.namechecker = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-{1,}]/;
  }

  checkFirstname(e){
    e.preventDefault();
    this.setState({"firstname": e.target.value})
    if(this.namechecker.test(e.target.value)){
      this.setState({
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
    this.setState({"lastname": e.target.value})
    if(this.namechecker.test(e.target.value)){
      this.setState({
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
      let url;
      if(this.state.inoutswitch == "in"){
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
          lastname: this.state.lastname
        })
      }).then(resp => {
        console.log(resp)
        resp.json().then(data => {
          if(data.hasOwnProperty("error")){
            this.setState({"errormsg": data["error"]})
          } else {
            this.setState({
              "errormsg": "",
              "firstname": "",
              "lastname": "",
              "firstnamevalid": false,
              "lastnamevalid": false
            })

            this.props.submitted()
          }
        })
      })
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
      <form className={"clock-form Card " + this.props.className}>
        <input value={this.state.firstname} onChange={this.checkFirstname} onBlur={this.checkFirstname} className="firstname" placeholder="Firstname" />
        <input value={this.state.lastname} onChange={this.checkLastname} onBlur={this.checkLastname} className="lastname" placeholder="Lastname"/>
        <Switch sendSwitchValue={val => this.setState({"inoutswitch": val})} />
        <a href="#" onClick={this.clock} className={"submit-btn " + btnswitch}>Submit</a>
        <span className="errormsg">{this.state.errormsg}</span>
      </form>
    )
  }
}

export default Form;
