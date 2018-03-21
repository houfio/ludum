<?php
namespace Ludum\Controller;

use League\Route\Http\Exception\NotFoundException;
use League\Route\Http\Exception\UnprocessableEntityException;
use Ludum\Core\Controller;
use Ludum\Core\RouteSet;
use Ludum\Entity\Academy;

class AcademyController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('academy', '/academy/{id:number}', 'getAcademy')
            ->get('academy_search', '/academy/search', 'getSearchAcademy');
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

    public function getSearchAcademy(array $args, array $vars, array $query)
    {
        if (!isset($query['city'])) {
            throw new UnprocessableEntityException();
        }

        $academyRepo = $this->getEntityManager()->getRepository(Academy::class);
        $academies = $academyRepo->findBy(['city' => $query['city']]);

        return $academies;
    }
}
