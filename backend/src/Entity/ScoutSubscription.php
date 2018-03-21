<?php

namespace Ludum\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="scout_subscriptions")
 * @ORM\Entity
 */
class ScoutSubscription implements JsonSerializable
{
    /**
     * @@ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Rev(targetEntity="Scout")
     */
    public $id;

    /**
     * @@ORM\Column(type="string", length=255)
     */
    public $title;


    /**
     * @ORM\Column(type="text")
     */
    public $description;

    /**
     * @ORM\Column(type="float")
     */
    public $price;

    public function jsonSerialize(): array
    {
        // TODO: Implement jsonSerialize() method.
    }
}