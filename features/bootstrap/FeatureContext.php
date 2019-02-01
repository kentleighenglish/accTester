<?php

use Behat\Behat\Tester\Exception\PendingException;
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behat\MinkExtension\Context\MinkContext;

/**
 * Defines application features from the specific context.
 */
class FeatureContext extends MinkContext implements Context
{

	public $session;
	public $page;

    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     */
    public function __construct()
    {
    }

	/**
     * @BeforeScenario
     */
    public function beforeScenario()
    {
		$this->getMink()->getSession()->start();
		$this->getSession()->resizeWindow(1440, 900, 'current');
    }

    /**
     * @Given I am on the :arg1 page
     */
    public function iAmOnThePage($arg1)
    {
        throw new PendingException();
    }

    /**
     * @When I click on the :arg1 homepage tile
     */
    public function iClickOnTheHomepageTile($arg1)
    {
		$this->visit('/');

		var_dump($this->getSession()->getPage());

		// $this->assertElementOnPage('#locations .location p');
		$locations = $this->getSession()->getPage()->findAll('css', '#locations .location p');

		foreach($locations as $location) {
			if ($arg1 === $location->getText()) {
				$location->click();
				return;
			}
		}

		// throw new Exception('Could not find element');
    }

    /**
     * @Then I am on the :arg1 location page
     */
    public function iAmOnTheLocationPage($arg1)
    {
		die();
		$this->assertPageAddress($arg1);
    }
}
