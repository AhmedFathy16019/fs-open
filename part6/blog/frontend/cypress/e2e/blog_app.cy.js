describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen"
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)

    const anotherUser = {
      name: 'Artoa Hellas',
      username: 'hellas',
      password: 'artoa'
    }

    cy.request('POST', 'http://localhost:3001/api/users', anotherUser)

    cy.visit('http://localhost:3000')

  })
  
  it('Login form is show', function() {
    cy.contains('Log in to the application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('succeeds with the correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('.message').contains('Matti Luukkainen logged in successfully')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')  
        .and('contain', 'Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const credentials = {
        username: 'mluukkai',
        password: 'salainen'
      }

      cy.request('POST', 'http://localhost:3001/api/login', credentials).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      })

      const loginUser = {
        username: 'hellas',
        password: 'artoa'
      }

      cy.request('POST', 'http://localhost:3001/api/login', loginUser).then(({ body }) => {
        localStorage.setItem('anotherBlogappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
        console.log('body :>> ', body);
      })
    })

    it('A blog can be created', function() {
      cy.get('#visible-button').click()
      cy.get('#title').type('A blog created through cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-blog').click()
      cy.get('.message').contains('a new blog A blog created through cypress by Cypress added')
      cy.get('.blogSingle').should('contain', 'A blog created through cypress')
    })

    describe('And blogs by different users are already there', function() {
      beforeEach(function() {
        const blog = {
          title: 'A blog created through cypress',
          author: 'Cypress',
          url: 'www.cypress.com'
        }

        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: blog,
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
          }
        })

        const anotherBlog = {
          title: 'Blog created by a different user',
          author: 'Different user',
          url: 'www.different.com'
        }

        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: anotherBlog,
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('anotherBlogappUser')).token}`
          }
        })

        cy.visit('http://localhost:3000')
      })

      it('A user can like a blog', function() {
        cy.contains('A blog created through cypress')
          .parent()
          .as('theBlog')

        cy.get('@theBlog')
          .find('.toggle-details')
          .click()
        cy.get('@theBlog')
          .find('.blog-likes')
          .contains('0')
        cy.get('@theBlog')
          .find('.like-button')
          .click()
        cy.get('@theBlog')
          .find('.blog-likes')
          .contains('1')
      })

      it('The user who created a blog can delete it', function() {
        cy.contains('A blog created through cypress')
        .parent()
        .as('theBlog')
        cy.get('@theBlog')
          .find('.toggle-details')
          .click()
        cy.get('@theBlog')
          .find('.delete-button')
          .click()
        cy.get('html')
          .should('not.contain', 'A blog created through cypress')
        cy.contains('Blog removed successfully')
      })

      it('only the creator of a blog can see the remove button to delete the blog', function() {
        cy.contains('Blog created by a different user')
          .parent()
          .find('.toggle-details')
          .click()
  
        cy.contains('Blog created by a different user')
          .parent()
          .should('not.contain', 'remove')
      })

      it('blogs are sorted by their likes descendingly', function() {
        cy.get('.blogSingle').eq(0).should('contain', 'A blog created through cypress')
        cy.get('.blogSingle').eq(1).should('contain', 'Blog created by a different user')
        
        cy.contains('Blog created by a different user')
          .parent()
          .as('theBlog')

        cy.get('@theBlog')
          .find('.toggle-details')
          .click()

        cy.get('@theBlog')
          .find('.like-button')
          .click()

        cy.get('.blogSingle').eq(0).should('contain', 'Blog created by a different user')
        cy.get('.blogSingle').eq(1).should('contain', 'A blog created through cypress')
      })
    })
  })
})