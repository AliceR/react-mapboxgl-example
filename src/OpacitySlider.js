import React from 'react'
import Slider from 'material-ui/Slider'

const OpacitySlider = (props) => (
  <div style={{ display: 'flex' }}>
    <p>Opacity: </p>
    <Slider
      defaultValue={0.5}
      value={props.sliderValue}
      onChange={props.handleSlider}
      style={{ width: '60vh' }}
    />
    <p>{props.sliderValue}</p>
  </div>
)

export default OpacitySlider
