<?php
namespace Ludum\Controller;

use ludum\Core\Controller;
use ludum\Core\RouteSet;

class AcademyController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('academy', '/academy/{id:number}', 'getAcademy');
    }

    public function getAcademy(array $args, array $vars)
    {
        $academyRepo = $this->getEntityManager()->getRepository('ludum\Entity\Academy');
        $academy = $academyRepo->findOneBy(['id' => $vars['id']]);

        return $academy;
    }
}
