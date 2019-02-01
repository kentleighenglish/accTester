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
		$driver = $this->getMink()->getSession()->getDriver();

		$this->getMink()->getSession()->start();
		$this->getSession()->resizeWindow(1024, 768, 'current');
		$this->visit('/');
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

		$this->assertElementOnPage('#locations .location p');

		// $this->assertElementOnPage('#locations .location p');
		$locations = $this->getSession()->getPage()->findAll('css', '#locations .location p');

		foreach($locations as $location) {
			if ($arg1 === $location->getText()) {
				$location->click();
			}
		}

		// throw new Exception('Could not find element');
    }

    /**
     * @Then I am on the :arg1 location page
     */
    public function iAmOnTheLocationPage($arg1)
    {
		var_dump($this->printCurrentUrl());
		$this->assertPageAddress($arg1);
    }
}
