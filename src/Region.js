import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Table, Card, Container, Spinner } from 'react-bootstrap'
import { setCountryCode } from './redux/actions/countryAction';
import { Link } from 'react-router-dom';

const Region = ({ region, dispatch }) => {
	const [all, setall] = useState('')
	const [countries, setcountries] = useState([])
	const [loading, setloading] = useState(true)
	useEffect(() => {
		window.scrollTo(0,0)
		axios.get(`https://corona.lmao.ninja/v2/continents/${region}?yesterday&strict=false`)
			.then(res => {
				const alldata = res.data
				alldata.cases = alldata.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				alldata.todayCases = alldata.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				alldata.deaths = alldata.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				alldata.todayDeaths = alldata.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				alldata.recovered = alldata.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				alldata.tests = alldata.tests.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				alldata.critical = alldata.critical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				alldata.active = alldata.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				setall(alldata)
				axios.get(`https://corona.lmao.ninja/v2/countries/${res.data.countries.toString()}?yesterday`)
					.then(result => {
						const fetchData = result.data
						fetchData.sort((a, b) => b.cases - a.cases)
						setcountries(fetchData)
						setloading(false)
					}).catch(err => console.log(err))
			}).catch(e => console.log(e))
	}, [region])

	if (region === '') {
		return <Redirect to='/' />
	}

	return (
		<div>
			<Container fluid>
				<Card>
					<Card.Body>
						<Card.Title><h2>{all.continent} COVIS-19 Stats</h2>{loading && <Spinner animation="border" />}</Card.Title>
						<Table responsive striped>
							<thead>
								<tr>
									<td>NAME</td>
									<td>CONFIRMED</td>
									<td>CHANGES</td>
									<td>CRITICAL</td>
									<td>DEATHS</td>
									<td>CHANGES</td>
									<td>TESTS</td>
									<td>ACTIVE</td>
									<td>RECOVERED</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>TOTAL</td>
									<td className='confirmed'>{all.cases}</td>
									<td className='confirmed'>{all.todayCases}</td>
									<td className='critical'>{all.critical}</td>
									<td className='deaths'>{all.deaths}</td>
									<td className='deaths'>{all.todayDeaths}</td>
									<td className='test'>{all.tests}</td>
									<td className='active'>{all.active}</td>
									<td className='recovered'>{all.recovered}</td>
								</tr>
								{countries.map((value, i) =>
									<tr key={i}>
										<td>
											<Link to='/country' onClick={() => dispatch(setCountryCode(value.country))}>
												{value.country}
											</Link>
										</td>
										<td className='confirmed'>{value.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
										<td className='confirmed'>{value.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
										<td className='critical'>{value.critical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
										<td className='deaths'>{value.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
										<td className='deaths'>{value.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
										<td className='test'>{value.tests.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
										<td className='active'>{value.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
										<td className='recovered'>{value.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
									</tr>
								)}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Container>
		</div>
	)
}

const mapStateToProps = (state) => ({
	region: state.countryReducer.region
})

export default connect(mapStateToProps)(Region)
