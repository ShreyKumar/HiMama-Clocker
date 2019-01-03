import React, { Component } from 'react';
import Form from "./Form.js";
import "./../scss/Table.scss";

class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }

    this.getActivity = this.getActivity.bind(this)

    //initial call
    this.getActivity()
  }

  getActivity(){
    fetch("http://localhost:5000/clock/get", {
      method: "get"
    }).then(resp => {
      console.log(resp)
      resp.json().then(data => {
        //sort dates by time
        console.log(data)

        this.setState({
          data: data
        })
      })
    })
  }

  // TODO: trigger switch at Form
  // Upon submit, call another func here and change state to hide form
  // CSS3 animation to move card down
  // upon animation finish, change state to include form again


  //TODO 2: Edit feature - double click to change item to a form
  //TODO 3: Change switch in form to seperate component and include that in edit mode
  //On blur or enter to successfully change it, Error message to pop below it

  //More features: pages to show only few, sort by earliest, sort by people


  render(){
    return (
      <div className="clockin-area">
        <Form />
        {
          this.state.data.map(item => {
            return (
              <div key={item.firstname} className="Card">
                <p className="item firstname">{item.firstname}</p>
                <p className="item lastname">{item.lastname}</p>
                <p className="item mode">{item.mode.toUpperCase()}</p>
                <p className="item time">{new Date(item.time).toLocaleTimeString()}</p>
              </div>
            );
          })
        }
      </div>
    )
  }
}

export default Table;
