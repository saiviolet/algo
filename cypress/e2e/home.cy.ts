import {testData} from "../../src/utils/utils";

describe('Приложение запустилось и корректно отображается', () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it('На странице есть заголовок h1 с текстом', () => {
    cy.get('h1').contains(/МБОУ АЛГОСОШ/);
  })
  it('На странице 6 блоков', () => {
    cy.get('div > a').should('have.length',6);
  });
  it('На странице есть бегущая строка', () => {
    cy.get('[data-test="ticker-text"]').contains(/Вдохновлено школами, в которых не учили алгоритмам/i);
  })
});
describe ('Роутинг работает корректно', () => {
  beforeEach(() => {
    cy.visit("/");
  });
  testData.forEach(item => {
    it(`Переход на страницу ${item.title}`, () => {
      cy.get(`[data-test=${item.name}]`).click();
      cy.get('h3').contains(item.title);
    })
  })
});
export {}