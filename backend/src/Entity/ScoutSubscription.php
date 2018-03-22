<?php
namespace Ludum\Entity;

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
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(type="string", length=55)
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

    /**
     * @ORM\OneToMany(targetEntity="Scout", mappedBy="subscription")
     */
    public $scouts;

    public function __construct()
    {
        $this->scouts = new ArrayCollection();
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price
        ];
    }
}
