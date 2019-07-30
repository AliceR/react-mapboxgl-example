import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Source extends Component {

  static propTypes = {
    id: PropTypes.string,
    url: PropTypes.string,
    layer: PropTypes.string,
    children: PropTypes.node
  }

  static contextTypes = {
    map: PropTypes.object
  }

  componentWillMount() {
    const { map } = this.context
    const {
      id,
      url
    } = this.props

    map.addSource(id, { type: 'vector', url })
  }

  componentWillUnmount() {
    const { map } = this.context
    const { id } = this.props
    map.removeSource(id)
  }

  render() {
    return (
      <div>
        {this.props.children &&
          React.Children.map(this.props.children, child => (
            React.cloneElement(child, {
              sourceId: this.props.id,
              sourceLayer: this.props.layer
            })
          ))
        }
      </div>
    )
  }
}
