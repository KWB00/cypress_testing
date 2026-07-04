/// <reference types="cypress" />
describe('saucedemo login tests', () => {

    

    it('tests with valid login credentials', () => {

        cy.url().should('include', ('/inventory'));
    })

    it('tests with invalid login credentials', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('locked_out_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('be.visible', 'have.css', 'color', 'rgb(255, 255, 255)');
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.');
    })

    // session management- refreshing the page to determine whether the user remains logged in

    it('tests to see if user remains logged in after refresh', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.reload();
        cy.url().should('include', '/inventory');
    })

    // Negative testing
    // SQL Injection
    it('tests authorisation access by SQL injection', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('OR 1=1 --');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('be.visible');
        cy.url().should('not.include', '/inventory');
    })

    it('tests authorisation access by SQL injection_2', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('OR x=x');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('be.visible');
        cy.url().should('not.include', '/inventory');
    })

})