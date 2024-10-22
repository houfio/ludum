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
     * @ORM\Column(type="string", length=128)
     */
    public $title;

    /**
     * @ORM\Column(type="text")
     */
    public $review;

    /**
     * @ORM\Column(type="datetime")
     */
    public $creation_date;

    /**
     * @ORM\ManyToOne(targetEntity="Academy")
     */
    public $academy;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     */
    public $user;

    public function __construct()
    {
        $this->creation_date = new DateTime('now');
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'stars' => $this->stars,
            'title' => $this->title,
            'review' => $this->review,
            'creation_date' => $this->creation_date->format('Y-m-d H:i'),
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name
        ];
    }
}
