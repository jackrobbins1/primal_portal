'use strict'

import React, { Component } from 'react'
import reactCSS from 'reactcss'
import { HuePicker } from 'react-color'

class ColorPicker extends Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          margin: 'auto 0 auto 0',
          cursor: 'pointer',
        },
        // popover: {
        //   position: 'absolute',
        //   zIndex: '2',
        // },
        // cover: {
        //   position: 'fixed',
        //   top: '0px',
        //   right: '0px',
        //   bottom: '0px',
        //   left: '0px',
        // },
        popover: {
          position: 'relative',
          zIndex: '2',
          margin: 'auto 0 auto 15px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div className="colorContainer">
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <HuePicker color={ this.state.color } onChange={ this.handleChange }  height={"24px"}/>
        </div> : null }

      </div>
    )
    // return (
    //   <div className="colorContainer">
    //     <div style={ styles.swatch } >
    //       <div style={ styles.color } />
    //     </div>
    //     <div style={ styles.popover }>
    //       <div style={ styles.cover } />
    //       <HuePicker color={ this.state.color } onChange={ this.handleChange } />
    //     </div>

    //   </div>
    // )
  }
}

export default ColorPicker