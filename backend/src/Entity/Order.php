<?php
namespace Ludum\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="orders")
 * @ORM\Entity
 */
class Order
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
     * @ORM\Column(type="integer")
     */
    public $order_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    public $payment_id;

    /**
     * @ORM\Column(type="boolean")
     */
    public $completed = false;
}
