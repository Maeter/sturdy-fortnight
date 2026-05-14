Cypress.Commands.add('addTodoItem', (text: string) => {
  cy.contains('button', 'Add').click()
  cy.get('input[placeholder="Task description…"]').type(text)
  cy.contains('button', 'Save').click()
})

Cypress.Commands.add('deleteTodoItems', (texts: string[]) => {
  texts.forEach((text) => cy.contains('li', text).click())
  cy.contains('button', 'Delete').click()
})
