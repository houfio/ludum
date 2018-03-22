<?php
namespace Ludum\Controller;

use Ludum\Core\Controller;
use Ludum\Core\RouteSet;
use Ludum\Entity\Position;

class PositionController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('positions', '/positions', 'getPositions');
    }

    public function getPositions()
    {
        $positionRepo = $this->getEntityManager()->getRepository(Position::class);
        $positions = $positionRepo->findAll();

        return $positions;
    }
}