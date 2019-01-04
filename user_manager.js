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
    sortUsers(){
      //makes sure users are sorted
      if(this.allusers.length > 0){

        //standard sorting algorithm
        let pivot = this.allusers[0].time
        let newUsers = [this.allusers[0]]
        for(let i = 0; i < this.allusers.length; i++){
          if(this.allusers[i].time > pivot){
            newUsers.unshift(this.allusers[i])
          }
          if(this.allusers[i].time < pivot) {
            newUsers.push(this.allusers[i])
          }
        }
        this.allusers = newUsers
      }
    },
    clock(mode, firstname, lastname) {
      const today = new Date()
      if(mode == "in"){
        for(let i = 0; i < this.allusers.length; i++){
          if(this.allusers[i].firstname == firstname &&
            this.allusers[i].lastname == lastname &&
            this.allusers[i].mode == "in"){

            //update check in time
            this.allusers[i].time = new Date()

            //out time must be greater than in time
            for(let j = 0; j < this.allusers.length; j++){
              if(this.allusers[j].firstname == firstname &&
                this.allusers[j].lastname == lastname &&
                this.allusers[j].mode == "out" &&
                this.allusers[j].time < this.allusers[i].time){

                  //remove
                  this.allusers.splice(j, 1)
                  break
              }
            }


            this.sortUsers()
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

        this.sortUsers()
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
              this.sortUsers()
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

          this.sortUsers()
          return {"success": "You have clocked out!"}
        } else {
          return {"error": "You haven't clocked in yet!"}
        }


      }

    }
  }
}
