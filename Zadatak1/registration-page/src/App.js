import React from 'react';
class App extends React.Component {
  state = {
    users: [
      {}
    ],
    firstName: {
      name: "",
      isValid: ""
    },
    lastName: {
      name: "",
      isValid: ""
    },
    username: {
      name: "",
      isValid: ""
    },
    email: {
      name: "",
      isValid: ""
    },
    password: {
      name: "",
      isValid: ""
    },
    confirmPassword: {
      name: "",
      isValid: ""
    },
    submitted: false,
    usersId: 1
  }
  //http://jsonblob.com/925468983633920000
  handleChange = (e) => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    let passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let { firstName, lastName, username, email, password, confirmPassword } = this.state;
    if (firstName.name==="") {
      console.log("Input field first name is empty!?");
      this.setState({firstName: {isValid: "error"}})
    }  if (lastName.name==="") {
      console.log("Input field last name is empty!?");
      this.setState({lastName: {isValid: "error"}})
    }  if (username.name==="") {
      console.log("Input field username is empty!");
      this.setState({username: {isValid: "error"}})
    }  if (email.name==="" || !emailRegex.test(email)) {
      console.log("Not valid email address");
      this.setState({email: {isValid: "error"}})
    }  if (!passwordRegex.test(password)) {
      console.log("Password is not strong enough!");
      this.setState({password: {isValid: "error"}})
    } if(password !== confirmPassword){
      console.log("Passwords dont match!");
      this.setState({confirmPassword: {isValid: "error"},
      password: {isValid: "error"}})
    } if (lastName.name!=="" && firstName.name!=="" && username.name!=="" && email.name!=="" && emailRegex.test(email) && passwordRegex.test(password) && password === confirmPassword) {
      let newUser = {
        usersId: this.state.users.length + 1,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email
      }
     let users = this.state.users;
      users.push(newUser)
      this.setState({ users })
      fetch("https://jsonblob.com/api/jsonBlob/",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.state.users)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log("Error! " + err))
        console.log("SUBMITTED");
    } else {
      console.log("Not submitted!");
    }
  }
  render() {
    const {firstName, lastName, username, email, password, confirmPassword} = this.state;
    return (
      <div className="App">
        <div className="row main-container">
        <h1>Create Account.</h1>
          <form method='POST' onSubmit={this.handleSubmit}>
              <div className='row col s12'>
              <div className="input-field col s12 l6">
                <i className="material-icons prefix">person</i>
                <input id="first_name" name='firstName' type="text" className={firstName.isValid}  onChange={this.handleChange} />
                <label htmlFor="first_name">First Name </label>
              </div>
              <div className="input-field col s12 l6">
              <i className="material-icons prefix">person</i>
                <input id="last_name" name='lastName' type="text" className={lastName.isValid} onChange={this.handleChange} />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="input-field col s12 m12 l12">
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_prefix" name='username' type="text" className={username.isValid} onChange={this.handleChange} />
                <label htmlFor="icon_prefix">Username</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" name='email' type="text" className={email.isValid} onChange={this.handleChange} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12 m6 l6">
                <i className="material-icons prefix">lock</i>
                <input id="password" name='password' type="password" className={password.isValid} onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12 m6 l6">
              <i className="material-icons prefix">lock_outline</i>
                <input id="confirm-password" name='confirmPassword' type="password" className={confirmPassword.isValid} onChange={this.handleChange} />
                <label htmlFor="confirm-password">Confirm password</label>
              </div>
              </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
