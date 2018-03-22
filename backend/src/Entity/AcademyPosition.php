<?php
namespace Ludum\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="academy_positions")
 * @ORM\Entity
 */
class AcademyPosition
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="Academy")
     */
    public $academy;

    /**
     * @ORM\ManyToOne(targetEntity="Position")
     */
    public $position;
}
