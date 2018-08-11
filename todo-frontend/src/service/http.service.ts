import * as axios from 'axios'
import environments from '../environments/environments'

interface IHeader {
  'x-access-token'?: string
}

export default class HttpService {

  private buildHeader(token?: string): IHeader {
    const header = token ? { 'x-access-token': token } : {}
    return header
  }

  public httpGet(uri: string, token?: string): Promise<axios.AxiosResponse> {
    const headers = this.buildHeader(token)
    return axios.default.get(environments.apiBaseURI + uri, { headers })
  }

  public httpPost(uri: string, body: object, token?: string): Promise<axios.AxiosResponse> {
    const headers = this.buildHeader(token)
    return axios.default.post(environments.apiBaseURI + uri, body, { headers })
  }

  public httpPut(uri: string, body: object, token?: string): Promise<axios.AxiosResponse> {
    const headers = this.buildHeader(token)
    return axios.default.put(environments.apiBaseURI + uri, body, { headers })
  }

  public httpDelete(uri: string, body: object, token?: string): Promise<axios.AxiosResponse> {
    const headers = this.buildHeader(token)
    return axios.default.delete(environments.apiBaseURI + uri, { headers })
  }

}
