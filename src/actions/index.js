let _id = 3;
export function uniqueId() {
  return _id++;
}

export function createProject({ name, location, dateTime, duration }) {
  this.props.dispatch({
    type: 'CREATE_PROJECT',
    payload: {
      id: uniqueId(),
      name,
      location,
      dateTime,
      duration
    }
  });
}
