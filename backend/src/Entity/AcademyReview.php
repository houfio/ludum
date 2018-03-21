<?php

namespace Ludum\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="academy_reviews")
 * @ORM\Entity
 */
class AcademyReview implements JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(type="integer", length=1)
     */
    public $stars;

    /**
     * @ORM\ManyToOne(targetEntity="User", mappedBy="id")
     */
    public $user;

    /**
     * @ORM\Column(type="text")
     */
    public $review;

    /**
     * @ORM\Column(type="datetime")
     */
    public $creation_date;

    public function __construct()
    {
        $this->creation_date = new DateTime('now');
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'stars' => $this->stars,
            'review' => $this->review,
            'creation_date' => $this->creation_date->format('Y-m-d H:i')
        ];
    }
}
