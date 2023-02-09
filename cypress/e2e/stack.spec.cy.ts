import {
  TEST_ADD_BUTTON,
  TEST_BORDER_COLOR,
  TEST_BUTTON,
  TEST_CIRCLE, TEST_CLEAR_BUTTON, TEST_DELETE_BUTTON, TEST_FIB_ARRAY,
  TEST_INPUT, TEST_REVERT_STRING_ARRAY, TEST_STACK_VALUES,
  TEST_STRING, TEST_STRING_ANIMATIONS,
  TEST_STRING_ARRAY
} from "../../src/constants/cypress";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('Страница СТЕК', () => {

  beforeEach(() => {
    cy.visit("/stack");
    cy.contains(/стек/i);
    cy.get(TEST_INPUT).as('input');
    cy.get(TEST_ADD_BUTTON).as('buttonAdd');
    cy.get(TEST_DELETE_BUTTON).as('buttonDelete');
    cy.get(TEST_CLEAR_BUTTON).as('buttonClear');
  });

  it('По умолчанию кнопка заблокирована', () => {
    cy.get('@input').should('be.empty');
    cy.get('@buttonAdd').should('be.disabled');
  });

  it('Корректность отображения анимации при добавлении в стек', () => {
    cy.clock();
    cy.get("@input").type(TEST_STACK_VALUES[0]).should('have.value', TEST_STACK_VALUES[0]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.get(TEST_CIRCLE).as('circle');
    cy.get('@circle')
      .should('have.text',TEST_STACK_VALUES[0])
      .and('have.css', 'border', TEST_BORDER_COLOR.Changing)
    cy.get('@circle').prev().contains('top');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@circle').should('have.text',TEST_STACK_VALUES[0]).and('have.css', 'border', TEST_BORDER_COLOR.Default);
    // добавление второго элемента
    cy.get("@input").type(TEST_STACK_VALUES[1]).should('have.value', TEST_STACK_VALUES[1]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.get('@circle')
      .last()
      .should('have.text',TEST_STACK_VALUES[1])
      .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@circle')
      .last()
      .should('have.text',TEST_STACK_VALUES[1])
      .and('have.css', 'border', TEST_BORDER_COLOR.Default);
    cy.get('@circle')
      .last()
      .prev()
      .contains('top');
    // добавление третьего элемента
    cy.get("@input").type(TEST_STACK_VALUES[2]).should('have.value', TEST_STACK_VALUES[2]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.get('@circle')
      .last()
      .should('have.text',TEST_STACK_VALUES[2])
      .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@circle')
      .last()
      .should('have.text',TEST_STACK_VALUES[2])
      .and('have.css', 'border', TEST_BORDER_COLOR.Default);
    cy.get('@circle')
      .last()
      .prev()
      .contains('top');
  });
  it('Удаление из стека работает корректно', () => {
    cy.clock();
    cy.get("@input").type(TEST_STACK_VALUES[0]).should('have.value', TEST_STACK_VALUES[0]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.get(TEST_CIRCLE).as('circle');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@circle').should('have.text',TEST_STACK_VALUES[0]);
    cy.get('@circle').prev().contains('top');
    cy.get("@input").type(TEST_STACK_VALUES[1]).should('have.value', TEST_STACK_VALUES[1]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@circle').last().should('have.text',TEST_STACK_VALUES[1]);
    cy.get('@circle')
      .last()
      .prev()
      .contains('top');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@circle").should("have.length", 2);
    cy.get("@buttonDelete").should('be.visible').click();
    cy.get('@circle').last().should('have.text',TEST_STACK_VALUES[0]);
    cy.get('@circle')
      .last()
      .prev()
      .contains('top');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@circle").should("have.length", 1);
    cy.get("@buttonDelete").should('be.visible').click();
    cy.get('@circle').should('not.exist');
    cy.get("@buttonAdd").should('be.visible');
    cy.get("@buttonDelete").should('be.visible');
  });

  it('Корректная очистка стека', () => {
    cy.clock();
    cy.get("@input").type(TEST_STACK_VALUES[0]).should('have.value', TEST_STACK_VALUES[0]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@input").type(TEST_STACK_VALUES[1]).should('have.value', TEST_STACK_VALUES[1]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@input").type(TEST_STACK_VALUES[2]).should('have.value', TEST_STACK_VALUES[2]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(TEST_CIRCLE).as('circle');
    cy.get("@circle").should("have.length", 3);
    cy.get("@buttonClear").should('be.visible').click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@circle').should('not.exist');
  })

  afterEach(() => {
    cy.get('@input').should('be.empty');
    cy.get('@buttonAdd').should('be.disabled');
  });

});