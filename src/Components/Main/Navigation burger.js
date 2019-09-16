import React, { Component } from 'react'
import { elastic as Menu } from 'react-burger-menu'
import { NavItem, NavLink } from 'shards-react'


export default class Navigation extends Component {
    constructor(props) {
        super(props);
    
        this.showSettings = this.showSettings.bind(this);
        this.state = {
          isOpen: false
        };
      }
      showSettings (event) {
        event.preventDefault();
      }
    render() {
      var styles = {
        bmBurgerButton: {
          position: 'fixed',
          width: '36px',
          height: '30px',
          left: '36px',
          top: '36px'
        },
        bmBurgerBars: {
          background: '#373a47'
        },
        bmBurgerBarsHover: {
          background: '#a90000'
        },
        bmCrossButton: {
          height: '24px',
          width: '24px'
        },
        bmCross: {
          background: '#bdc3c7'
        },
        bmMenuWrap: {
          position: 'fixed',
          height: '100%'
        },
        bmMenu: {
          background: '#373a47',
          padding: '2.5em 1.5em 0',
          fontSize: '1.15em'
        },
        bmMorphShape: {
          fill: '#373a47'
        },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em'
        },
       
        bmOverlay: {
          background: 'rgba(0, 0, 0, 0.3)'
        }
      }
        return (
          <div id="outer-container">
          <Menu styles={styles} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
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
          </Menu>
          <main id="page-wrap">
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ea et, temporibus facere, fugiat, aliquid enim molestias quae iusto distinctio rerum natus. Nihil, aliquam cumque. Nostrum soluta aliquid vel voluptas!</div>
          </main>
        </div>
        )
    }
}