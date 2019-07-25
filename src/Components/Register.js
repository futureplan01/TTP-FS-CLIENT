import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {name: '', email:'', password: '', isAuth : false, error : false};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.KeyUp = this.KeyUp.bind(this);
    }
    KeyUp(e){
        if(e.key === 'Enter'){
            axios.post('https://my-stock-app.herokuapp.com/Register',{
                crossDomain:true,
                name: this.state.name,
                email: this.state.email.toLowerCase(),
                password: this.state.password
            })
            .then((user)=>{
                this.setState({isAuth: true});
            }).catch((err)=>{
                this.setState({error: true});
            })
        }
    }
    handleEmailChange(e){
        this.setState({ email: e.target.value });
    }
    handleNameChange(e){
        this.setState({ name: e.target.value });
    }
    handleConfirmChange(e){
        this.setState({ confirm: e.target.value });
    }
    handlePasswordChange(e){
        this.setState({ password: e.target.value });
    }
    
    render(){
        let ErrorMessage;
        if(this.state.isAuth){
            return(<Redirect to="/"/>)
        }
        if(this.state.error){
            ErrorMessage = <div className = "center"> 
                Email Is Taken
            </div>
        }

        return (
        <div id = 'SignInContainer'> 
            <div>
            <h1 className='center'>Register</h1>
            <input placeholder = 'Name' onChange={this.handleNameChange} className='input'/>
            <br/>
            <input placeholder = 'Email'  onChange={this.handleEmailChange} className='input'/>
            <br/>
            <input placeholder = 'Password'onChange={this.handlePasswordChange} onKeyUp ={this.KeyUp}className='input'/>
            </div>
            {ErrorMessage}
        </div>
        
        );
    }
}

export default Register;