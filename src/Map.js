import React from 'react'

export default function Map() {
    return (
        <div>
            <iframe
                src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=map"
                title='Covid-19 Map'
                loading='lazy'
                width='100%'
                height='720px'
                style={{ border: 'none' }}
            ></iframe>
        </div>
    )
}
