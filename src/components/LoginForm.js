import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import Nav from './Nav';
// import CustomersService from '../contactt/contactservice';
// import { Route} from 'react-router-dom'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logged_in: localStorage.getItem('token') ? true : false,
    };

    this.handle_login = this.handle_login.bind(this);
}

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };


  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login(e, data){
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };


  
  
   

  render() {
  //   const Login = (props) => {
  //   if (!props.logged_in()) {
  //     return <Redirect to="/login" />;
  //   }
  // }
      
    

    return (
      
    <div className="container login">

       <form onSubmit={this.handle_login}>
      {/* <form onSubmit={e => this.props.handle_login(e, this.state)}></form> */}
        <h2 style={{ color: 'black', textAlign: 'center' }}>Login Form </h2><br></br>

           <div className="form-group">
            <label htmlFor="username" style={{ color: 'black', fontSize: '20px' }}>UserName</label>
            <input className="form-control" type="text" name="username"
            value = {this.state.username}
            onChange={this.handle_change}
            />
            </div>

            <div className="form-group">
            <label htmlFor="password la" style={{ color: 'black', fontSize: '20px' }}>Password</label>
            <input className="form-control" type="password" name="password"
            value = {this.state.password}
            onChange={this.handle_change}
            />
            </div>
            <button className="btn btn-success btn-blog btn-lg"><i class="fa fa-sign-in"></i>  Login </button>
            
      </form>
      
      </div>
    );
  }
}

export default LoginForm;

// Nav.propTypes = {
//   logged_in: PropTypes.bool.isRequired,
// }
LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};
