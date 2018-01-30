
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = {
  card: {
    maxWidth: 345,
    margin: 10
  },
  text: {
    textDecoration: 'none'
  }
}

function Project (props) {
  const { classes } = props
  return (
    <Card className={classes.card}>
      <CardContent >
        <Typography className={classes.text} component={Link} to={`/projects/${props.id}`}>
          {props.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

Project.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Project)
