import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { AreaChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, Area, BarChart, Bar } from 'recharts'
import { Pie } from 'react-chartjs-2'

const Country = ({ countryCode }) => {
	const [country, setcountry] = useState('')
	const [data, setdata] = useState([])
	const [conRec, setconRec] = useState({})
	const [conDeath, setconDeath] = useState({})
	const [recDeath, setrecDeath] = useState({})
	const [twoWeeks, settwoWeeks] = useState([])
	const [oneWeek, setoneWeek] = useState([])

	useEffect(() => {
		axios.get(`https://corona.lmao.ninja/v2/historical/${countryCode}?lastdays=all`)
			.then(res => {
				const fetchData = res.data.timeline
				const timeline = Object.keys(fetchData.cases)
				const newdata = []
				for (const date of timeline) {
					newdata.push({
						date: date,
						confirmed: fetchData.cases[date],
						deaths: fetchData.deaths[date],
						recovered: fetchData.recovered[date]
					})
				}
				setdata(newdata)
			}).catch(e => console.log(e))

		axios.get(`https://corona.lmao.ninja/v2/historical/${countryCode}?lastdays=14`)
			.then(res => {
				console.log(res.data)
				const fetchData = res.data.timeline
				const timeline = Object.keys(fetchData.cases)
				const newdata = []
				for (const date of timeline) {
					newdata.push({
						date: date,
						confirmed: fetchData.cases[date],
						deaths: fetchData.deaths[date],
						recovered: fetchData.recovered[date]
					})
				}
				settwoWeeks(newdata)
			}).catch(e => console.log(e))

		axios.get(`https://corona.lmao.ninja/v2/historical/${countryCode}?lastdays=7`)
			.then(res => {
				console.log(res.data)
				const fetchData = res.data.timeline
				const timeline = Object.keys(fetchData.cases)
				const newdata = []
				for (const date of timeline) {
					newdata.push({
						date: date,
						confirmed: fetchData.cases[date],
						deaths: fetchData.deaths[date],
						recovered: fetchData.recovered[date]
					})
				}
				setoneWeek(newdata)
			}).catch(e => console.log(e))

		axios.get(`https://corona.lmao.ninja/v2/countries/${countryCode}?yesterday=true&strict=true&query `)
			.then(res => {
				const summary = res.data
				summary.cases = summary.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				summary.todayCases = summary.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				summary.deaths = summary.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				summary.todayDeaths = summary.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				summary.recovered = summary.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				summary.tests = summary.tests.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				summary.critical = summary.critical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				summary.active = summary.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				setcountry(summary)
				const confirmed = parseInt(res.data.cases.replace(/,/g, ''))
				const deaths = parseInt(res.data.deaths.replace(/,/g, ''))
				const recovered = parseInt(res.data.recovered.replace(/,/g, ''))

				setconRec({
					labels: ['confirmed', 'recovered'],
					datasets: [
						{
							label: 'Confirmed/Recovered',
							data: [
								confirmed,
								recovered,
							],
							backgroundColor: [
								'rgba(60, 179, 113, 1)',
								'rgba(30, 144, 255, 1)'
							],
						},
					]
				})

				setconDeath({
					labels: ['confirmed', 'deaths'],
					datasets: [
						{
							label: 'Confirmed/Deaths',
							data: [
								confirmed,
								deaths
							],
							backgroundColor: [
								'rgba(60, 179, 113, 1)',
								'rgba(255, 99, 71, 1)'
							]
						}
					]
				})

				setrecDeath({
					labels: ['recovered', 'deaths'],
					datasets: [
						{
							label: 'Recovered/Deaths',
							data: [
								recovered,
								deaths
							],
							backgroundColor: [
								'rgba(30, 144, 255, 1)',
								'rgba(255, 99, 71, 1)'
							]
						}
					]
				})

			}).catch(e => console.log(e))

	}, [countryCode])
	if (countryCode === '') {
		return <Redirect to='/' />
	}
	return (
		<div>
			<h2>{countryCode} COVID-19 Stats</h2>
			<Container fluid>
				<Row>
					<Col md='8'>
						<Card>
							<Card.Body>
								<Card.Title><h3>Full Timeline</h3></Card.Title>
								<ResponsiveContainer width='100%' height={720}>
									<AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='date' />
										<YAxis />
										<Tooltip />
										<Legend />
										<Area type='monotone' dataKey='confirmed' stroke='#3CB371' fill='#3CB371' />
										<Area type='monotone' dataKey='recovered' stroke='#1E90FF' fill='#1E90FF' />
										<Area type='monotone' dataKey='deaths' stroke='#FF6347' fill='#FF6347' />
									</AreaChart>
								</ResponsiveContainer>
							</Card.Body>
						</Card>
					</Col>
					<Col md='4'>
						<Card>
							<Card.Body>
								<Card.Title><h3>Summary</h3></Card.Title>
							</Card.Body>
							<ListGroup className="list-group-flush">
								<ListGroupItem>Total confirmed: <h4 className='confirmed'>{country.cases}</h4></ListGroupItem>
								<ListGroupItem>New confirmed: <h4 className='confirmed'>{country.todayCases}</h4></ListGroupItem>
								<ListGroupItem>Total deaths: <h4 className='deaths'>{country.deaths}</h4></ListGroupItem>
								<ListGroupItem>New deaths: <h4 className='deaths'>{country.todayDeaths}</h4></ListGroupItem>
								<ListGroupItem>Total recovered: <h4 className='recovered'>{country.recovered}</h4></ListGroupItem>
								<ListGroupItem>Total tests: <h4 className='test'>{country.tests}</h4></ListGroupItem>
								<ListGroupItem>Active: <h4 className='active'>{country.active}</h4></ListGroupItem>
								<ListGroupItem>Critical: <h4 className='critical'>{country.critical}</h4></ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
				<br />
				<h3>Ratios</h3>
				<Row>
					<Col md='4'>
						<Pie
							data={conRec}
							height={400}
							options={{
								responsive: true,
								title: {
									text: 'Confirmed/Recovered',
									display: true,
									fontSize: 24
								},
							}}
						/>
					</Col>
					<Col md='4'>
						<Pie
							data={conDeath}
							height={400}
							options={{
								responsive: true,
								title: {
									text: 'Confirmed/Deaths',
									display: true,
									fontSize: 24
								},
							}}
						/>
					</Col>
					<Col md='4'>
						<Pie
							data={recDeath}
							height={400}
							options={{
								responsive: true,
								title: {
									text: 'Recovered/Deaths',
									display: true,
									fontSize: 24
								},
							}}
						/>
					</Col>
				</Row>
				<Row>
					<Col md='6'>
						<h3>Last 14 days</h3>
						<ResponsiveContainer width='100%' height={720}>
							<BarChart data={twoWeeks} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='date' />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey='deaths' stackId='a' fill='#FF6347' />
								<Bar dataKey='recovered' stackId='a' fill='#1E90FF' />
								<Bar dataKey='confirmed' stackId='a' fill='#3CB371' />
							</BarChart>
						</ResponsiveContainer>
					</Col>
					<Col md='6'>
						<h3>Last 7 days</h3>
						<ResponsiveContainer width='100%' height={720}>
							<BarChart data={oneWeek} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='date' />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey='deaths' stackId='a' fill='#FF6347' />
								<Bar dataKey='recovered' stackId='a' fill='#1E90FF' />
								<Bar dataKey='confirmed' stackId='a' fill='#3CB371' />
							</BarChart>
						</ResponsiveContainer>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

const mapStateToProps = (state) => ({
	countryCode: state.countryReducer.countryCode
})

export default connect(mapStateToProps)(Country)
