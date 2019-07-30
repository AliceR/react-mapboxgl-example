import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Source extends Component {

  static propTypes = {
    isLayerChecked: PropTypes.bool
  }

  static contextTypes = {
    map: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    const { map } = this.context
    const { isLayerChecked } = this.props
    const color = (map.getPaintProperty('water', 'fill-color') === '#ffa500') ? '#cad2d3' : '#ffa500'

    if (nextProps.isLayerChecked !== isLayerChecked) {
      map.setPaintProperty('water', 'fill-color', color)
    }

    return null
  }

  render() {
    return null
  }
}
