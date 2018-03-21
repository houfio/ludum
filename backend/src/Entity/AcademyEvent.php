<?php

namespace Ludum\Entity;

use DateTime;
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
     * @ORM\Column(type="integer"
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

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'academy_id' => $this->academy,
            'description' => $this->description,
            'date' => $this->date
        ];
    }
}