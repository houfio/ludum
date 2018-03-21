<?php

namespace Ludum\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;


/**
 * @ORM\Table(name="scouts")
 * @ORM\Entity
 */
class Scout implements JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(type="integer")
     * @ORM\OneToOne(targetEntity="User", mappedBy="id")
     */
    public $user;

    /**
     * @@ORM\Column(type="integer")
     * @ORM\ManyToOne(targetEntity="ScoutSubcription", mappedBy="id")
     */
    public $subscription;

    /**
     * @@ORM\Column(type="float")
     */
    public $balance;

    /**
     * @@ORM\Column(type="date")
     */
    public $creation_date;

    /**
     * @@ORM\Column(type="date")
     */
    public $subscription_end;

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'subscription' => $this->subscription,
            'balance' => $this->balance,
            'creation_date' => $this->creation_date,
            'subscription_end' => $this->subscription_end
        ];
    }
}