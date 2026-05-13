describe('Smoke', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the page', () => {
    cy.get('main').should('be.visible')
  })

  it('renders the card title', () => {
    cy.contains('This is a technical proof').should('be.visible')
  })

  it('renders the footer action buttons', () => {
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
    cy.contains('button', 'Add').click()
    cy.get('input[placeholder="Task description…"]').type('Buy milk')
    cy.contains('button', 'Add').first().click()
    cy.contains('li', 'Buy milk').should('be.visible')
  })

  it('adds multiple items and shows them all in the list', () => {
    const items = ['Buy milk', 'Walk the dog', 'Read a book']
    items.forEach((item) => {
      cy.contains('button', 'Add').click()
      cy.get('input[placeholder="Task description…"]').type(item)
      cy.contains('button', 'Add').first().click()
    })
    items.forEach((item) => {
      cy.contains('li', item).should('be.visible')
    })
  })

  it('undoes an addition', () => {
    cy.contains('button', 'Add').click()
    cy.get('input[placeholder="Task description…"]').type('Buy milk')
    cy.contains('button', 'Add').first().click()
    cy.contains('li', 'Buy milk').should('be.visible')

    cy.get('button[aria-label="Undo"]').click()
    cy.contains('li', 'Buy milk').should('not.exist')
  })

  it('undoes a bulk deletion', () => {
    const items = ['Buy milk', 'Walk the dog']
    items.forEach((item) => {
      cy.contains('button', 'Add').click()
      cy.get('input[placeholder="Task description…"]').type(item)
      cy.contains('button', 'Add').first().click()
    })

    items.forEach((item) => cy.contains('li', item).click())
    cy.contains('button', 'Delete').click()
    items.forEach((item) => cy.contains('li', item).should('not.exist'))

    cy.get('button[aria-label="Undo"]').click()
    items.forEach((item) => cy.contains('li', item).should('be.visible'))
  })

  it('deletes selected items in bulk, leaving unselected ones intact', () => {
    const toDelete = ['Buy milk', 'Walk the dog']
    const toKeep = 'Read a book'

    ;[...toDelete, toKeep].forEach((item) => {
      cy.contains('button', 'Add').click()
      cy.get('input[placeholder="Task description…"]').type(item)
      cy.contains('button', 'Add').first().click()
    })

    toDelete.forEach((item) => cy.contains('li', item).click())

    cy.contains('button', 'Delete').click()

    toDelete.forEach((item) => cy.contains('li', item).should('not.exist'))
    cy.contains('li', toKeep).should('be.visible')
  })
})
