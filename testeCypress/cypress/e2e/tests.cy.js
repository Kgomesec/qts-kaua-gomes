describe('SpaceTasks App', () => {
  beforeEach(() => {
    cy.visit('index.html') 
    //  cy.visit('http://localhost:8080/index.html')
  })

  it('carrega a página com título', () => {
    cy.contains('Space Tasks')
  })

  it('adiciona uma nova tarefa', () => {
    cy.get('#new-task').type('Estudar Cypress{enter}')
    cy.get('#task-list').should('contain', 'Estudar Cypress')
  })

  it('marca tarefa como concluída', () => {
    cy.get('#new-task').type('Ler artigo{enter}')
    cy.get('.complete-btn').first().click()
    cy.get('.task').first().should('have.class', 'completed')
  })

  it('aplica filtro de concluídas', () => {
    cy.get('#new-task').type('Testar filtros{enter}')
    cy.get('.complete-btn').first().click()
    cy.get('.filter-btn[data-filter="completed"]').click()
    cy.get('#task-list .task').each(el => {
      cy.wrap(el).should('have.class', 'completed')
    })
  })

  // Testes extras (Tema e Desafio)
  it('alterna para o tema escuro e volta para o claro', () => {
    cy.get('body').should('not.have.class', 'dark')
    cy.get('#toggle-theme').click()
    cy.get('body').should('have.class', 'dark')
    cy.get('#toggle-theme').should('contain', '☀️')
    cy.get('#toggle-theme').click()
    cy.get('body').should('not.have.class', 'dark')
    cy.get('#toggle-theme').should('contain', '🌙')
  })

  it('gera um desafio diário e salva no localStorage', () => {
    cy.get('#daily-challenge').should('contain', 'Clique no botão')
    cy.get('#generate-challenge').click()
    cy.get('#daily-challenge')
      .invoke('text')
      .should('not.equal', 'Clique no botão para gerar seu desafio!')
    cy.window().then(win => {
      const challenge = win.localStorage.getItem('spaceTasks_challenge_v1')
      expect(challenge).to.be.a('string').and.not.empty
    })
  })

  it('mantém o desafio após recarregar a página', () => {
    cy.get('#generate-challenge').click()
    cy.get('#daily-challenge').invoke('text').then(challengeText => {
      cy.reload()
      cy.get('#daily-challenge').should('have.text', challengeText)
    })
  })
})
