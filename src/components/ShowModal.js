import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Modal from 'material-ui/Modal'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

const getModalStyle = () => ({
  width: 400,
  height: 250,
  top: '50%',
  left: '50%',
  marginLeft: -200,
  marginTop: -125
})

class ShowModal extends Component {
  state = {
    open: true
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props

    return (
      <Modal open={this.state.open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          {this.props.children}
        </div>
      </Modal>
    )
  }
}

ShowModal.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ShowModal)
