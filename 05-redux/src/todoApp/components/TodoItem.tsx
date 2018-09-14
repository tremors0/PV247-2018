import * as React from 'react';
import { ITodoItem } from '../models/ITodoItem';
import { ItemEdit } from './TodoItemEdit';
import { ItemDisplay } from './TodoItemDisplay';

interface IProps {
  readonly index: number;
  readonly todo: ITodoItem;
  readonly onRemove: () => void;
  readonly onEdit: (text: string) => void;
}

interface IState {
  readonly isExpanded: boolean;
}

export class TodoItem extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { isExpanded: false };
  }

  private expand = () => {
    this.setState(_ => ({ isExpanded: true }));
  };

  private collapse = () => {
    this.setState(_ => ({ isExpanded: false }));
  };

  private save = (text: string) => {
    this.props.onEdit(text);
    this.collapse();
  };

  render() {
    const { index, todo } = this.props;

    return (
      <div key={index} className="todo-list__item">
        <div className="todo-list__item-index">{index}.</div>
        {this.state.isExpanded
          ? <ItemEdit todo={todo} onSave={this.save} onCancel={this.collapse}/>
          : <ItemDisplay todo={todo} onClick={this.expand} onRemove={this.props.onRemove}/>
        }
      </div>
    );
  }
}
