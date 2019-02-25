import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div className="container login">
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <h2 style={{ color: 'black', textAlign: 'center' }}>SignUp Form </h2><br></br>
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
            <button className="btn btn-success btn-blog btn-lg"><i class="fa fa-sign-in"></i>  SignUp </button>
        
      </form>
      </div>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
