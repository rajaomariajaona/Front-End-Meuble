import React, { Component } from 'react'

import './Navigation.css'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'shards-react';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.state = {
          isOpen: false,
          navbarCollapsed : false
        };
      }
      toggleNavBar() {
        this.setState({
          navbarCollapsed: !this.state.navbarCollapsed
        });
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() {
        return (
            <Navbar type="dark" theme="primary" expand="md">
            <NavbarBrand href="/">Meubles</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavBar} />

            <Collapse  open={this.state.navbarCollapsed} navbar>
              <Nav style={{textWeight: 'bold'}}  className="ml-auto" navbar>
              <NavItem>
                  <NavLink href="/main/">Acceuil</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/main/clients/">Clients</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/main/commandes/">Commandes</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/main/meubles/">Meubles</NavLink>
                </NavItem>
            <Dropdown
              open={this.state.isOpen}
              toggle={this.toggle}
            >
                  <DropdownToggle nav caret>
                    Bilan
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                    <NavLink href="/main/bilan/journalier">Journalier</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                    <NavLink href="/main/bilan/mensuelle">Mensuelle</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                    <NavLink href="/main/bilan/annuelle">Annuelle</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Nav>
            </Collapse>
          </Navbar>
        )
    }
}