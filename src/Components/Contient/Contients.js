import React, { Component } from 'react'
import Loading from '../Other/Loading';
import {Row ,Col} from 'shards-react'
import Format from '../Other/Format';
import DetailsCommandes from './DetailsCommandes';
import TableContient from './TableContient'
export default class Contients extends Component {

    constructor(props){
        super(props)
        this.state = { 
            contients : [] ,
            loading: false
        }
        this.format = new Format()
    }

    
    componentDidMount(){
        //this.getDetails()
    }
    render() {
        return (
                <div>
                    <DetailsCommandes numcommande={this.props.match.params.numcommande}/>
                    {this.state.loading? (<Loading/>):(<TableContient numcommande={this.props.match.params.numcommande} />)}
                </div>
        )
    }
                //{this.props.match.params.numcommande}
}
