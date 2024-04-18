import assert from 'assert'
// Sempre passando o Id do HTML, inspeciona os item e pega o id
class RegisterForm{
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    urlFeedback: () => cy.get('#urlFeedback'),
    submitButton: () => cy.get('#btnSubmit'),
    
  }

  typeTitle(text){
    if(!text) return;
    this.elements.titleInput().type(text)
  }

  typeUrl(text){
    if(!text) return;
    this.elements.imageUrlInput().type(text)
  }

  clickSubmit(){
    this.elements.submitButton().click()
  }
}

// Const para utilizarmos abaixo o RegisterForm
const registerForm = new RegisterForm()
const colors = {
  errors: 'rgb(220, 53, 69)',
  sucess:''
}

describe('Image Registration', () => {
  describe('Submitting an image with invalid inputs', () => {
    after(() => {
      cy.clearAllLocalStorage()
    })
    const input = {
      title: '',
      url:''
    }
    it(' Given I am on the image registration page', () => {
      cy.visit('/')
    })

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title)
    })
    it(`Then I enter "${input.url}" in the URL field`, () => {
      registerForm.typeUrl(input.url)
    })

    it(`Then I click the submit button`, () => {
      registerForm.clickSubmit()
    })

    it(`Then I should see "Please type a title for the image" message above the title field`, () => {
      registerForm.elements.titleFeedback().should('contains.text', 'Please type a title for the image')
      // registerForm.elements.titleFeedback().should(elements => {debugger})
    })

    it(`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
      registerForm.elements.urlFeedback().should('contains.text', 'Please type a valid URL')
      
    })

    it(`And I should see an exclamation icon in the title and URL fields`, () => {
      registerForm.elements.titleInput().should(([element]) => {
        const styles = window.getComputedStyle(element)
        const border = styles.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.errors)
      })
    })
  })
})