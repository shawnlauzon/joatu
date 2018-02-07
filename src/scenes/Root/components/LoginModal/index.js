import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Modal from 'material-ui/Modal'
import ButtonBase from 'material-ui/ButtonBase'

import loginWithFacebookButton from './loginWithFacebook.png'

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

function LoginModal(props) {
  const { classes } = props

  return (
    <Modal className={classes.modal} open={props.open} onClose={props.onClose}>
      <div className={classes.paper}>
        <div>
          <ButtonBase
            className={classes.button}
            onClick={() => props.onLogin('facebook')}
          >
            <img
              height={32}
              width={196}
              alt="Login with Facebook"
              src={loginWithFacebookButton}
            />
          </ButtonBase>
        </div>
      </div>
    </Modal>
  )
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginModal)
