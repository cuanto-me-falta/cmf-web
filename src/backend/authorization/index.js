import HmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import url from 'url'

const composeStringToSign = (method, path, headers, params) => {
  const contentMD5 = headers['content-md5'] || ''
  const contentType = headers['content-type'] || ''
  const signHeaders = '' //  Only if 'x-fc-' headers
  const date = headers['date']

  const u = url.parse(path)
  const pathUnescaped = decodeURIComponent(u.pathname)
  var str = `${method}\n${contentMD5}\n${contentType}\n${date}\n${signHeaders}${pathUnescaped}`

  if (params) {
    var paramsArray = []
    Object.keys(params).forEach(function(key) {
      var values = params[key]
      var type = typeof values
      if (type === 'string') {
        paramsArray.push(`${key}=${values}`)
        return
      }
      if (Array.isArray(values)) {
        params[key].forEach(function(value) {
          paramsArray.push(`${key}=${value}`)
        })
      }
    })
    paramsArray.sort()
    str += '\n' + paramsArray.join('\n')
  }
  return str
}

const signString = (source, secret) => {
  const wordArrayEncoding = HmacSHA256(source, secret)
  return Base64.stringify(wordArrayEncoding)
}

/**
 * getAuthorization: Returns Authorization header
 *
 * @param {String} accessKeyID
 * @param {String} accessKeySecret
 * @param {String} method : GET/POST/PUT/DELETE/HEAD
 * @param {String} path /query_unsa
 * @param {json} headers : { date : 'Sun, 03 Jan 2021 22:38:10 GMT' }
 * @param {json} params : { user : 'piticlin', password: 'NotBigEnough' }
 */
const getAuthorization = (method, path, headers, params) => {
  const accessKeyID = process.env.VUE_APP_ACCESS_KEY_ID
  const accessKeySecret = process.env.VUE_APP_ACCESS_KEY_SECRET
  console.log('accessKeyID: ', accessKeyID)
  console.log('accessKeySecret: ', accessKeySecret)
  var stringToSign = composeStringToSign(method, path, headers, params)
  console.log('stringToSign: %s', stringToSign)
  var sign = signString(stringToSign, accessKeySecret)
  return `FC ${accessKeyID}:${sign}`
}

export default getAuthorization
