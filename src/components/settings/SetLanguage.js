import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'

/** Ant Design */
import Select from 'antd/lib/select'

@translate(['common'])
@inject('gui')
@observer
class SetLanguage extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
    this.gui = props.gui
  }

  render() {
    return (
      <Select
        defaultValue={this.gui.language}
        notFoundContent={this.t('notFound')}
        onChange={language => this.gui.setLanguage(language)}
        optionFilterProp="children"
        showSearch
        size="small"
        style={{ width: '110px' }}
      >
        {this.gui.languages.map(entry => (
          <Select.Option key={entry.language} value={entry.language}>
            {entry.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}

export default SetLanguage
