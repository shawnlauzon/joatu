import React from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'

class Offers extends React.Component {
  constructor () {
    super()
    this.state = {
      value: 0
    }

    this.handleChange = (event, value) => {
      this.setState({ value })
    }
  }

  render () {
    const { value } = this.state

    return (
      <div>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label='Projects' />
          <Tab label='Trades' />
        </Tabs>
        {this.props.children[value]}
      </div>
    )
  }
}

export default Offers
