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
     * @ORM\Column(type="boolean")
     */
    public $admin = false;

    /**
     * @ORM\Column(type="string", length=72)
     */
    public $password;

    /**
     * @ORM\Column(type="datetime")
     */
    public $creation_date;

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
     * @ORM\Column(type="string", length=16)
     */
    public $phone_number;

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
     * @ORM\OneToMany(targetEntity="AccessToken", mappedBy="user")
     */
    public $accessTokens;

    public function __construct()
    {
        $this->creation_date = new DateTime();
        $this->accessTokens = new ArrayCollection();
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'admin' => $this->admin,
            'creation_date' => $this->creation_date->format('Y-m-d H:i'),
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'zip_code' => $this->zip_code,
            'house_number' => $this->house_number,
            'birth_date' => $this->birth_date->format('Y-m-d'),
            'access_tokens' => array_filter($this->accessTokens->toArray(), function ($var) {
                return $var->active;
            })
        ];
    }
}
