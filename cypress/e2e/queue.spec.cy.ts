import {
  TEST_ADD_BUTTON, TEST_BORDER_COLOR,
  TEST_CIRCLE, TEST_CLEAR_BUTTON, TEST_DELETE_BUTTON,
  TEST_INPUT, TEST_QUEUE_VALUES,
} from "../../src/constants/cypress";
import {DELAY_IN_MS} from "../../src/constants/delays";

const testAdd = () => {
  cy.clock();
  cy.get("@input").type(TEST_QUEUE_VALUES[0]).should('have.value', TEST_QUEUE_VALUES[0]);
  cy.get("@buttonAdd").should('be.visible').click();
  cy.get(TEST_CIRCLE).as('circle');

  cy.get('@circle').should('have.text',TEST_QUEUE_VALUES[0]);
  cy.get('@circle')
    .prev()
    .should('have.text', 'head');
  cy.get('@circle')
    .next()
    .next()
    .should('have.text', 'tail');
  cy.tick(DELAY_IN_MS);
  cy.get("@input").type(TEST_QUEUE_VALUES[1]).should('have.value', TEST_QUEUE_VALUES[1]);
  cy.get("@buttonAdd").should('be.visible').click();
  cy.get('@circle')
    .eq(1)
    .should('have.text',TEST_QUEUE_VALUES[1]);
  cy.get('@circle')
    .eq(0)
    .prev()
    .should('have.text', 'head');
  cy.get('@circle')
    .eq(1)
    .next()
    .next()
    .should('have.text', 'tail');
  cy.tick(DELAY_IN_MS);
}
describe('Страница ОЧЕРЕДЬ', () => {

  beforeEach(() => {
    cy.visit("/queue");
    cy.contains(/очередь/i);
    cy.get(TEST_INPUT).as('input');
    cy.get(TEST_ADD_BUTTON).as('buttonAdd');
    cy.get(TEST_DELETE_BUTTON).as('buttonDelete');
    cy.get(TEST_CLEAR_BUTTON).as('buttonClear');
  });

  it('По умолчанию кнопка заблокирована', () => {
    cy.get('@input').should('be.empty');
    cy.get('@buttonAdd').should('be.disabled');
  });

  it('Корректность отображения анимации при добавлении в очередь', () => {
    cy.clock();
    cy.get("@input").type(TEST_QUEUE_VALUES[0]).should('have.value', TEST_QUEUE_VALUES[0]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.get(TEST_CIRCLE).as('circle');
    cy.get('@circle')
      .should('have.text',TEST_QUEUE_VALUES[0])
      .and('have.css', 'border', TEST_BORDER_COLOR.Changing)
    cy.get('@circle').prev().should('have.text', 'head');
    cy.get('@circle').next().next().should('have.text', 'tail');
    cy.tick(DELAY_IN_MS);
    cy.get('@circle')
      .should('have.text',TEST_QUEUE_VALUES[0])
      .and('have.css', 'border', TEST_BORDER_COLOR.Default)
    // второй элемент
    cy.get("@input").type(TEST_QUEUE_VALUES[1]).should('have.value', TEST_QUEUE_VALUES[1]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.get('@circle')
      .eq(1)
      .should('have.text',TEST_QUEUE_VALUES[1])
      .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
    cy.get('@circle').first().prev().should('have.text', 'head');
    cy.get('@circle').eq(1).next().next().should('have.text', 'tail');
    cy.tick(DELAY_IN_MS);
    cy.get('@circle')
      .eq(1)
      .should('have.text',TEST_QUEUE_VALUES[1])
      .and('have.css', 'border', TEST_BORDER_COLOR.Default);
    // 3 элемент
    cy.get("@input").type(TEST_QUEUE_VALUES[2]).should('have.value', TEST_QUEUE_VALUES[2]);
    cy.get("@buttonAdd").should('be.visible').click();
    cy.get('@circle')
      .eq(2)
      .should('have.text',TEST_QUEUE_VALUES[2])
      .and('have.css', 'border', TEST_BORDER_COLOR.Changing);
    cy.get('@circle').first().prev().should('have.text', 'head');
    cy.get('@circle').eq(2).next().next().should('have.text', 'tail');
    cy.tick(DELAY_IN_MS);
    cy.get('@circle')
      .eq(2)
      .should('have.text',TEST_QUEUE_VALUES[2])
      .and('have.css', 'border', TEST_BORDER_COLOR.Default);
  });
  it('Удаление из очереди работает корректно', () => {
    testAdd();

    cy.get("@buttonDelete").should('be.visible').click();
    cy.get('@circle')
      .eq(1)
      .should('have.text',TEST_QUEUE_VALUES[1]);
    cy.get('@circle')
      .eq(1)
      .prev()
      .should('have.text', 'head');
    cy.get('@circle')
      .eq(1)
      .next()
      .next()
      .should('have.text', 'tail');
    cy.tick(DELAY_IN_MS);

    cy.get("@buttonDelete").should('be.visible').click();
    cy.get('@circle')
      .eq(1)
      .should('not.have.text');
    cy.get('@circle')
      .eq(1)
      .prev()
      .should('have.text', 'head');
  });

  it('Корректная очистка очереди', () => {
    testAdd();

    cy.get("@buttonClear").should('be.visible').click();
    cy.get('@circle').should('not.have.text');
  })

  afterEach(() => {
    cy.get('@input').should('be.empty');
    cy.get('@buttonAdd').should('be.disabled');
  });

});