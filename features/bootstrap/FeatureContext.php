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

	public function prepareContext()
	{
		$this->session = $this->getSession();
		$this->session->setBasicAuth('namco', 'teamwork');

		$this->page = $this->session->getPage();
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
		$this->session = $this->getSession();
		$this->page = $this->session->getPage();
		echo $this->session->getStatusCode();

		var_dump($this->getCurrentUrl());
		die();
		// $this->assertElementOnPage('#locations .location p');
		// $locations = $this->page->findAll('css', '#locations .location p');

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
		$this->assertPageAddress($arg1);
    }
}
