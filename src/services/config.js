const devBaseURL = 'http://119.145.21.23:9008/sfrz-manage'
const proBaseURL = ''

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 8000
