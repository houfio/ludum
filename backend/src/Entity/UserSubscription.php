<?php
namespace Ludum\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="user_subscription")
 * @ORM\Entity
 */
class UserSubscription
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="AcademySubscription")
     */
    public $subscription;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     */
    public $user;
}
