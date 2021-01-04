import getAuthorization from './authorization'

const queryUnsaUrl = 'https://partials.cuantomefalta.app/query_unsa'
const proxyHack = 'https://cors-anywhere.herokuapp.com/'

const queryUnsa = thisEnv => {
  const date = new Date().toUTCString()
  const defaultHeaders = {
    'content-type': 'application/x-www-form-urlencoded',
    date
  }

  const authorization = getAuthorization(
    'GET',
    queryUnsaUrl,
    defaultHeaders,
    thisEnv.formData
  )

  const url = new URL(proxyHack + queryUnsaUrl)
  Object.keys(thisEnv.formData).forEach(key =>
    url.searchParams.append(key, thisEnv.formData[key])
  )

  fetch(url, {
    headers: {
      ...defaultHeaders,
      Authorization: authorization
    }
  })
    .then(res => {
      if (res.data.error_type) {
        thisEnv.$showMessage('El usuario o contraseña son incorrectos', 'error')
        thisEnv.loading = false
        return
      }
      thisEnv.$store.commit('setCredentials', thisEnv.formData)

      thisEnv.loading = false

      thisEnv.$router.push({
        name: 'Notas',
        params: { user_data: res.data }
      })
    })
    .catch(err => {
      thisEnv.handleError(err)
      thisEnv.loading = false
    })
}

export default queryUnsa
