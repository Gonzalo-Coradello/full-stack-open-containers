import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../Todos/Todo';

describe('Todo', () => {
  let todo;
  let onClickComplete;
  let onClickDelete;

  beforeEach(() => {
    todo = {
      text: 'Write tests',
      done: false
    }

    onClickComplete = vi.fn();
    onClickDelete = vi.fn();
  });

  it('should render correctly', () => {
    render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />);

    const element = screen.getByText(todo.text);
    expect(element).toBeDefined();
  })

  it('should call onClickComplete when clicking on the button', () => {
    render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />);

    const button = screen.getByText('Set as done');
    button.click();

    expect(onClickComplete).toHaveBeenCalled();
  });

  it('should call onClickDelete when clicking on the button', () => {
    render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />);

    const button = screen.getByText('Delete');
    button.click();

    expect(onClickDelete).toHaveBeenCalled();
  });

  it('should show the todo status correctly', () => {
    const { container } = render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />);
    expect(container).toHaveTextContent('This todo is not done');

    todo.done = true;

    const { container: container2 } = render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />);
    expect(container2).toHaveTextContent('This todo is done');
  });

  it('should only show the "Set as done" button when the todo is not done', () => {
    const { container } = render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />);
    expect(container).toHaveTextContent('Set as done');

    todo.done = true;

    const { container: container2 } = render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />);
    expect(container2).not.toHaveTextContent('Set as done');
  });
})