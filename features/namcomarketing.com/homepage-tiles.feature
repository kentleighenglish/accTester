Feature: To ensure the tiles on the homepage match the CMS
In order to make sure Javascript functionality is working, and images and test displays correctly.

@mink:selenium2
Scenario: Clicking on a Homepage Tile
	Given I am on the homepage
	When I click on the "Braintree" homepage tile
	Then I am on the "braintree" location page
