/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions';

class App extends Component {
  static propTypes = {
    todos  : PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render () {
    const { todos, actions } = this.props;

    return (
      <div className="todoapp">
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
