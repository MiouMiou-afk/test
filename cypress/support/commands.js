import * as data from '../support/data/data.json'


//commande pour remplir un formulaire sur Cypress (finalisation de l'inscription)
Cypress.Commands.add('signup', () => {
    cy.get('[placeholder="First"]').type(data.firstName)
    cy.get('[placeholder="Last"]').type(data.lastName)
    cy.get('.job-responsibilities > :nth-child(2) > .module-Checkbox__label__nz72M').click();
    cy.get('[data-pendo="onboarding-terms-checkbox"] > .module-Checkbox__label__nz72M').click();
    cy.get('[data-pendo="onboarding-notification-checkbox"] > .module-Checkbox__label__nz72M').click();
    cy.get('.btn').click();

    cy.get('[data-cy="create-org-form--org-name"] > .input-form-group > .input-form-group-contents > .form-group > .form-control').type(data.orgName)
    cy.get('[data-cy="create-org-form--button"] > span').click()

    cy.get(':nth-child(3) > .module-Radio__label__FN_pG').click()
    cy.get('[data-cy="user-journey-survey--submit-button"]').click()

    cy.get('.text-center > .btn').click()
    cy.get('._pendo-close-guide').click();

} )

