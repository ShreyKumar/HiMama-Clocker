//NOTE: Change this to using a proper db later
module.exports = {
  user: {
    firstname: "",
    lastname: "",
    in_time: null,
    out_time: null
  },
  users: {
    allusers: [],
    clock(mode, firstname, lastname) {
      const today = new Date()
      if(mode == "in"){
        for(let i = 0; i < this.allusers.length; i++){
          if(this.allusers[i].firstname == firstname && this.allusers[i].lastname == lastname){

            //update check in time
            this.allusers[i].in_time = new Date()
            return {"success": "You have clocked in!"}
          }
        }

        let user = {
          firstname: firstname,
          lastname: lastname,
          in_time: null,
          out_time: null
        }
        user.in_time = new Date()

        //check in
        this.allusers.push(user)

        return {"success": "You have clocked in!"}

      } else {
        for(let i = 0; i < this.allusers.length; i++){
          if(this.allusers[i].firstname == firstname && this.allusers[i].lastname == lastname){
            this.allusers[i].out_time = new Date()
            return {"success": "You have clocked out!"}
          }
        }
        return {"error": "You haven't clocked in yet!"}

      }

    }
  }
}
