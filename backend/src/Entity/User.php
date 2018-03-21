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
     * @ORM\OneToOne(targetEntity="Scout")
     * @ORM\OneToOne(targetEntity="AcademyLike")
     * @ORM\OneToMany(targetEntity="UserSubscription")
     * @ORM\OneToMany(targetEntity="Academy")
     * @ORM\OneToMany(targetEntity="AcademyReview"
     * @ORM\OneToMany(targetEntity="User", mappedBy="id"
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
     * @ORM\Column(type="string", length=16)
     */
    public $phone_number;

    /**
     * @ORM\Column(type="string", length=255)
     */
    public $team;

    /**
     * @ORM\Column(type="string", length=16)
     */
    public $zip_code;

    /**
     * @ORM\Column(type="string", length=16)
     */
    public $house_number;

    /**
     * @ORM\Column(type="date")
     */
    public $birth_date;

    /**
     * @ORM\Column(type="boolean")
     */
    public $receive_newsletter;

    /**
     * @ORM\Column(type="string")
     */
    public $avatar;

    /**
     * @ORM\Column(type="datetime")
     */
    public $creation_date;

    /**
     * @ORM\OneToMany(targetEntity="AccessToken", mappedBy="user")
     */
    public $accessTokens;

    /**
     * @ORM\OneToOne(targetEntity="Academy", mappedBy="user")
     */
    public $academy;

    /**
     * @ORM\OneToMany(targetEntity="UserSubscription", mappedBy="user")
     */
    public $user_subscription;

    public function __construct()
    {
        $this->creation_date = new DateTime();
        $this->accessTokens = new ArrayCollection();
        $this->academy = new ArrayCollection();
        $this->user_subscription = new ArrayCollection();
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'password' => $this->password,
            'phone_number' => $this->phone_number,
            'team' => $this->team,
            'zip_code' => $this->zip_code,
            'house_number' => $this->house_number,
            'birth_date' => $this->birth_date->format('Y-m-d'),
            'receive_newsletter' => $this->receive_newsletter,
            'avatar' => $this->avatar,
            'creation_date' => $this->creation_date->format('Y-m-d H:i'),
            'access_tokens' => array_filter($this->accessTokens->toArray(), function ($var) {
                return $var->active;
            })
        ];
    }
}
