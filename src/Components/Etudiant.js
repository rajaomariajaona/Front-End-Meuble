 import React, { Component } from 'react'
 
 export default class Etudiant extends Component {
      constructor(props){
          super(props);
          this.state = {etudiants : []}
      }
    etudiant = {};
     componentDidMount(){
         fetch('http://localhost:8000/api/etudiants',{
             method: "GET",
             credentials: 'include'
         })
         .then(response => {
        response.json().then(data => {     
                this.setState({etudiants : data})
            })
        })
     }
     render() {
         const etu = this.state.etudiants.map((element,index) => {
            return(<div key={index}> {element.numImm} </div>);
         });
         return (
             <div>
                 {etu}
             </div>
         )
     }
 }
 