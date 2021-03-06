import React from 'react'
import { translate } from 'react-i18next'
import { action, computed, extendObservable, reaction } from 'mobx'
import { inject, observer } from 'mobx-react'

/** Ant Design */
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import message from 'antd/lib/message'

@translate(['common'])
@inject('rpc', 'wallet')
@observer
class WalletPassphraseChange extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
    this.rpc = props.rpc
    this.wallet = props.wallet
    this.walletPassphraseChange = this.walletPassphraseChange.bind(this)

    /** Errors that will be shown to the user. */
    this.errShow = ['ppIncorrect', 'ppEqual', 'ppNotMatching']

    /** Extend the component with observable properties. */
    extendObservable(this, { current: '', next: '', repeat: '', rpcError: '' })

    /** Clear previous RPC error on current passphrase change. */
    this.ppReaction = reaction(
      () => this.current,
      current => {
        if (this.rpcError !== false) this.setProps({ rpcError: '' })
      },
      { name: 'WalletPassChange: pass changed, clearing previous RPC error.' }
    )
  }

  /** Dispose of reaction on component unmount. */
  componentWillUnmount() {
    this.ppReaction()
  }

  /**
   * Get present error or empty string if none.
   * @function errorStatus
   * @return {string} Error status.
   */
  @computed
  get errorStatus() {
    const len = {
      old: this.current.length,
      next: this.next.length,
      repeat: this.repeat.length
    }

    if (len.old < 1 || len.next < 1 || len.repeat < 1) return 'emptyFields'
    if (this.next === this.current) return 'ppEqual'
    if (len.next !== len.repeat) return 'differentLengths'
    if (this.next !== this.repeat) return 'ppNotMatching'
    if (this.rpcError !== '') return this.rpcError
    return ''
  }

  /**
   * Set observable properties.
   * @function setProps
   * @param {object} props - Key value combinations.
   */
  @action
  setProps = props => {
    Object.keys(props).forEach(key => (this[key] = props[key]))
  }

  /**
   * Change wallet passphrase.
   * @function walletPassphraseChange
   */
  async walletPassphraseChange() {
    const res = await this.rpc.walletPassphraseChange(this.current, this.next)

    if ('result' in res) {
      this.wallet.updateLockStatus()
      this.setProps({ current: '', next: '', repeat: '' })
      message.success(this.t('ppChanged'))
    }

    if ('error' in res) {
      switch (res.error.code) {
        case -14:
          return this.setProps({ rpcError: 'ppIncorrect' })
      }
    }
  }

  render() {
    /** Do not render if the wallet is not encrypted. */
    if (this.wallet.isEncrypted === false) return null
    return (
      <div>
        <div className="flex">
          <i className="material-icons md-16">vpn_key</i>
          <p>{this.t('ppChangeDesc')}</p>
        </div>
        <div className="flex-sb" style={{ margin: '15px 0 5px 0' }}>
          <p style={{ width: '140px' }}>{this.t('pp')}</p>
          <Input
            onChange={e => this.setProps({ current: e.target.value })}
            placeholder={this.t('ppDesc')}
            style={{ flex: 1 }}
            type="password"
            value={this.current}
          />
        </div>
        <div className="flex-sb">
          <p style={{ width: '140px' }}>{this.t('ppNew')}</p>
          <Input
            onChange={e => this.setProps({ next: e.target.value })}
            placeholder={this.t('ppNewDesc')}
            style={{ flex: 1 }}
            type="password"
            value={this.next}
          />
        </div>
        <div className="flex-sb" style={{ margin: '5px 0 10px 0' }}>
          <p style={{ width: '140px' }}>{this.t('ppRepeat')}</p>
          <Input
            onChange={e => this.setProps({ repeat: e.target.value })}
            placeholder={this.t('ppRepeatDesc')}
            style={{ flex: 1 }}
            type="password"
            value={this.repeat}
          />
        </div>
        <div className="flex-sb">
          <p className="red" style={{ margin: '0 0 0 140px' }}>
            {this.errShow.includes(this.errorStatus) === true &&
              this.t(this.errorStatus)}
          </p>
          <Button
            disabled={this.errorStatus !== ''}
            onClick={this.walletPassphraseChange}
          >
            {this.t('ppChange')}
          </Button>
        </div>
      </div>
    )
  }
}

export default WalletPassphraseChange
