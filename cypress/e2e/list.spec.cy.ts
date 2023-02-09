import {
  ADD_BY_INDEX_BUTTON,
  ADD_TO_HEAD_BUTTON,
  ADD_TO_TAIL_BUTTON,
  DELETE_BY_INDEX_BUTTON,
  DELETE_FROM_HEAD_BUTTON,
  DELETE_FROM_TAIL_BUTTON,
  INPUT_INDEX, INPUT_VALUE, TEST_BORDER_COLOR, TEST_CIRCLE, TEST_STRING_ARRAY,
} from "../../src/constants/cypress";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import {HEAD, TAIL} from "../../src/constants/element-captions";

const testList = ['щука', 'в', 'реке', 'жила'];
const testValue = 'тест';
const testIndexValue = '2';
const numberIndexValue = (Number(testIndexValue));
const cutList = ['щука', 'в', 'жила'];
describe('Страница СВЯЗНЫЙ СПИСОК', () => {

  beforeEach(() => {

    cy.visit("/list");
    cy.contains(/Связный список/i);

    cy.get(ADD_TO_HEAD_BUTTON).as('buttonAddToHead');
    cy.get(ADD_TO_TAIL_BUTTON).as('buttonAddToTail');
    cy.get(ADD_BY_INDEX_BUTTON).as('buttonAddByIndex');
    cy.get(DELETE_FROM_HEAD_BUTTON).as('buttonDeleteFromHead');
    cy.get(DELETE_FROM_TAIL_BUTTON).as('buttonDeleteFromTail');
    cy.get(DELETE_BY_INDEX_BUTTON).as('buttonDeleteByIndex');

    cy.get(INPUT_INDEX).as('inputIndex');
    cy.get(INPUT_VALUE).as('inputValue');

    cy.get(TEST_CIRCLE).as('circles');

  });

  // it('Корректное отображение компонентов при старте', () => {
  //   // Проверьте, что если в инпуте пусто, то кнопка добавления
  //   // недоступна, кнопки добавления по индексу и удаления
  //   // по индексу недоступны тоже.
  //   cy.get('@inputIndex').should('be.empty');
  //   cy.get('@inputValue').should('be.empty');
  //
  //   cy.get('@buttonAddToHead').should('be.disabled');
  //   cy.get('@buttonAddToTail').should('be.disabled');
  //   cy.get('@buttonAddByIndex').should('be.disabled');
  //   cy.get('@buttonDeleteByIndex').should('be.disabled');
  // });

  // it('Корректное отображение списка по умолчанию', () => {
  //   cy.clock();
  //   cy.tick(DELAY_IN_MS);
  //   //   Проверьте корректность:
  //   //   отрисовки дефолтного списка.
  //
  //   cy.get('@circles').should('have.length', 4);
  //   cy.get('@circles').each(($circle, index) => {
  //     cy.wrap($circle)
  //       .should('be.visible')
  //       .and('have.text', testList[index])
  //       .and('have.css', 'border', TEST_BORDER_COLOR.Default);
  //     if(index === 0) cy.wrap($circle).prev().should('have.text', HEAD);
  //     if(index === testList.length-1) cy.wrap($circle).next().next().should('have.text', TAIL);
  //   })
  //
  // });

  // it('Корректное добавление нового значения в head', () => {
  //   cy.clock();
  //   // ввод текста и нажатие на кнопку добавления
  //   cy.get('@inputValue').type(testValue).should('have.value', testValue);
  //   cy.get("@buttonAddToHead").should("be.visible").click();
  //   cy.tick(SHORT_DELAY_IN_MS);
  //   // проверка tail
  //   cy.get('@circles')
  //     .last()
  //     .next()
  //     .next()
  //     .should('have.text', TAIL);
  //   // проверка отображения нового значения в head в виде кружочка розового цвета
  //   cy.get('@circles')
  //     .eq(1)
  //     .prev()
  //     .get(TEST_CIRCLE)
  //     .eq(0)
  //     .should('have.text', testValue)
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
  //   cy.tick(DELAY_IN_MS);
  //   // проверка появления добавленого элемента первым и выделение нужным цветом
  //   cy.get('@circles')
  //     .first()
  //     .should('have.text', testValue)
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Modified);
  //   // проверка head и tail
  //   cy.get('@circles')
  //     .first()
  //     .prev()
  //     .should('have.text', HEAD);
  //   cy.get('@circles')
  //     .last()
  //     .next()
  //     .next()
  //     .should('have.text', TAIL);
  //   cy.tick(DELAY_IN_MS);
  //   // изменение цвета рамки
  //   cy.get('@circles')
  //     .first()
  //     .should('have.css', 'border', TEST_BORDER_COLOR.Default);
  //   cy.tick(DELAY_IN_MS);
  // });

  // it('Корректное добавление элемента по индексу', () => {
  //   //   Проверьте корректность: добавления элемента по индексу.
  //   cy.clock();
  //   // ввод текста и нажатие на кнопку добавления
  //   cy.get('@inputValue').type(testValue).should('have.value', testValue);
  //   cy.get('@inputIndex').type(testIndexValue).should('have.value', testIndexValue);
  //   cy.get("@buttonAddByIndex").should("be.visible").click();
  //   cy.tick(SHORT_DELAY_IN_MS);
  //   // 1. проверка head & tail
  //   cy.get('@circles')
  //     .first()
  //     .prev()
  //     .get(TEST_CIRCLE)
  //     .eq(0)
  //     .should('have.text', testValue)
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
  //   cy.get('@circles')
  //     .last()
  //     .next()
  //     .next()
  //     .should('have.text', TAIL);
  //   // проверка первого значения
  //   cy.get('@circles')
  //     .eq(1)
  //     .should('have.text', testList[0])
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Default);
  //   cy.tick(DELAY_IN_MS);
  //   // 2. след.шаг
  //   // 2.1 первое значение
  //   cy.get('@circles')
  //     .first()
  //     .should('have.text', testList[0])
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
  //   // 2.2 head первого значения
  //   cy.get('@circles')
  //     .first()
  //     .prev()
  //     .should('have.text', HEAD);
  //   // 2.3 второе значение
  //   cy.get('@circles')
  //     .eq(2)
  //     .should('have.text', testList[1])
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Default);
  //   // 2.2 head второго значения
  //   cy.get('@circles')
  //     .eq(2)
  //     .prev()
  //     .get(TEST_CIRCLE)
  //     .eq(1)
  //     .should('have.text', testValue)
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
  //   cy.tick(DELAY_IN_MS);
  //   // 3 след. шаг
  //   // 3.1 первое значение
  //   cy.get('@circles')
  //     .first()
  //     .should('have.text', testList[0])
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Default);
  //   // 3.2 второе значение
  //   cy.get('@circles')
  //     .eq(1)
  //     .should('have.text', testList[1])
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Default);
  //   // 3.3 новое значение
  //   cy.get('@circles')
  //     .eq(numberIndexValue)
  //     .should('have.text', testValue)
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Modified);
  //   // 3.4 head & tail
  //   cy.get('@circles')
  //     .first()
  //     .prev()
  //     .should('have.text', HEAD)
  //   cy.get('@circles')
  //     .last()
  //     .next()
  //     .next()
  //     .should('have.text', TAIL)
  //   cy.tick(DELAY_IN_MS);
  //   // финальные тесты
  //   cy.get('@circles')
  //     .eq(numberIndexValue)
  //     .should('have.text', testValue)
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Default);
  // })

  // it('Корректное удаление из head', () => {
  //   //  Проверьте корректность: удаления элемента из head.
  //   cy.clock();
  //   cy.get("@buttonDeleteFromHead").should("be.visible").click();
  //   cy.tick(SHORT_DELAY_IN_MS);
  //   // 1. нажатие на кнопку
  //   // 1.1 проверка tail первого элемента
  //   // (в виде кружочка с содержимым первого элемента)
  //   cy.get('@circles')
  //     .first()
  //     .next()
  //     .next()
  //     .get(TEST_CIRCLE)
  //     .eq(1)
  //     .should('have.text', testList[0])
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
  //   // 1.2 проверка отображения head & tai
  //   cy.get('@circles')
  //     .first()
  //     .prev()
  //     .should('have.text', HEAD);
  //   cy.get('@circles')
  //     .last()
  //     .next()
  //     .next()
  //     .should('have.text', TAIL);
  //   cy.tick(DELAY_IN_MS);
  //   // 2. след/шаг
  //   cy.get('@circles').should('have.length',3);
  //
  //   cy.get('@circles').each(($circle, index) => {
  //     cy.wrap($circle)
  //       .should('have.text', testList[index + 1])
  //       .and('have.css', 'border', TEST_BORDER_COLOR.Default);
  //   })
  //   cy.get('@circles')
  //     .last()
  //     .next()
  //     .next()
  //     .should('have.text', TAIL);
  // })

  // it('Корректное удаление из tail', () => {
  //   //  Проверьте корректность: удаления элемента из tail.
  //   cy.clock();
  //   cy.get("@buttonDeleteFromTail").should("be.visible").click();
  //   cy.tick(SHORT_DELAY_IN_MS);
  //   // 1. нажатие на кнопку
  //   // 1.1 проверка tail удаляемого элемента
  //   // (в виде кружочка с содержимым удаляемого элемента)
  //   cy.get('@circles')
  //     .last()
  //     .next()
  //     .next()
  //     .get(TEST_CIRCLE)
  //     .eq(testList.length)
  //     .should('have.text', testList[testList.length - 1])
  //     .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
  //   // 1.2 проверка отображения head & tai
  //   cy.get('@circles')
  //     .first()
  //     .prev()
  //     .should('have.text', HEAD);
  //   cy.tick(DELAY_IN_MS);
  //   // 2. след/шаг
  //   cy.get('@circles').should('have.length',3);
  //
  //   cy.get('@circles').each(($circle, index) => {
  //     cy.wrap($circle)
  //       .should('have.text', testList[index])
  //       .and('have.css', 'border', TEST_BORDER_COLOR.Default);
  //   });
  //   cy.get('@circles')
  //     .first()
  //     .prev()
  //     .should('have.text', HEAD);
  //   cy.get('@circles')
  //     .last()
  //     .next()
  //     .next()
  //     .should('have.text', TAIL);
  // })

  it('Корректное удаление по индексу', () => {
    //  Проверьте корректность: удаления элемента по индексу.
    cy.clock();
    // 1. нажатие на кнопку
    cy.get('@inputIndex').type(testIndexValue).should('have.value', testIndexValue);
    cy.get('@buttonDeleteByIndex').should("be.visible").click();
    cy.tick(SHORT_DELAY_IN_MS);
    // 2 проверка tail удаляемого элемента (в виде кружочка с содержимым удаляемого элемента)
    // 2.1 выделение всех кружков до нужного индекса
    for(let i = 0; i <= numberIndexValue; i++) {
      cy.tick(DELAY_IN_MS);
      cy.get('@circles')
        .eq(i)
        .should('have.text', testList[i])
        .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
    };
    cy.tick(DELAY_IN_MS);
    cy.get('@circles')
      .eq(numberIndexValue)
      .should('have.text', '')
      .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
    // 2.2 tail с удаляемым элементом
    cy.get('@circles')
      .eq(numberIndexValue)
      .get('@circles')
      .eq(testList.length-1)
      .should('have.text', testList[numberIndexValue])
      .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
    cy.tick(DELAY_IN_MS);
    for(let i = 0; i <= numberIndexValue; i++) {
      cy.tick(DELAY_IN_MS);
      cy.get('@circles')
        .eq(i)
        .should('have.text', cutList[i])
        .and('have.css', 'border', TEST_BORDER_COLOR.Default);
    };
    cy.get('@circles')
      .first()
      .prev()
      .should('have.text', HEAD);
    cy.get('@circles')
      .last()
      .next()
      .next()
      .should('have.text', TAIL);
  });

  afterEach(() => {
    // cy.get('@inputIndex').should('be.empty');
    // cy.get('@inputValue').should('be.empty');
    // //
    // cy.get('@buttonAddToHead').should('be.disabled');
    // cy.get('@buttonAddToTail').should('be.disabled');
    // cy.get('@buttonAddByIndex').should('be.disabled');
    // cy.get('@buttonDeleteByIndex').should('be.disabled');
    // cy.get('@buttonDeleteFromHead').should('be.enabled');
    // cy.get('@buttonDeleteFromTail').should('be.enabled');
  });

});