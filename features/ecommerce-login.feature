
@Demo @smoke
Feature: QA Brains ecommerce checkout

  As a customer
  I want to select a product and complete checkout
  So that I can place an order

  Scenario Outline: Complete checkout with a selected product on <viewport>
    Given I open the QA Brains ecommerce login page
    Then the "login page" should be displayed
    When I log in using the email "test@qabrains.com"
    And I click the "Login" button
    Then the "Catalog Page" should be displayed
    When I click the "Filter" button
    And I wait for the "Search" field to be visible
    And I fill the "Search" field with "Low"
    And I wait for the "Low to High (Price)" option to be visible
    And I select the "Low to High (Price)" option
    And I select the "Sample Shoe Name" product and click the "Add to cart" button
    And I click the "Cart" button
    Then the "Cart Page" should be displayed
    When I click the "Checkout" button
    Then the "checkout-info" should be displayed
    When I fill the "First Name" field with "John"
    And I fill the "Last Name" field with "Don"
    And I fill the "Zip Code" field with "14526"
    And I click the "Continue" button
    Then the "Checkout-overview" should be displayed
    When I click the "Finish" button
    Then the "Checkout Completed" should be displayed

    Examples: Viewports
      | viewport |
      | desktop  |
      | tablet   |
      | mobile   |