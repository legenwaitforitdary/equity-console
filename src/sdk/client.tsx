import Connection from './connection'
import transactionsAPI from './transactions'

class Client {
  connection: Connection
  transactions: Object

  constructor(opts = {}) {
    const option = (opts as any);
    this.connection = new Connection(option.url, option.accessToken, option.agent)
    this.transactions = transactionsAPI(this)
  }

  public compile(contract, args: any = null) {
    return this.connection.request('/compile', {contract, args})
  }

  public listAccounts() {
    return this.connection.request('/list-accounts')
  }

  public listAssets() {
    return this.connection.request('/list-assets')
  }

  public listBalances() {
    return this.connection.request('/list-balances')
  }

  public listAddress(accountId) {
    return this.connection
      .request('/list-addresses', {account_id: accountId})
      .then(resp => resp.data)
  }

  public createAccountPubkey(accountId) {
    return this.connection
      .request('/list-pubkeys', {account_id: accountId})
      .then(resp => resp.data)
  }

  public createReceiver(accountId) {
    return this.connection
      .request('/create-account-receiver', {account_id: accountId})
      .then(resp => resp.data)
  }

  public listUpspentUtxos(params) {
    return this.connection.request('/list-unspent-outputs', params).then(resp => {
      if (resp.status === 'success') {
        return resp.data
      } else {
        return []
      }
    })
  }

  public decodeProgram(params) {
    return this.connection.request('/decode-program', {program: params}).then(resp => {
      if (resp.status === 'success') {
        return resp.data
      } else {
        return []
      }
    })
  }

  public listReceiver(accountId) {
    return this.listAddress(accountId).
      then(resp =>{
        if(resp.length === 0){
          return this.createReceiver(accountId)
        }else{
          return resp[0]
        }
    })
  }
}

export default Client
