import React, { Component } from 'react'
import './Navigation.css'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FaHome, FaUsers, FaShoppingCart, FaCouch, FaChartLine } from 'react-icons/fa';
import '@trendmicro/react-sidenav/dist/react-sidenav.min.css';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
    render() {
        return (
          <SideNav className="position-fixed" id="side" style={{backgroundColor : '#2196F3'}}
    onSelect={(selected) => {
        if(window.location.pathname !== selected){
            window.location.pathname = selected
        }
    }}
>
    <SideNav.Toggle id="toggler" />
    <SideNav.Nav  defaultSelected={window.location.pathname}>
        <NavItem  eventKey="/main/">
            <NavIcon >
                <FaHome style={{fontSize: '1.75em', color:"white"}} />
            </NavIcon>
            <NavText>
                Acceuil
            </NavText>
        </NavItem>
        <NavItem eventKey="/main/clients">
            <NavIcon >
                <FaUsers style={{fontSize: '1.75em', color:"white"}} />
            </NavIcon>
            <NavText>
                Clients 
            </NavText>
        </NavItem>
        <NavItem eventKey="/main/commandes">
            <NavIcon >
                <FaShoppingCart style={{fontSize: '1.75em', color:"white"}} />
            </NavIcon>
            <NavText>
                Commandes
            </NavText>
        </NavItem>
        <NavItem eventKey="/main/meubles">
            <NavIcon >
                <FaCouch style={{fontSize: '1.75em', color:"white"}} />
            </NavIcon>
            <NavText>
                Meubles
            </NavText>
        </NavItem>
        <NavItem eventKey="/main/bilan">
            <NavIcon >
                <FaChartLine style={{fontSize: '1.75em', color:"white"}}  />
            </NavIcon>
            <NavText>
                Bilan
            </NavText>
            <NavItem eventKey="/main/bilan/journalier">
                <NavText>
                    Journalier
                </NavText>
            </NavItem>
            <NavItem eventKey="/main/bilan/mensuelle">
                <NavText>
                    Mensuelle
                </NavText>
            </NavItem>
            <NavItem eventKey="/main/bilan/annuelle">
                <NavText>
                    Annuelle
                </NavText>
            </NavItem>
        </NavItem>
    </SideNav.Nav>
</SideNav>
        )
    }
}