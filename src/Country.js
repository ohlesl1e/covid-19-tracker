import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const Country = ({ countryCode }) => {
    const [data, setdata] = useState([])
    useEffect(() => {
        axios.get(`https://api.covid19api.com/total/dayone/country/${countryCode}`)
            .then(res => {
                console.log(res.data)
                const fetchData = res.data
                for (const element of fetchData) {
                    element.Date = element.Date.substr(0, 10)
                }
                setdata(fetchData)
            }).catch(e => console.log(e))

    }, [countryCode])
    if (countryCode === '') {
        return <Redirect to='/' />
    }
    return (
        <div>
            <Container fluid>
                <Row>
                    <ResponsiveContainer width='100%' height={720}>
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='Date' />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type='monotone' dataKey='Confirmed' stroke='#3CB371' />
                            <Line type='monotone' dataKey='Deaths' stroke='#FF6347' />
                            <Line type='monotone' dataKey='Recovered' stroke='#1E90FF' />
                        </LineChart>
                    </ResponsiveContainer>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    countryCode: state.countryReducer.countryCode
})

export default connect(mapStateToProps)(Country)
