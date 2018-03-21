<?php
namespace Ludum\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
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
     * @ORM\ManyToOne(targetEntity="User")
     */
    public $user;

    /**
     * @ORM\ManyToOne(targetEntity="AcademySubscriptions")
     */
    public $academy_subscription;
}
