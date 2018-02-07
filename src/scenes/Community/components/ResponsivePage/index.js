import React from 'react'
import Grid from 'material-ui/Grid'

const ResponsivePage = props => (
  <Grid container>
    <Grid item xs={12} sm={5}>
      {props.left}
    </Grid>
    <Grid xs={12} sm={7} item>
      {props.right}
    </Grid>
  </Grid>
)

export default ResponsivePage
