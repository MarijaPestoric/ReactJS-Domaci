import React from 'react';
import illustration from './human.png'
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
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  isFormFilled = () => {
    const { firstName, lastName, username, email, password, confirmPassword } = this.state
    return firstName && lastName && email && username && password && confirmPassword
  }
  handleChange = (e) => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let usernameRegex = /^.{6,12}$/;
    let inputRegex = /^[a-zA-Z\s]*$/;
    let { firstName, lastName, username, email, password, confirmPassword } = this.state;
    if (!inputRegex.test(firstName)) {
      NotificationManager.warning("Input field first name shouldn't be empty or contain something other than a letter", 'Please fill all inputs!', 5000);
      this.setState({ firstName: { isValid: "error" } })
    } if (!inputRegex.test(lastName)) {
      NotificationManager.warning("Input field last name shouldn't be empty or contain something other than a letter", 'Please fill all inputs!', 5000);
      this.setState({ lastName: { isValid: "error" } })
    } if (!usernameRegex.test(username)) {
      NotificationManager.warning('Input field username should have minimum 6 and maximum 12 characters.', 'Please fill all inputs!', 5000);
      this.setState({ username: { isValid: "error" } })
    } if (!emailRegex.test(email)) {
      NotificationManager.warning('Invalid email address.', 'Please enter valid email address!', 5000);
      this.setState({ email: { isValid: "error" } })
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
      this.setState({ isFormFilled: true })
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
          body: JSON.stringify(users)
        })
        .then(response => {
          let blobUrl = response.headers.get(
            "Location"
          );
          NotificationManager.success('You have registered successfully.', 'Thank you!');
          console.log(blobUrl);
        })
        .catch(err => console.log("Error! " + err))
      console.log("Submitted");
    } else {
      NotificationManager.error('Registration failed! Click for more details.', 'ERROR!', 5000, () => {
        alert('Make sure you entered informations correctly.');
      });
      console.log("Not submitted!");
    }
  }
  render() {
    const isEnabled = this.isFormFilled()
    const { firstName, lastName, username, email, password, confirmPassword } = this.state;
    return (
      <div className="App">
        <div className="row main-container">
          <h1 className='form-title animate__animated animate__fadeInDown'>Create Account.</h1>
          <form method='POST' onSubmit={this.handleSubmit}>
            <div className='row col l8'>
              <div className="input-field col s12 l12">
                <i className="material-icons prefix">person</i>
                <input id="first_name" name='firstName' type="text" className={firstName.isValid} onChange={this.handleChange} />
                <label htmlFor="first_name">First Name </label>
              </div>
              <div className="input-field col s12 l12">
                <i className="material-icons prefix">person</i>
                <input id="last_name" name='lastName' type="text" className={lastName.isValid} onChange={this.handleChange} />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="input-field col s12 m12 l12">
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_prefix" name='username' type="text" className={username.isValid} onChange={this.handleChange} />
                <label htmlFor="icon_prefix">Username</label>
                <p className='rules'>minimum 6 and maximum 12 characters</p>
              </div>
              <div className="input-field col s12 email-field">
                <i className="material-icons prefix">email</i>
                <input id="email" name='email' type="text" className={email.isValid} onChange={this.handleChange} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12 l12 ">
                <i className="material-icons prefix">lock</i>
                <input id="password" name='password' type="password" className={password.isValid} onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
                <p className='rules'>at least 8 characters, one uppercase, one lowercase, number and special character</p>
              </div>
              <div className="input-field col s12 l12 password-field">
                <i className="material-icons prefix">lock_outline</i>
                <input id="confirm-password" name='confirmPassword' type="password" className={confirmPassword.isValid} onChange={this.handleChange} />
                <label htmlFor="confirm-password">Confirm password</label>
              </div>
            </div>
            <div className='row col l4'>
              <img className="illustration" src={illustration} alt='BLa' />
              <button disabled={!isEnabled} className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>

            </div>

          </form>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
