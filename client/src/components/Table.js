import React, { Component } from 'react';
import Form from "./Form.js";
import Card from "./ui/Card.js";
import "./../scss/Table.scss";

class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      showanimation: false,
      loaded: true,
      tooltip: ""
    }

    this.getActivity = this.getActivity.bind(this)
    this.submitted = this.submitted.bind(this)

    //initial call
    this.getActivity()
  }

  getActivity(){
    fetch("/clock/get", {
      method: "get"
    }).then(resp => {
      console.log(resp)
      resp.json().then(data => {
        //sort dates by time
        console.log(data)

        if(data.length > 0){
          this.setState({
            data: data,
            tooltip: "Double click to edit and press enter to save (Warning: Might be buggy!)"
          })
        } else {
          this.setState({
            data: data
          })
        }

      })
    })
  }

  submitted(){
    this.getActivity()
    this.setState({
      showanimation: true,
      loaded: false
    })

    setTimeout(() => {
      this.setState({showanimation: false})
    }, 3000)
  }

  // TODO: trigger switch at Form
  // Upon submit, call another func here and change state to hide form
  // CSS3 animation to move card down
  // upon animation finish, change state to include form again


  //TODO 2: Edit feature - double click to change item to a form
  //TODO 3: Change switch in form to seperate component and include that in edit mode
  //On blur or enter to successfully change it, Error message to pop below it

  //More features: pages to show only few, sort by earliest, sort by people

  /*
  <div className="clockin-area">
    {
      (!this.state.showanimation || this.state.loaded) &&
      <Form submitted={this.submitted} />
    }
    {
      this.state.showanimation &&
      <Form className="fade" submitted={this.submitted} />
    }
    {
      this.state.data.map((item, index) => {
        if(index == 0 && this.state.showanimation){
          return (
            <div className="Card slidedown">
              <p className="item firstname">{item.firstname}</p>
              <p className="item lastname">{item.lastname}</p>
              <p className="item mode">{item.mode.toUpperCase()}</p>
              <p className="item time">{new Date(item.time).toLocaleTimeString()}</p>
            </div>
          );
        } else {
          return (
            <div key={item.firstname} className="Card">
              <p className="item firstname">{item.firstname}</p>
              <p className="item lastname">{item.lastname}</p>
              <p className="item mode">{item.mode.toUpperCase()}</p>
              <p className="item time">{new Date(item.time).toLocaleTimeString()}</p>
            </div>
          )
        }
      })
    }
  </div>
  */


  render(){
    return (
      <div className="clockin-area">
        <Form submitted={this.submitted} />
        <p className="tooltip">{this.state.tooltip}</p>
        {
          this.state.data.map((item, index) => {
            return (
              <Card toggleToolTip={this.toggleToolTip} key={item.firstname + " " + item.lastname +" " + item.mode} data={item} finishedEditing={this.getActivity} />
            )
          })
        }
      </div>
    )
  }
}

export default Table;
