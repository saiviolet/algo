import {Circle} from "../circle";
import { render } from "@testing-library/react";
import TestRenderer from 'react-test-renderer';
import {ElementStates} from "../../../../types/element-states";

const testingData = {
  letter: 'test',
  headString: 'head',
  headJSX: <Circle letter={'test head'}/>,
  tailString: 'tail',
  tailJSX: <Circle letter={'test tail'}/>,
  index: 22,
  isSmall: true,
  defaultState: ElementStates.Default,
  modifiedState: ElementStates.Modified,
  changingState: ElementStates.Changing,
}

describe('( ͡⊙ ͜ʖ ͡⊙)Тесты компонента Circle',() => {

  test('Отрисовка  пустого компонента (без буквы)', () => {
    const {asFragment} = render(<Circle />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('Отрисовка компонента с буквой', () => {
    const testRenderer = TestRenderer.create(<Circle letter={testingData.letter}/>);
    const test = testRenderer.root;
    expect(test.props.letter.length).toBeLessThan(5);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
  test('Отрисовка компонента с текстовым head', () => {
    const circle = render(<Circle head={testingData.headString}/>);
    expect(circle.getByText('head')).toBeInTheDocument();
    expect(circle.asFragment()).toMatchSnapshot();
  });
  test('Отрисовка компонента с react-элементом в head;', () => {
    const circle = render(<Circle head={testingData.headJSX}/>);
    expect(circle.getByText(/test head/i)).toBeInTheDocument();
    expect(circle.asFragment()).toMatchSnapshot();
  });
  test('Отрисовка компонента с текстовым tail', () => {
    const circle = render(<Circle tail={testingData.tailString}/>);
    expect(circle.getByText('tail')).toBeInTheDocument();
    expect(circle.asFragment()).toMatchSnapshot();
  });
  test('Отрисовка компонента с react-элементом в tail;', () => {
    const circle = render(<Circle tail={testingData.tailJSX}/>);
    expect(circle.getByText(/test tail/i)).toBeInTheDocument();
    expect(circle.asFragment()).toMatchSnapshot();
  });
  test('Отрисовка компонента c index', () => {
    const circle = render(<Circle index={testingData.index}/>);
    expect(circle.getByText(/22/i)).toBeInTheDocument();
    expect(circle.asFragment()).toMatchSnapshot();
  });
  test('Отрисовка компонента с пропсом isSmall', () => {
    const testRenderer = TestRenderer.create(<Circle isSmall={testingData.isSmall}/>);
    const test = testRenderer.root;
    expect(test.props.isSmall).toBeTruthy();
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
  test('Отрисовка компонента с default state', () => {
    const testRenderer = TestRenderer.create(<Circle state={testingData.defaultState}/>);
    const test = testRenderer.root;
    expect(test.props.state).toBe('default');
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  test('Отрисовка компонента с modified state', () => {
    const testRenderer = TestRenderer.create(<Circle state={testingData.modifiedState}/>);
    const test = testRenderer.root;
    expect(test.props.state).toBe('modified');
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  test('Отрисовка компонента с changing state', () => {
    const testRenderer = TestRenderer.create(<Circle state={testingData.changingState}/>);
    const test = testRenderer.root;
    expect(test.props.state).toBe('changing');
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

})