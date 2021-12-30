import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
class App extends React.Component {
  state = {
    users: [
      {
        usersId: 1,
        firstName: "Ana",
        lastName: "Anic",
        username: "anica123",
        email: "anica@gmail.com",
        password: "Anica!123"
      }
    ],
    firstName: {
      isValid: ""
    },
    lastName: {
      isValid: ""
    },
    username: {
      isValid: ""
    },
    email: {
      isValid: ""
    },
    password: {
      isValid: ""
    },
    confirmPassword: {
      isValid: ""
    },
    submitted: false,
    usersId: 1
  }

  handleChange = (e) => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let usernameRegex = /^.{6,12}$/;
    let { firstName, lastName, username, email, password, confirmPassword } = this.state;
    if (firstName === "") {
      NotificationManager.warning('Input field first name is empty.', 'Please fill all inputs!', 5000);
      this.setState({ firstName: { isValid: "error" } })
    } if (lastName === "") {
      NotificationManager.warning('Input field last name is empty.', 'Please fill all inputs!', 5000);
      this.setState({ lastName: { isValid: "error" } })
    } if (!usernameRegex.test(username)) {
      NotificationManager.warning('Input field username should have minimum 6 and maximum 12 characters.', 'Please fill all inputs!', 5000);
      this.setState({ username: { isValid: "error" } })
    } if (!emailRegex.test(email)) {
      NotificationManager.warning('Invalid email address.', 'Please enter valid email address!', 5000);
      this.setState({ email: { isValid: "error" }})
    } if (!passwordRegex.test(password)) {
      NotificationManager.warning('Password is not strong enough!', 'Your password should have at least 8 characters, of which at least one uppercase, one lowercase letter, number and special character should be included.', 5000);
      this.setState({ password: { isValid: "error" } })
    } if (password !== confirmPassword) {
      NotificationManager.warning("Passwords you entered don't match", 'Please try again!', 5000);
      this.setState({
        confirmPassword: { isValid: "error" },
        password: { isValid: "error" }
      })
    } if (lastName !== "" && firstName !== "" && username !== "" && usernameRegex.test(username) && email !== "" && emailRegex.test(email) && passwordRegex.test(password) && password === confirmPassword) {
      let newUser = {
        usersId: this.state.users.length + 1,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
      let users = this.state.users;
      users.push(newUser)
      this.setState({ users })
      fetch("https://jsonblob.com/api/jsonBlob/",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            redirect: 'follow'
          },
          body: JSON.stringify(this.state.users)
        })
        .then(response => {
          let blobUrl = response.headers.get(
            "Location"
          );
          NotificationManager.success('You have registered successfully.', 'Thank you!');
          console.log(blobUrl);
        })
        .catch(err => console.log("Error! " + err))
      console.log("SUBMITTED");
    } else {
      console.log("Not submitted!");
    }
  }
  render() {
    const { firstName, lastName, username, email, password, confirmPassword } = this.state;
    return (
      <div className="App">
        <div className="row main-container">
          <h1>Create Account.</h1>
          <form method='POST' onSubmit={this.handleSubmit}>
            <div className='row col s12'>
              <div className="input-field col s12 l6">
                <i className="material-icons prefix">person</i>
                <input id="first_name" name='firstName' type="text" className={firstName.isValid} onChange={this.handleChange} />
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
              <div className="input-field col s12 l6">
                <i className="material-icons prefix">lock</i>
                <input id="password" name='password' type="password" className={password.isValid} onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12 l6">
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
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
