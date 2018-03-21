<?php
namespace Ludum\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="academy_likes")
 * @ORM\Entity
 */
class AcademyLike
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
     * @ORM\ManyToOne(targetEntity="User")
     */
    public $user;
}
