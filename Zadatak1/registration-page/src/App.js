import React from 'react';
class App extends React.Component {
  state = {
    users: [
      {}
    ],
    firstName: "Marija",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    submitted: false,
    isValidate: true,
    usersId: 1,
    inputStyle: { borderBottom: "1px solid gray" }
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
    let { firstName, lastName, username, email, password } = this.state;
    if (firstName === "") {
      console.log("Input field first name is empty!?");
    } else if (lastName === "") {
      console.log("Input field last name is empty!?");
    } else if (username === "") {
      console.log("Input field username is empty!");
    } else if (email === "" || !emailRegex.test(email)) {
      console.log("Not valid email address");
    } else if (!passwordRegex.test(password)) {
      console.log("Password is not strong enough!");
    } else {

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
      fetch("https://jsonblob.com/api/jsonBlob",
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
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Create Account</h1>
        <div className="row">
          <form method='POST' onSubmit={this.handleSubmit}>
              <div className='row col s12'>
              <div className="input-field col s12 l6">
                <i className="material-icons prefix">person</i>
                <input id="first_name" name='firstName' type="text" className="validate" style={this.state.inputStyle} onChange={this.handleChange} />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s12 l6">
              <i className="material-icons prefix">person</i>
                <input id="last_name" name='lastName' type="text" className="validate" onChange={this.handleChange} />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="input-field col s12 m12 l12">
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_prefix" name='username' type="text" className="validate" onChange={this.handleChange} />
                <label htmlFor="icon_prefix">Username</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" name='email' type="text" className="validate" onChange={this.handleChange} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12 m6 l6">
                <i className="material-icons prefix">lock</i>
                <input id="password" name='password' type="password" className="validate" onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12 m6 l6">
              <i className="material-icons prefix">lock_outline</i>
                <input id="confirm-password" name='confirmedPassword' type="password" className="validate" onChange={this.handleChange} />
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
