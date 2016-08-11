// @flow

import React, { Component } from 'react'

type CounterPropsType = {
  increment: number,
  color?: string,
}

export default class Counter extends Component {
  static defaultProps: {};
  state: Object;
  props: CounterPropsType;
  interval: number;

  constructor(props: CounterPropsType) {
    super(props)
    this.state = { counter: 0 }
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment,
    })
  }

  render() {
    return (
      <h1 style={{ color: this.props.color, background: 'transparent' }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    )
  }
}
