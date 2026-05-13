describe('Application basic user journeys', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the page with initial status', () => {
    cy.get('main').should('be.visible')
    cy.contains('This is a technical proof').should('be.visible')
    cy.contains('No items yet. Add one!').should('be.visible')
    cy.contains('button', 'Delete').should('be.visible')
    cy.contains('button', 'Add').should('be.visible')
  })

  it('opens the add modal when clicking Add and is able to close it', () => {
    cy.contains('button', 'Add').click()
    cy.get('input[placeholder="Task description…"]').should('be.visible')
    cy.contains('button', 'Cancel').click()
    cy.get('input[placeholder="Task description…"]').should('not.be.visible')
  })

  it('adds an item to the list and displays it', () => {
    cy.addTodoItem('Buy milk')
    cy.contains('li', 'Buy milk').should('be.visible')
  })

  it('adds multiple items and shows them all in the list', () => {
    const items = ['Buy milk', 'Walk the dog', 'Read a book']
    items.forEach((item) => cy.addTodoItem(item))
    items.forEach((item) => cy.contains('li', item).should('be.visible'))
  })

  it('undoes an addition', () => {
    cy.addTodoItem('Buy milk')
    cy.contains('li', 'Buy milk').should('be.visible')

    cy.get('button[aria-label="Undo"]').click()
    cy.contains('li', 'Buy milk').should('not.exist')
  })

  it('undoes a bulk deletion', () => {
    const items = ['Buy milk', 'Walk the dog']
    items.forEach((item) => cy.addTodoItem(item))

    cy.deleteTodoItems(items)
    items.forEach((item) => cy.contains('li', item).should('not.exist'))

    cy.get('button[aria-label="Undo"]').click()
    items.forEach((item) => cy.contains('li', item).should('be.visible'))
  })

  it('deletes selected items in bulk, leaving unselected ones intact', () => {
    const toDelete = ['Buy milk', 'Walk the dog']
    const toKeep = 'Read a book'

    ;[...toDelete, toKeep].forEach((item) => cy.addTodoItem(item))

    cy.deleteTodoItems(toDelete)

    toDelete.forEach((item) => cy.contains('li', item).should('not.exist'))
    cy.contains('li', toKeep).should('be.visible')
  })
})
