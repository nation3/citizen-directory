describe('Nation3 App UI', () => {

    it('should load the index page', () => {
        cy.visit('/')
        cy.get('h1').contains('Nation3 Citizens')
    })
})

export {}
