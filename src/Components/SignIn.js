import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {email:'', password: '',error: false};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.KeyUp = this.KeyUp.bind(this);
    }
    KeyUp(e){
        if(e.key === 'Enter'){
            axios.post('https://my-stock-app.herokuapp.com/SignIn',{
                crossDomain:true,
                email: this.state.email.toLowerCase(),
                password: this.state.password
            })
            .then((user)=>{
                if(user){
                    this.props.updateUser(user.data);
                }
            }).catch((err)=>{
                this.setState({error: true});
            })
        }
    }
    handleEmailChange(e){
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e){
        this.setState({ password: e.target.value });
    }
    
    render(){
        let ErrorMessage;
        if(this.state.error){
            ErrorMessage = <div className = "center"> 
            <Link to="/Register">Register </Link>
            </div>
        }
        if(this.props.isAuth){
            return(<Redirect to ="/Portfolio"/>)
        }
        
        return (
            <div id='SignInContainer'> 
                <div>
                <h1 id='SignIn' className='center'>Sign In</h1>
                <input placeholder='Email' onChange={this.handleEmailChange} className='input'/>
                <br/>
                <input placeholder='Password' type = 'password' onChange= {this.handlePasswordChange} onKeyPress={this.KeyUp} tabIndex='0' className='input'/>
                </div>
                {ErrorMessage}
            </div>
            
        );
    }
}

export default SignIn;