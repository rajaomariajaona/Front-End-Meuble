import React, { Component } from 'react';
import { Card, Form, FormGroup, FormInput, Button } from 'shards-react';
 
 export default class Login extends Component {
     constructor(props) {
         super(props)
         this.state = {username: '', password: ''};
        this.login = this.login.bind(this);
     }
     componentDidMount(){

     }
     login(event){
        event.preventDefault(); 
        var data = {
            username : document.querySelector('#username').value,
            password : document.querySelector('#password').value
        }
        console.log(data);
        var headers = new Headers();
        headers.append('Content-Type', 'text/json');
        var parameters = {
            method: "POST",
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(data)
        }
        var req = new Request('http://localhost:8000/api/login_check', parameters);
        fetch(req)
        .then(response => {
            console.log(response.status);
        });
        
     }
     render() {
         return (
             <Card className="p-2 m-2">
                 <Form onSubmit={this.login} method="POST">

                     <FormGroup>
                    <label> Username </label>
                    <FormInput type="text" id="username" name="username"/>     
                     </FormGroup>

                     <FormGroup>
                         <label> Password </label>
                        <FormInput type="password" id="password" name="password" />
                     </FormGroup>

                     <Button theme="primary" type="submit" className="mx-2"> Login </Button>
                     <Button theme="danger" type="reset" className="mx-2"> Cancel </Button>
                 </Form>
             </Card>
         )
     }
 }
 