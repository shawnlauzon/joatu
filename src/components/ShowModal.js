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
  top: '35%',
  left: '50%',
  marginLeft: -200,
  marginTop: -100
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
