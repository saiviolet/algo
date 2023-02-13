import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Button} from "../button";

const buttonTitle = 'For test';
const onCLickHandler = jest.fn();
describe('(×﹏×) Тесты компонента Button', () => {

  test('Корректная отрисовка кнопки с текстом', () => {
    const button = render(<Button text={buttonTitle} />);
    expect(screen.getByText(/For test/i)).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });

  test('Корректная отрисовка кнопки без текста', () => {
    const button = render(<Button />);
    expect(button).toMatchSnapshot();
  });

  test('Корректная отрисовка неактивной кнопки', () => {
    const button = render(<Button disabled={true}/>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(button).toMatchSnapshot();
  });

  test('Корректная отрисовка кнопки с лоадером', () => {
    const button = render(<Button isLoader={true}/>);
    expect(button).toMatchSnapshot();
  });

  test('Проверка вызова коллбека при клике на кнопку', () => {
    render(<Button text={buttonTitle} onClick={onCLickHandler}/>);
    const button = screen.getByRole('button');
    expect(screen.getByText(/For test/i)).toBeInTheDocument();
    userEvent.click(button);
    expect(onCLickHandler).toHaveBeenCalledTimes(1);
  });

})