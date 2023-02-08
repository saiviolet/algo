import {
  TEST_BUTTON,
  TEST_CIRCLE, TEST_FIB_ARRAY,
  TEST_INPUT, TEST_REVERT_STRING_ARRAY,
  TEST_STRING, TEST_STRING_ANIMATIONS,
  TEST_STRING_ARRAY
} from "../../src/constants/cypress";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('Страница ПОСЛЕДОВАТЕЛЬНОСТЬ ФИБОНАЧЧИ', () => {

  beforeEach(() => {
    cy.visit("/fibonacci");
    cy.contains(/Последовательность Фибоначчи/i);
    cy.get(TEST_INPUT).as('input');
    cy.get(TEST_BUTTON).as('button');
  });

  it('На странице отображены основные элементы', () => {
    cy.get('h3').contains(/фибоначчи/i);
    cy.get('@input');
    cy.get('@button').contains(/развернуть/i);
  });

  it('По умолчанию кнопка заблокирована', () => {
    cy.get('@input').should('be.empty');
    cy.get('@button').should('be.disabled');
  });

  it('Числа генерируются корректно', () => {
    cy.get("@input").type('4').should("have.value", 4);
    cy.get("@button").should("be.visible").click();
    cy.wait(5*DELAY_IN_MS);
    cy.get(TEST_CIRCLE).as('circle');
    cy.get("@circle").each(($circle, index) => {
      cy.wrap($circle).should("have.text", TEST_FIB_ARRAY[index])
    });
  })

});