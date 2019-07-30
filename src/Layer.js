import { Component } from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash.merge'

export default class Layer extends Component {

  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    sourceLayer: PropTypes.string,
    sourceId: PropTypes.string,
    paint: PropTypes.object,
    layout: PropTypes.object,
    before: PropTypes.string
  }

  static contextTypes = {
    map: PropTypes.object,
  }

  componentWillMount() {
    const { map } = this.context
    const {
      id,
      type,
      sourceLayer,
      sourceId,
      layout = {},
      paint = {},
      sliderValue,
      isLayerChecked,
      before
    } = this.props

    const layerId = `${sourceId}-${id}`
    const opacity = `${type}-opacity`

    map.addLayer({
      id: layerId,
      source: sourceId,
      'source-layer': sourceLayer,
      type,
      layout,
      paint: merge(paint, {
        [opacity]: sliderValue
      })
    }, before)

    if(!isLayerChecked) map.setLayoutProperty(layerId, 'visibility', 'none')
  }

  componentWillReceiveProps(nextProps) {
    const { map } = this.context
    const { id, type, sourceId, sliderValue, isLayerChecked } = this.props
    const layerId = `${sourceId}-${id}`

    if (nextProps.sliderValue && nextProps.sliderValue !== sliderValue) {
      map.setPaintProperty(layerId, `${type}-opacity`, nextProps.sliderValue)
    }
    if (nextProps.isLayerChecked !== isLayerChecked) {
      const visibility = (nextProps.isLayerChecked) ? 'visible' : 'none'
      map.setLayoutProperty(layerId, 'visibility', visibility)
    }

    return null
  }

  componentWillUnmount() {
    const { map } = this.context
    const { id, sourceId } = this.props
    const layerId = `${sourceId}-${id}`
    map.removeLayer(layerId)
  }

  render() {
    return null
  }
}
