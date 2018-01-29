import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const data = {
  'communities': [
    {
      'id': 1,
      'name': 'Laurier',
      'projects': [
        {
          'id': 0,
          'name': 'Clean Park',
          'location': 'Sir Wilfrid Laurier Park',
          'start': '2018-02-03T19:00:00Z',
          'duration': '120',
          'map_coords': 'Sir+Wilfrid+Laurier+Park/@45.5322995,-73.5897065,17z',
          'organizer': 0,
          'participants': [
            0,
            1
          ]
        },
        {
          'id': 1,
          'name': 'Plant Garden',
          'location': 'Sir Wilfrid Laurier Park',
          'start': '2018-02-03T19:00:00Z',
          'duration': '120',
          'map_coords': 'Sir+Wilfrid+Laurier+Park/@45.5322995,-73.5897065,17z',
          'organizer': 0,
          'participants': [
            0,
            1
          ]
        }
      ],
      'trades': [
        {
          'id': 0,
          'name': 'Ukelele Lessons',
          'seller': 1
        },
        {
          'id': 1,
          'name': 'Vegan Cookies',
          'seller': 0
        },
        {
          'id': 2,
          'name': 'Babysitting',
          'seller': 0
        }
      ]
    }
  ],
  'users': [
    {
      'id': 0,
      'name': 'Shawn Lauzon',
      'email': 'shawn.lauzon@gmail.com'
    },
    {
      'id': 1,
      'name': 'Jamie Klinger',
      'email': 'teddyrux@gmail.com'
    }
  ]
}

ReactDOM.render(<App data={data} />, document.getElementById('root'))
registerServiceWorker()
