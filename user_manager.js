//NOTE: Change this to using a proper db later
module.exports = {
  user: {
    firstname: "",
    lastname: "",
    time: null,
    mode: ""
  },
  users: {
    allusers: [],
    clock(mode, firstname, lastname) {
      const today = new Date()
      if(mode == "in"){
        for(let i = 0; i < this.allusers.length; i++){
          if(this.allusers[i].firstname == firstname &&
            this.allusers[i].lastname == lastname &&
            this.allusers[i].mode == "in"){

            //update check in time
            this.allusers[i].time = new Date()
            return {"success": "You have clocked in!"}
          }
        }

        let user = {
          firstname: firstname,
          lastname: lastname,
          time: new Date(),
          mode: "in"
        }
        //check in
        this.allusers.unshift(user)

        return {"success": "You have clocked in!"}

      } else {

        let clockedIn = false
        for(let i = 0; i < this.allusers.length; i++){
          if(this.allusers[i].firstname == firstname &&
            this.allusers[i].lastname == lastname &&
            this.allusers[i].mode == "in"){
            clockedIn = true
          }
        }

        if(clockedIn){
          for(let i = 0; i < this.allusers.length; i++){
            if(this.allusers[i].firstname == firstname &&
              this.allusers[i].lastname == lastname &&
              this.allusers[i].mode == "out"){

              this.allusers[i].time = new Date()
              return {"success": "You have clocked out!"}
            }
          }

          let user = {
            firstname: firstname,
            lastname: lastname,
            time: new Date(),
            mode: "out"
          }

          this.allusers.unshift(user)

          return {"success": "You have clocked out!"}
        } else {
          return {"error": "You haven't clocked in yet!"}
        }


      }

    }
  }
}
