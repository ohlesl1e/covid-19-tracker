import React from 'react'
import { Image, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap'

export default function About() {
	return (
		<div>
			<Container style={{ maxWidth: '900px' }}>
				<Card>
					<Card.Body>
						<Image
							src={require('./images/profile.jpg')}
							width={180}
							roundedCircle
							style={{ marginBottom: '15px' }}
						/>
						<h2><strong>Zun Zhou</strong></h2>
						<h4 className='text-muted'>Full Stack Developer</h4>
						<p style={{ textAlign: 'left', fontSize: '20px' }}>
							Hi, my name is Zun (Leslie) Zhou. I'm an 4th-year computer science undergraduate student at San Francisco State University.
							I made the website to provide the latest data on the COVID-19 coronavirus for the general public.
                            <br /><br />
                            In this moment of the pandemic, as we're opening the country back up, it is important to look at the data and approach reopening
                            in a safe manner moving forward.
                        </p>
						<h2><strong>Contact</strong></h2>
						<p style={{ fontSize: '20px' }}>
							Connect with me on {' '}
							<a href='https://www.linkedin.com/in/zun-zhou-a85527164'>
								LinkedIn{' '}
								<Image src={require('./images/LI-In-Bug.png')} width={45} />
							</a><br />
                                Email me at{' '}
							<a href='mailto:lesl13_z@protonmail.com'>
								lesl13_z@protonmail.com
                                <Image src={require('./images/secured-by-protonmail-dark.png')} height={45} />
							</a>
						</p>
						<h2><strong>Sources</strong></h2>
						<p style={{ fontSize: '20px' }}>
							<a href='https://www.worldometers.info/coronavirus/'>World Meter</a><br />
							<a href='https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series'>
								Johns Hopkins University
                            </a><br />
							<a href='https://github.com/nytimes/covid-19-data'>New York Times</a><br />
						</p>
					</Card.Body>
				</Card>
			</Container>
		</div>
	)
}
