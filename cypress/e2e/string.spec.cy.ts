import {
  TEST_BORDER_COLOR,
  TEST_BUTTON,
  TEST_CIRCLE,
  TEST_INPUT, TEST_REVERT_STRING_ARRAY,
  TEST_STRING, TEST_STRING_ANIMATIONS,
  TEST_STRING_ARRAY
} from "../../src/constants/cypress";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('Страница СТРОКА', () => {

  beforeEach(() => {
    cy.visit("/recursion");
    cy.contains(/строка/i);
    cy.get(TEST_INPUT).as('input');
    cy.get(TEST_BUTTON).as('button');
  });

  it('На странице отображены основные элементы', () => {
    cy.get('h3').contains(/строка/i);
    cy.get('@input').should('be.empty');
    cy.get('@button').contains(/развернуть/i);
  });

  it('По умолчанию кнопка заблокирована', () => {
    cy.get('@input').should('be.empty');
    cy.get('@button').should('be.disabled');
  });

  it('Анимация работает корректно', () => {
    cy.clock();
    // есть вариант сделать все менее топорно?????
    cy.get("@input").type(TEST_STRING).should("have.value", TEST_STRING);
    cy.get("@button").should("be.visible").click();
    cy.get(TEST_CIRCLE).as('circle');
    cy.get("@circle").each(($circle, index) => {
      cy.wrap($circle)
        .should("have.text", TEST_STRING_ARRAY[index])
        .and("have.css", "border", TEST_STRING_ANIMATIONS[0][index]);
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@circle").each(($circle, index) => {
      cy.wrap($circle)
        .should("have.text", TEST_REVERT_STRING_ARRAY[index])
        .and("have.css", "border", TEST_STRING_ANIMATIONS[1][index]);
      // cy.wrap($circle).contains(TEST_REVERT_STRING_ARRAY[index]) && cy.wrap($circle).should("have.css", "border", TEST_STRING_ANIMATIONS[1][index]);
    });
    cy.tick(DELAY_IN_MS);
    cy.get("@circle").each(($circle, index) => {
      cy.wrap($circle)
        .should("have.text", TEST_REVERT_STRING_ARRAY[index])
        .and("have.css", "border", TEST_STRING_ANIMATIONS[2][index]);
    });
    cy.tick(DELAY_IN_MS);
    cy.get("@circle").each(($circle, index) => {
      cy.wrap($circle)
        .should("have.text", TEST_REVERT_STRING_ARRAY[index])
        .and("have.css", "border", TEST_STRING_ANIMATIONS[3][index]);
    });
  })
});