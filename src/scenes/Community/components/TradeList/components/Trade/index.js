import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = {
  card: {
    maxWidth: 345,
    margin: 10
  }
}

function Trade (props) {
  const { classes } = props
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type='headline' component='h2'>
            {props.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

Trade.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Trade)
