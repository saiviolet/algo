describe('Тестирование работоспособности приложения', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it('Приложение запустилось и отображается 6 блоков', () => {
    cy.get("div > a").should('have.length',6);
  });
})
export {}