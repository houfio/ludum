<?php
namespace Ludum\Controller;

use League\Route\Http\Exception\NotFoundException;
use League\Route\Http\Exception\UnprocessableEntityException;
use Ludum\Core\Controller;
use Ludum\Core\RouteSet;
use Ludum\Entity\Academy;
use Ludum\Entity\AcademyPosition;
use Ludum\Entity\AcademySubscription;
use Ludum\Entity\Position;
use Ludum\Entity\UserSubscription;

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

        $queryBuilder = $this->getEntityManager()->createQueryBuilder()
            ->select('a')
            ->from(Academy::class, 'a')
            ->where('a.city = :city')
            ->setParameter('city', $query['city']);

        if (isset($query['age'])) {
            $queryBuilder = $queryBuilder
                ->andWhere('a.min_age <= :age')
                ->andWhere('a.max_age >= :age')
                ->setParameter('age', $query['age']);
        }
        
        if (isset($query['position'])) {
            $queryBuilder = $queryBuilder
                ->innerJoin(AcademyPosition::class, 'p', 'with', 'a.id = p.academy')
                ->innerJoin(Position::class, 'pos', 'with', 'p.position = pos.id')
                ->andWhere('pos.id = :position')
                ->setParameter('position', $query['position']);
        }

        $executableQuery = $queryBuilder->getQuery();

        return $executableQuery->getResult();
    }
}
