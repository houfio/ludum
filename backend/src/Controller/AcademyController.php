<?php
namespace Ludum\Controller;

use League\Route\Http\Exception\NotFoundException;
use League\Route\Http\Exception\UnprocessableEntityException;
use Ludum\Core\Controller;
use Ludum\Core\RouteSet;
use Ludum\Entity\Academy;
use Ludum\Entity\AcademyPosition;
use Ludum\Entity\AcademyPromotion;
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
            ->where('lower(a.city) like lower(:city)')
            ->setParameter('city', '%' . $query['city'] . '%');

        if (isset($query['age']) && !empty($query['age'])) {
            $queryBuilder = $queryBuilder
                ->andWhere('a.min_age <= :age')
                ->andWhere('a.max_age >= :age')
                ->setParameter('age', $query['age']);
        }

        if (isset($query['position']) && !empty($query['position'])) {
            $queryBuilder = $queryBuilder
                ->leftJoin(AcademyPosition::class, 'p', 'with', 'a.id = p.academy')
                ->leftJoin(Position::class, 'pos', 'with', 'p.position = pos.id')
                ->andWhere('pos.id = :position')
                ->setParameter('position', $query['position']);
        }

        if (isset($query['member_count']) && !empty($query['member_count'])) {
            $having = 'count(u.id) < 5';

            switch ($query['member_count']) {
                case '1':
                    $having = 'count(u.id) >= 5 and count(u.id) < 10';
                    break;
                case '2':
                    $having = 'count(u.id) >= 10 and count(u.id) < 25';
                    break;
                case '3':
                    $having = 'count(u.id) >= 25 and count(u.id) < 50';
                    break;
                case '4':
                    $having = 'count(u.id) >= 50';
                    break;
            }

            $queryBuilder = $queryBuilder
                ->leftJoin(AcademySubscription::class, 's', 'with', 'a.id = s.academy')
                ->leftJoin(UserSubscription::class, 'u', 'with', 's.id = u.subscription')
                ->groupBy('a.id')
                ->having($having);
        }

        $executableQuery = $queryBuilder->getQuery();
        $promotionRepo = $this->getEntityManager()->getRepository(AcademyPromotion::class);
        $promotions = $promotionRepo->findAll();

        return array_merge(
            array_map(function ($var) {
                return array_merge($var->academy->jsonSerialize(), ['promotion' => true]);
            }, $promotions),
            $executableQuery->getResult()
        );
    }
}
