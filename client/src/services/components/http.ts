import axios, { AxiosInstance,  } from 'axios'

class Http {
  intance: AxiosInstance
  // private token: string
  constructor() {
    // this.token = getAccessTokenFromLS()
    this.intance = axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    })

  }
}

const http = new Http().intance
export default http