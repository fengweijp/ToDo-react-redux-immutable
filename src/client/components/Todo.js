import React, { Component, PropTypes } from 'react';
import { deleteTodo, completeTodo } from 'actions/todos';
import cn from 'classnames';

export default class Todo extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    console.info('ToDo initial render');
  }

  shouldComponentUpdate(nextProps) {
    // immutableJS will change `todo` object reference only if some change occur
    // so it is safe to place equality check on that object
    return this.props.todo !== nextProps.todo;
  }

  componentWillUpdate(nextProps) {
    console.info('ToDo will update - ID: ' + nextProps.todo.get('id'));
  }

  componentWillUnmount() {
    console.info('ToDo unmounting - ID: ' + this.props.todo.get('id'));
  }

  render() {
    const { id, text, isCompleted } = this.props.todo.toObject();
    const classNames = cn('todo', {
      completed: isCompleted,
    });
    return (
      <li className="list-group-item">
        <span className={classNames}
            onClick={() => this.props.dispatch(completeTodo(id, isCompleted))}>
          {text}
        </span>
        <div className="close"
            onClick={() => this.props.dispatch(deleteTodo(id))}>
          &times;
        </div>
      </li>
    );
  }
}
