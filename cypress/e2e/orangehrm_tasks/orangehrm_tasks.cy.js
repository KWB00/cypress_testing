/// <reference types="cypress" />

describe('automated tests for orangehrm demo', () => {

    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('https://opensource-demo.orangehrmlive.com/');
            cy.get('[name="username"]').type('Admin');
            cy.get('[name="password"]').type('admin123');
            cy.get('.oxd-button').click();
        });

        cy.visit('https://opensource-demo.orangehrmlive.com/');
    });

    it('searches for an employee', () => {
        cy.get(':nth-child(2) > .oxd-main-menu-item').click(); 
        cy.get('.oxd-autocomplete-text-input > input').first().type('Charles');
        cy.get('.oxd-form-actions > .oxd-button--secondary').click();

        cy.get('.oxd-table-card > .oxd-table-row').should('be.visible');
        cy.get('.oxd-table-card > .oxd-table-row > :nth-child(3) > div').should('contain', 'Charles');
    });

    it('navigates the dropdown menu', () => {
        cy.get(':nth-child(3) > .oxd-main-menu-item').click();
        cy.get('.oxd-select-text--after > .oxd-icon').eq(2).click();
        cy.get('.oxd-select-dropdown > :nth-child(2) > span').click();
        cy.get('.oxd-button--secondary').click();

        cy.url().should('include', '/leave/viewLeaveList');
    });

    it('navigates to the Admin section', () => {
        cy.get(':nth-child(1) > .oxd-main-menu-item').click();

        cy.get('.orangehrm-header-container > .oxd-button').should('be.visible');
        cy.get('.oxd-table-filter-header-title > .oxd-text').should('contain', 'System Users');
    });

    it('navigates the dashboard homepage', () => {
        cy.url().should('include', '/dashboard/index');
        cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(1)').should('be.visible');
        cy.get(':nth-child(1) > .orangehrm-quick-launch-heading > .oxd-text').should('contain', 'Assign Leave');
    });

    it('tests the profile page', () => {
        cy.get(':nth-child(6) > .oxd-main-menu-item').click();
        cy.url().should('include', '/pim/viewPersonalDetails');
        cy.get('[name="firstName"]').should('be.visible');
    });

    it('verifies sidebar can be collapsed', () => {
        cy.get('.oxd-main-menu-search > .oxd-icon-button').click();
        cy.get('.oxd-brand-banner > img').should('not.be.visible');
    });
    
})