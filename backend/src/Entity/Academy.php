<?php
namespace Ludum\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="academies")
 * @ORM\Entity
 */
class Academy implements JsonSerializable
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
     * @ORM\Column(type="string", length=255)
     */
    public $name;

    /**
     * @ORM\Column(type="text")
     */
    public $description;

    /**
     * @ORM\Column(type="string")
     */
    public $header_image;

    /**
     * @ORM\Column(type="string", length=6)
     */
    public $zip_code;

    /**
     * @ORM\Column(type="string", length=6)
     */
    public $building_number;

    /**
     * @ORM\Column(type="datetime")
     */
    public $creation_date;

    public function __construct()
    {
        $this->creation_date = new DateTime('now');
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'header_image' => $this->header_image,
            'zip_code' => $this->zip_code,
            'building_number' => $this->building_number,
            'creation_date' => $this->creation_date->format('Y-m-d H:i')
        ];
    }
}
