import React, { Component } from 'react'

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
            <Navbar type="dark" theme="primary" expand="md">
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