// @flow

import React, { Component } from 'react'

type AppPropsType = {
  getGreeting: () => Promise<{ greeting: string }>,
}

export default class Fetcher extends Component {
  props: AppPropsType;
  state: Object;
  onSubmit: () => {};

  constructor() {
    super()
    this.state = {
      greeting: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e: Event) {
    e.preventDefault()
    this.setState({ greeting: '...loading' })
    this.props.getGreeting()
      .then(data => this.setState(data))
      .catch(err => this.setState({ greeting: err.message }))
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <button>Get greeting</button>
        <h1>{this.state.greeting}</h1>
      </form>
    )
  }
}
