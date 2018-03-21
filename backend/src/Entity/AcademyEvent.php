<?php

namespace Ludum\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="user_agenda")
 * @ORM\Entity
 */
class AcademyEvent implements JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="Academy")
     */
    public $academy;

    /**
     * @ORM\Column(type="text")
     */
    public $description;

    /**
     * @ORM\Column(type="datetime")
     */
    public $date;

    /**
     * @ORM\OneToMany(targetEntity="UserEvent", mappedBy="event")
     */
    public $events;

    public function __construct()
    {
        $this->events = new ArrayCollection();
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'date' => $this->date
        ];
    }
}
