import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Map from './Map'
import Source from './Source'
import Layer from './Layer'
import Basemap from './Basemap'
import OpacitySlider from './OpacitySlider'
import Checkbox from 'material-ui/Checkbox'

class App extends Component {
  state = {
    sliderValue: 0.5,
    teal: {
      isLayerChecked: true
    },
    purple: {
      isLayerChecked: false
    },
    orange: {
      isLayerChecked: false
    }
  }

  handleSlider = (event, value) => {
    this.setState({sliderValue: value});
  }

  handleCheckbox = (event, isInputChecked) => {
    this.setState({
      [event.target.value]: {
        isLayerChecked: isInputChecked
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className='App'>
          <div className='App-header'>
            <h2>A single page application with react and mapbox-gl</h2>
          </div>
          <Map>
            <Source
              id='sourceID'
              url='mapbox://aliceatd2d.1skjaazb'
              layer='railwayLines-2es0gk'
            >
              <Layer
                id='line-layer'
                type='line'
                paint={{
                  'line-color': 'teal'
                }}
                sliderValue={this.state.sliderValue}
                isLayerChecked={this.state.teal.isLayerChecked}
              />
              <Layer
                id='fill-layer'
                type='fill'
                paint={{
                  'fill-color': 'purple'
                }}
                sliderValue={this.state.sliderValue}
                isLayerChecked={this.state.purple.isLayerChecked}
              />
            </Source>
            <Basemap
              isLayerChecked={this.state.orange.isLayerChecked}
            />
          </Map>
          <OpacitySlider
            handleSlider={this.handleSlider}
            sliderValue={this.state.sliderValue}
          />
          <div>
            <Checkbox
              label='Show railway lines'
              onCheck={this.handleCheckbox}
              checked={this.state.teal.isLayerChecked}
              value='teal'
            />
            <Checkbox
              label='Show another layer'
              onCheck={this.handleCheckbox}
              checked={this.state.purple.isLayerChecked}
              value='purple'
            />
            <Checkbox
              label='Paint water orange'
              onCheck={this.handleCheckbox}
              checked={this.state.orange.isLayerChecked}
              value='orange'
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
