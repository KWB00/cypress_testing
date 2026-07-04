/// <reference types="cypress" />
describe('saucedemo checkout tests', () => {

    // beforeEach(() => {
    //     cy.session('login_saucedemo', () => {
    //         cy.visit('https://www.saucedemo.com/');
    //         cy.get('[data-test="username"]').type('standard_user');
    //         cy.get('[data-test="password"]').type('secret_sauce');
    //         cy.get('[data-test="login-button"]').click();
    //     });

    //     cy.visit('https://www.saucedemo.com/');
    // })

    it('verifies user is able to add items to cart', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory');

        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click();
        cy.get('[data-test="add-to-cart"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack');
    });

    it('checks if an item is removed from the cart', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory');

        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible');

        cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('ensures error messages for empty fields in checkout', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory');

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('include', '/cart');

        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one');

        cy.get('[data-test="firstName"]').should('be.empty');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('200000');
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').should('be.visible', 'have.css', 'color', 'rgb(255,255,255)');
        cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');

        cy.get('[data-test="error-button"]').click();
        cy.get('[data-test="firstName"]').clear();
        cy.get('[data-test="lastName"]').clear();
        cy.get('[data-test="postalCode"]').clear();


        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').should('be.empty');
        cy.get('[data-test="postalCode"]').type('200000');
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').should('be.visible', 'have.css', 'color', 'rgb(255,255,255)');
        cy.get('[data-test="error"]').should('contain', 'Error: Last Name is required');

        cy.get('[data-test="error-button"]').click();
        cy.get('[data-test="firstName"]').clear();
        cy.get('[data-test="lastName"]').clear();
        cy.get('[data-test="postalCode"]').clear();

        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').should('be.empty');
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').should('be.visible', 'have.css', 'color', 'rgb(255,255,255)');
        cy.get('[data-test="error"]').should('contain', 'Error: Postal Code is required');

    });

    it('validates an item checkout', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get('[data-test="shopping-cart-badge"]').click();
        cy.url().should('include', '/cart');

        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one');

        cy.get('[data-test="firstName"]').type('Ringo');
        cy.get('[data-test="lastName"]').type('Eagle');
        cy.get('[data-test="postalCode"]').type('100022');
        cy.get('[data-test="continue"]').click();
        cy.url().should('include', '/checkout-step-two');

        cy.get('[data-test="finish"]').click();
        cy.url().should('include', '/checkout-complete');
        cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!');
    });

    it('validates multiple items for purchase', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory');

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('contain', '1');
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('contain', '2');
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('contain', '3');

        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('include', '/cart');

        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one');
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('200000');
        cy.get('[data-test="continue"]').click();
        cy.url().should('include', '/checkout-step-two');

        cy.get('[data-test="finish"]').click();
        cy.url().should('include', '/checkout-complete');
        cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!');
    });
    
    it('tests checkout with an empty cart', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory');

        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('include', '/cart');

        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one');
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('200000');
        cy.get('[data-test="continue"]').click();

        cy.url().should('include', '/checkout-step-two');
        // ? How to make assertions using the cart list
        cy.get('[data-test="total-label"]').should('contain', 'Total: $0.00');

        cy.get('[data-test="finish"]').click();
        cy.url().should('include', '/checkout-complete');
        // ? shouldn't there be an error message
        cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!');
    });
    
    it('verifies quantity of product selected for purchase', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory');
        
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('include', '/cart');

        cy.get('[data-test="inventory-item"]').find('[data-test="item-quantity"]').should('contain', '1');
    });

    
})