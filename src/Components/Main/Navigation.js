import React, { Component } from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FaHome, FaUsers, FaShoppingCart, FaCouch, FaChartLine } from 'react-icons/fa';
import history from '../Other/History';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

      }
    render() {
        return (
          <SideNav className="position-fixed" id="side"
    onSelect={(selected) => {
        if(window.location.pathname !== selected){
            history.push(selected)
        }
    }}
>
    <SideNav.Toggle id="toggler" />
    <SideNav.Nav  defaultSelected={window.location.pathname}>
        <NavItem  eventKey="/main/">
            <NavIcon >
                <FaHome className="nav-icon" style={{fontSize: '1.75em', color:"white"}} />
            </NavIcon>
            <NavText>
                Acceuil
            </NavText>
        </NavItem>
        <NavItem eventKey="/main/clients">
            <NavIcon >
                <FaUsers className="nav-icon"  style={{fontSize: '1.75em', color:"white"}} />
            </NavIcon>
            <NavText>
                Clients 
            </NavText>
        </NavItem>
        <NavItem eventKey="/main/commandes">
            <NavIcon >
                <FaShoppingCart className="nav-icon"  style={{fontSize: '1.75em', color:"white"}} />
            </NavIcon>
            <NavText>
                Commandes
            </NavText>
        </NavItem>
        <NavItem eventKey="/main/meubles">
            <NavIcon >
                <FaCouch className="nav-icon"  style={{fontSize: '1.75em', color:"white"}} />
            </NavIcon>
            <NavText>
                Meubles
            </NavText>
            <NavItem eventKey="/main/meubles/listes">
                <NavText>
                    Liste
                </NavText>
            </NavItem>
            <NavItem eventKey="/main/meubles/categories">
                <NavText>
                    Categories
                </NavText>
            </NavItem>
        </NavItem>
        <NavItem eventKey="/main/bilan">
            <NavIcon >
                <FaChartLine className="nav-icon"  style={{fontSize: '1.75em', color:"white"}}  />
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