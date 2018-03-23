<?php
namespace Ludum\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="academies")
 * @ORM\Entity
 */
class Academy implements JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    public $name;

    /**
     * @ORM\Column(type="text")
     */
    public $description;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $slogan;

    /**
     * @ORM\Column(type="string", length=512)
     */
    public $header_image;

    /**
     * @ORM\Column(type="string", length=6)
     */
    public $zip_code;

    /**
     * @ORM\Column(type="string", length=32)
     */
    public $city;

    /**
     * @ORM\Column(type="string", length=6)
     */
    public $building_number;

    /**
     * @ORM\Column(type="datetime")
     */
    public $creation_date;

    /**
     * @ORM\OneToMany(targetEntity="AcademyAdmin", mappedBy="academy")
     */
    public $admins;

    /**
     * @ORM\OneToMany(targetEntity="AcademyLike", mappedBy="academy")
     */
    public $likes;

    /**
     * @ORM\OneToMany(targetEntity="AcademySubscription", mappedBy="academy")
     */
    public $subscriptions;

    /**
     * @ORM\OneToMany(targetEntity="AcademyEvent", mappedBy="academy")
     */
    public $events;

    /**
     * @ORM\OneToMany(targetEntity="AcademyPromotion", mappedBy="academy")
     */
    public $promotions;

    /**
     * @ORM\OneToMany(targetEntity="AcademyReview", mappedBy="academy")
     */
    public $reviews;

    /**
     * @ORM\OneToMany(targetEntity="AcademyPurchasable", mappedBy="academy")
     */
    public $purchasables;

    /**
     * @ORM\Column(type="integer", length=6, nullable=true)
     */
    public $min_age;

    /**
     * @ORM\Column(type="integer", length=6, nullable=true)
     */
    public $max_age;

    /**
     * @ORM\OneToMany(targetEntity="AcademyPosition", mappedBy="academy")
     */
    public $positions;

    public function __construct()
    {
        $this->creation_date = new DateTime('now');
        $this->admins = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->subscriptions = new ArrayCollection();
        $this->events = new ArrayCollection();
        $this->promotions = new ArrayCollection();
        $this->reviews = new ArrayCollection();
        $this->purchasables = new ArrayCollection();
        $this->positions = new ArrayCollection();
    }

    public function jsonSerialize(): array
    {
        $reviews = $this->reviews->toArray();
        $stars = array_reduce(
            $reviews,
            function ($previous, $current) {
                return $previous + $current->stars;
            },
            0
        );

        error_log(json_encode([$stars, count($reviews)]));

        $stars /= count($reviews);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'slogan' => $this->slogan,
            'min_age' => $this->min_age,
            'max_age' => $this->max_age,
            'header_image' => $this->header_image,
            'zip_code' => $this->zip_code,
            'city' => $this->city,
            'building_number' => $this->building_number,
            'creation_date' => $this->creation_date->format('Y-m-d H:i'),
            'stars' => $stars,
            'reviews' => $this->reviews->toArray(),
            'subscriptions' => $this->subscriptions->toArray()
        ];
    }
}
