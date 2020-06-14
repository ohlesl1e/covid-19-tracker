import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Table, Spinner } from 'react-bootstrap'
import { setCountryCode, setRegion } from './redux/actions/countryAction';
import { Link } from 'react-router-dom';

const Home = ({ dispatch }) => {
	const [totalConfirmed, settotalConfirmed] = useState('')
	const [totalDeaths, settotalDeaths] = useState('')
	const [totalRecovered, settotalRecovered] = useState('')
	const [newConfirmed, setnewConfirmed] = useState('')
	const [newDeaths, setnewDeaths] = useState('')
	const [countries, setcountries] = useState([])
	const [date, setdate] = useState('')
	const [region, setregion] = useState([])
	const [usa, setusa] = useState([])
	const [loading, setloading] = useState(true)
	useEffect(() => {
		axios.get('https://corona.lmao.ninja/v2/all?yesterday')
			.then(res => {
				settotalConfirmed(res.data.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				setnewConfirmed(res.data.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				settotalDeaths(res.data.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				setnewDeaths(res.data.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				settotalRecovered(res.data.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
				const updateDate = new Date(res.data.updated)
				setdate(`${updateDate.getMonth() + 1}/${updateDate.getDate()}/${updateDate.getFullYear()} ${updateDate.getHours()}:${updateDate.getMinutes()}:${updateDate.getSeconds()}`)
			}).catch(e => console.log(e))

		axios.get('https://corona.lmao.ninja/v2/countries?yesterday&sort')
			.then(res => {
				const fetchCountries = res.data
				fetchCountries.sort((a, b) => b.cases - a.cases)
				setcountries(fetchCountries)
				setloading(false)
			}).catch(e => console.log(e))

		axios.get('https://corona.lmao.ninja/v2/continents?yesterday=true&sort')
			.then(res => {
				setregion(res.data)
			}).catch(e => console.log(e))

		axios.get('https://corona.lmao.ninja/v2/states?sort&yesterday')
			.then(res => {
				setusa(res.data)
			}).catch(e => console.log(e))
	}, [])
	return (
		<div>
			<Container fluid>
				<Row>
					<Col lg='5'>
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
							</ListGroup>
						</Card>
						<br />
						<Card>
							<Card.Body>
								<Card.Title><h2>Region COVID-19 Stats</h2></Card.Title>
								<Table responsive size='sm' striped style={{ textAlign: 'left' }}>
									<thead>
										<tr>
											<td>REGION</td>
											<td>CONFIRMED</td>
											<td>DEATHS</td>
											<td>RECOVERED</td>
										</tr>
									</thead>
									<tbody>
										{region.map((value, i) =>
											<tr key={i}>
												<td>
													<Link to='/region' onClick={() => dispatch(setRegion(value.continent.substr(0, 4)))}>
														{value.continent}
													</Link>
												</td>
												<td className='confirmed'>{value.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='deaths'>{value.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='recovered'>{value.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
											</tr>
										)}
									</tbody>
								</Table>
							</Card.Body>
						</Card><br />
						<Card>
							<Card.Body>
								<Card.Title><h2>USA COVID-19 Stats</h2></Card.Title>
								<Table responsive size='sm' striped style={{ textAlign: 'left' }}>
									<thead>
										<tr>
											<td>STATE</td>
											<td>CONFIRMED</td>
											<td>CHANGES</td>
											<td>DEATHS</td>
											<td>ACTIVE</td>
											<td>TESTS</td>
										</tr>
									</thead>
									<tbody>
										{usa.map((value, i) =>
											<tr key={i}>
												<td>{value.state}</td>
												<td className='confirmed'>{value.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='confirmed'>{value.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='deaths'>{value.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='active'>{value.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='test'>{value.tests.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
											</tr>
										)}
									</tbody>
								</Table>
							</Card.Body>
						</Card><br />
					</Col>
					<Col lg='7'>
						<Card>
							<Card.Body>
								<Card.Title><h2>World COVID-19 Stats</h2>{loading && <Spinner animation='border' />}</Card.Title>
								<Table responsive striped size='sm' style={{ textAlign: 'left' }}>
									<thead>
										<tr>
											<th>NAME</th>
											<th>CONFIRMED</th>
											<th>CHANGES</th>
											<th>DEATHS</th>
											<th>CHANGES</th>
											<th>RECOVERED</th>
										</tr>
									</thead>
									<tbody style={{ overflowy: 'scroll' }}>
										<tr>
											<td>{!loading && 'TOTAL'}</td>
											<td className='confirmed'>{totalConfirmed}</td>
											<td className='confirmed'>{newConfirmed}</td>
											<td className='deaths'>{totalDeaths}</td>
											<td className='deaths'>{newDeaths}</td>
											<td className='recovered'>{totalRecovered}</td>
										</tr>
										{countries.map((value, i) =>
											<tr key={i}>
												<td><Link to='/country' onClick={() => dispatch(setCountryCode(value.country))}>{value.country}</Link></td>
												<td className='confirmed'>{value.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='confirmed'>{value.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='deaths'>{value.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='deaths'>{value.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
												<td className='recovered'>
													{value.recovered === 0 ?
														'Unknown' :
														value.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
												</td>
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