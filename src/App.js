import React from 'react';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap'
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Map from './Map';
import About from './About';
import Country from './Country';
import Region from './Region';

function App() {
	return (
		<div className="App">
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Brand href="/">COVID-19 Tracker</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Data</Nav.Link>
						<Nav.Link href="/map">Map</Nav.Link>
						<Nav.Link href='/about'>About</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<br />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/map' component={Map} />
				<Route path='/about' component={About} />
				<Route path='/country' component={Country} />
				<Route path='/region' component={Region} />
			</Switch>
		</div>
	);
}

export default App;
