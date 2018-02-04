import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Modal from 'material-ui/Modal'
import ButtonBase from 'material-ui/ButtonBase'

import loginWithFacebook from './loginWithFacebook.png'

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

  handleClose = () => {
    this.setState({ open: false })
  }

  handleLogin = () => {
    this.props.auth.loginWithFacebook().then(() => {
      this.setState({ open: false })
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Modal
        className={classes.modal}
        open={this.state.open}
        onClose={this.handleClose}
      >
        <div className={classes.paper}>
          <Typography type="title" id="modal-title">
            Choose your provider
          </Typography>
          <div>
            <ButtonBase className={classes.button} onClick={this.handleLogin}>
              <img
                height={32}
                width={196}
                alt="Login with Facebook"
                src={loginWithFacebook}
              />
            </ButtonBase>
          </div>
        </div>
      </Modal>
    )
  }
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginModal)
