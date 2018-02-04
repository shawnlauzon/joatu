import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Modal from 'material-ui/Modal'
import Button from 'material-ui/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  modal: {
    position: 'fixed',
    top: 100,
    left: 100
  },
  paper: {
    position: 'fixed',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.show || false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.show })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleCancel = () => {
    this.setState({ open: false })
  }

  handleLogin = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props

    return (
      <Modal
        className={classes.modal}
        open={this.state.open}
        onClose={this.handleCancel}
      >
        <div className={classes.paper}>
          <Typography type="title" id="modal-title">
            Enter your name
          </Typography>
          <div>
            <TextField id="name" label="Name" autoFocus required />
          </div>
          <div>
            <Button className={classes.button} onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button
              className={classes.button}
              raised
              color="primary"
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </Modal>
    )
  }
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginModal)
