<?php
namespace Ludum\Entity;

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
     * @Orm\OneToOne(targetEntity="User")
     */
    public $user;

    /**
     * @ORM\ManyToOne(targetEntity="ScoutSubscription")
     */
    public $subscription;

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
            'creation_date' => $this->creation_date,
            'subscription_end' => $this->subscription_end
        ];
    }
}
