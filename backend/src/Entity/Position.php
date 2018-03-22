<?php
namespace Ludum\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="positions")
 * @ORM\Entity
 */
class Position
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
}
