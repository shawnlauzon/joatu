import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = {
  card: {
    margin: 10
  },
  text: {
    textDecoration: 'none'
  }
}

function ButtonOffering (props) {
  const { classes } = props
  return (
    <Card className={classes.card}>
      <CardContent >
        <Typography className={classes.text} component={Link} to={props.to}>
          {props.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

ButtonOffering.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonOffering)
