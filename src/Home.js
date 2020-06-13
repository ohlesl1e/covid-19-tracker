import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap'
import { setCountryCode } from './redux/actions/countryAction';
import { Link } from 'react-router-dom';

const Home = ({ dispatch }) => {
	const [totalConfirmed, settotalConfirmed] = useState('')
	const [totalDeaths, settotalDeaths] = useState('')
	const [totalRecovered, settotalRecovered] = useState('')
	const [newConfirmed, setnewConfirmed] = useState('')
	const [newDeaths, setnewDeaths] = useState('')
	const [newRecovered, setnewRecovered] = useState('')
	const [countries, setcountries] = useState([])
	const [date, setdate] = useState('')
	useEffect(() => {
		axios.get('https://api.covid19api.com/summary')
			.then(res => {
				settotalConfirmed(res.data.Global.TotalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				setnewConfirmed(res.data.Global.NewConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				settotalDeaths(res.data.Global.TotalDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				setnewDeaths(res.data.Global.NewDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				settotalRecovered(res.data.Global.TotalRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				setnewRecovered(res.data.Global.NewRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				const fetchedCountries = res.data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
				setcountries(fetchedCountries)
				const updateDate = new Date(res.data.Date)
				setdate(`${updateDate.getMonth()}/${updateDate.getDate()}/${updateDate.getFullYear()} ${updateDate.getHours()}:${updateDate.getMinutes()}:${updateDate.getSeconds()}`)
			}).catch(e => console.log(e))

	}, [])
	return (
		<div>
			<Container fluid>
				<Row>
					<Col md='4'>
						<Card>
							<Card.Body>
								<Card.Title><h2>Summary</h2></Card.Title>
								<Card.Text>Last update: {date}</Card.Text>
							</Card.Body>
							<ListGroup className="list-group-flush">
								<ListGroupItem>Total confirmed: <h4 className='confirmed'>{totalConfirmed}</h4></ListGroupItem>
								<ListGroupItem>Total deaths: <h4 className='deaths'>{totalDeaths}</h4></ListGroupItem>
								<ListGroupItem>Total recovered: <h4 className='recovered'>{totalRecovered}</h4></ListGroupItem>
								<ListGroupItem>New confirmed: <h4 className='confirmed'>{newConfirmed}</h4></ListGroupItem>
								<ListGroupItem>New deaths: <h4 className='deaths'>{newDeaths}</h4></ListGroupItem>
								<ListGroupItem>New recovered: <h4 className='recovered'>{newRecovered}</h4></ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
					<Col md='8'>
						<Card>
							<Card.Body>
								<Card.Title><h2>World COVID-19 Stats</h2></Card.Title>
								<Table responsive size='sm' style={{ textAlign: 'left' }}>
									<thead>
										<tr>
											<th>NAME</th>
											<th>CONFIRMED</th>
											<th>CHANGES</th>
											<th>DEATHS</th>
											<th>CHANGES</th>
											<th>RECOVERED</th>
											<th>CHANGES</th>
										</tr>
									</thead>
									<tbody style={{ overflowy: 'scroll' }}>
										<tr>
											<td>TOTAL</td>
											<td className='confirmed'>{totalConfirmed}</td>
											<td className='confirmed'>{newConfirmed}</td>
											<td className='deaths'>{totalDeaths}</td>
											<td className='deaths'>{newDeaths}</td>
											<td className='recovered'>{totalRecovered}</td>
											<td className='recovered'>{newRecovered}</td>
										</tr>
										{countries.map((value, i) =>
											<tr key={i}>
												<td><Link to='/country' onClick={() => dispatch(setCountryCode(value.CountryCode))}>{value.Country}</Link></td>
												<td className='confirmed'>{value.TotalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='confirmed'>{value.NewConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='deaths'>{value.TotalDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='deaths'>{value.NewDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='recovered'>{value.TotalRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='recovered'>{value.NewRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
											</tr>
										)}
									</tbody>
								</Table>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default connect()(Home);