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
