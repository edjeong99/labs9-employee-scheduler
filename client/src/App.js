import React, { Component } from 'react'
import axios from 'axios'
import { Global, css } from '@emotion/core'
import { NavLink, Route, Switch } from 'react-router-dom'

import './reset.css'

const serverUrl = process.env.REACT_APP_SERVER_URL

class App extends Component {
  componentDidMount() {
    axios
      .get(serverUrl)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
            }

            * {
              box-sizing: border-box;
            }
          `}
        />
        <h1>hello</h1>
        {/* This Switch should be moved to it's own component because it should
        only be accessible on the calender view */}
        <div>
          <NavLink to="/calendar">Calendar</NavLink>
          <NavLink to="/employees">Employees</NavLink>
          <NavLink to="/shift-scheduler">Create Schedule</NavLink>
          <NavLink to="/billing">Billing</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </div>
      </div>
    )
  }
}

export default App
