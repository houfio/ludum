<?php
namespace Ludum\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="users")
 * @ORM\Entity
 */
class User implements JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $first_name;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $last_name;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $email;

    /**
     * @ORM\Column(type="string", length=72)
     */
    public $password;

    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    public $phone_number;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    public $team;

    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    public $zip_code;

    /**
     * @ORM\Column(type="string", length=32, nullable=true)
     */
    public $city;

    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    public $house_number;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    public $birth_date;

    /**
     * @ORM\Column(type="boolean")
     */
    public $receive_newsletter = true;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    public $avatar;

    /**
     * @ORM\Column(type="datetime")
     */
    public $creation_date;

    /**
     * @ORM\Column(type="float")
     */
    public $balance = 0;

    /**
     * @ORM\OneToMany(targetEntity="AccessToken", mappedBy="user")
     */
    public $accessTokens;

    /**
     * @ORM\OneToMany(targetEntity="AcademyAdmin", mappedBy="user")
     */
    public $admins;

    /**
     * @ORM\OneToMany(targetEntity="AcademyLike", mappedBy="user")
     */
    public $likes;

    /**
     * @ORM\OneToOne(targetEntity="Scout", mappedBy="user")
     */
    public $scout;

    /**
     * @ORM\OneToMany(targetEntity="UserSubscription", mappedBy="user")
     */
    public $subscriptions;

    /**
     * @ORM\OneToMany(targetEntity="UserSubscription", mappedBy="user")
     */
    public $order;

    /**
     * @ORM\OneToMany(targetEntity="UserEvent", mappedBy="user")
     */
    public $events;

    /**
     * @ORM\OneToMany(targetEntity="AcademyReview", mappedBy="user")
     */
    public $reviews;

    /**
     * @ORM\ManyToOne(targetEntity="Position")
     */
    public $position;

    public function __construct()
    {
        $this->creation_date = new DateTime();
        $this->accessTokens = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->admins = new ArrayCollection();
        $this->subscriptions = new ArrayCollection();
        $this->events = new ArrayCollection();
        $this->reviews = new ArrayCollection();
        $this->order = new ArrayCollection();
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'team' => $this->team,
            'zip_code' => $this->zip_code,
            'city' => $this->city,
            'house_number' => $this->house_number,
            'birth_date' => isset($this->birth_date) ? $this->birth_date->format('Y-m-d') : null,
            'receive_newsletter' => $this->receive_newsletter,
            'avatar' => $this->avatar,
            'creation_date' => $this->creation_date->format('Y-m-d H:i'),
            'balance' => $this->balance,
            'access_tokens' => array_filter($this->accessTokens->toArray(), function ($var) {
                return $var->active;
            })
        ];
    }
}
