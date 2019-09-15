import React, { Component } from 'react'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() {
        return (
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Meubles</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
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
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Bilan
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Journalier
                    </DropdownItem>
                    <DropdownItem>
                    Mensuelle
                    </DropdownItem>
                    <DropdownItem>
                      Annuelle
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        )
    }
}
