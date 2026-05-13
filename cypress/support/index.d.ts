declare namespace Cypress {
  interface Chainable {
    addTodoItem(text: string): Chainable<void>
    deleteTodoItems(texts: string[]): Chainable<void>
  }
}
