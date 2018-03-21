<?php
namespace Ludum\Controller;

use League\Route\Http\Exception\NotFoundException;
use Ludum\Core\Controller;
use Ludum\Core\RouteSet;
use Ludum\Entity\Academy;

class AcademyController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('academy', '/academy/{id:number}', 'getAcademy');
    }

    public function getAcademy(array $args, array $vars)
    {
        $academyRepo = $this->getEntityManager()->getRepository(Academy::class);
        $academy = $academyRepo->findOneBy(['id' => $vars['id']]);

        if (!$academy) {
            throw new NotFoundException();
        }

        return $academy;
    }
}
