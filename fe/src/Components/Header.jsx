import React from 'react';
import { NavLink } from 'react-router-dom';
import LandingPage from './Home';
import Upload from './Upload';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>{'Store Inventory Management'}</h1>
            <nav style={styles.nav}>
                <NavLink to="/" style={styles.link} activeStyle={styles.activeLink} exact> {'Home'}
                </NavLink>
                <NavLink to="/inventory" style={styles.link} activeStyle={styles.activeLink} exact> {'Inventory'}
                </NavLink>
                <NavLink to="/upload" style={styles.link} activeStyle={styles.activeLink} exact> {'Upload'}
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;

const styles = {
    nav: { marginTop: '10px' },
    link: { margin: '0 10px', color: 'white', textDecoration: 'none' },
    activeLink: { textDecoration: 'underline' },
    header: {
        backgroundColor: 'rgb(119, 127, 119)',
        padding: '10px 20px',
        color: 'white',
        position: 'absolute',
        top: '0px',
        width: '100%',
        left: '0px'
    },
    title: {
        margin: 0,
        fontSize: '24px',
    },
};

