// This test is designed to sign up for a Cypress account using a temporary email address from MailSlurp.
import * as data from '../support/data/data.json'

describe('Inscription sur Cypress puis validation depuis la boîte mail', () => {

  before(function () {
    //Je crée une boîte mail temporaire avec mailslurp 
    cy.then(function () {

      const MailSlurp = require('mailslurp-client').default
      const mailslurp = new MailSlurp({ apiKey: Cypress.env('API_KEY') })
      cy.wrap(mailslurp).as('mailslurp')

    }).then(mailslurp => mailslurp.createInbox())
      .then(inbox => {
        //je stocke les éléments dans des variables pour les utiliser plus tard dans le test
        cy.wrap(inbox).as('inbox')
        cy.log(`email inbox ${inbox.emailAddress}`)
        cy.log(`Inbox id ${inbox.id}`)
        cy.wrap(inbox.id).as('inboxId')
        cy.wrap(inbox.emailAddress).as('emailAddress')
      })
  });

  it('inscription et validation par mail sur Cypress', () => {

    const testPassword = data.password;

    // Je m'inscris sur Cypress avec l'email temporaire
    cy.then(function () {

      cy.log("L'adresse email est : " + this.emailAddress);

      cy.visit('https://cloud.cypress.io/signup');

      cy.get('.btn-provider-email').click();
      cy.get('#email').type(this.emailAddress);
      cy.get('.ReactPasswordStrength-input').type(testPassword);
      cy.get('button[type="submit"]').click();
      //J'accède à ma boîte mail pour cliquer sur le lien de validation
      cy.mailslurp({ apiKey: Cypress.env('API_KEY') })
        .then(mailslurp => mailslurp.waitForLatestEmail(this.inboxId, 120_000, true)
        )
        .then(email => {

          const emailBody = email.body;

          const regex = /<a[^>]+href="(https?:\/\/[^"]+)"/;
          const verifyLink = emailBody.match(regex)[1];
          cy.log("L'email est : ", email.body);
          expect(email.body).to.contain('Cypress')
          cy.wrap(email.id).as('emailId')
          expect(email.from).to.contain(data.mail);

          cy.log("Lien de confirmation : ", verifyLink);

          cy.visit(verifyLink);
          //Une fois sur la page de confirmation, je remplis les champs pour créer mon compte
          cy.signup();
          cy.contains('Billing & Usage').click();
          //je vais sur la page de billing pour récuperer le nombre de jours restants avant la fin de mon essai gratuit
          //bonus: je récupère la date avec une simulation de survol de la souris sur l'élément
          cy.get('[data-cy="usage-renew-info"]').trigger('mouseover') 
          cy.get('.rc-tooltip-inner > span').should('be.visible')
            .invoke('text')
            .then((date) => {
              //je stocke le nombre de jours restants dans un fichier json
              cy.writeFile('cypress/fixtures/dayleft.json', { date });
              cy.log('Day left: ' + date);
            });
        });


    })

  })
})