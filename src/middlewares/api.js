export default store => next => action => {
  const { callAPI } = action
  return !callAPI ? next(action) :
    fetch(callAPI)
      .then(res => res.json())
      .then(response => next({ ...action, response }))
}