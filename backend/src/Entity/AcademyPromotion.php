<?php
namespace Ludum\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="academy_promotions")
 * @ORM\Entity
 */
class AcademyPromotion implements JsonSerializable
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
     * @ORM\Column(type="datetime")
     */
    public $start_date;

    /**
     * @ORM\Column(type="integer", length=3)
     */
    public $run_time;

    /**
     * @ORM\Column(type="integer", length=3)
     */
    public $radius;

    /**
     * @ORM\Column(type="float")
     */
    public $budget;

    public function __construct()
    {
        $this->start_date = new DateTime();
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->start_date->format('Y-m-d H:i'),
            'run_time' => $this->run_time,
            'radius' => $this->radius,
            'budget' => $this->budget
        ];
    }
}
