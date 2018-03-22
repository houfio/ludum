<?php
namespace Ludum\Controller;

use League\Route\Http\Exception\NotFoundException;
use Ludum\Core\Controller;
use Ludum\Core\RouteSet;
use Ludum\Entity\Academy;
use Ludum\Entity\ScoutSubscription;

class SubscriptionController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('subscription_scout', '/subscriptions/scout', 'getScoutSubscription');
    }

    public function getScoutSubscription()
    {
        $scoutSubscriptionRepo = $this->getEntityManager()->getRepository(ScoutSubscription::class);
        $scoutSubscription = $scoutSubscriptionRepo->findAll();

        return $scoutSubscription;
    }
}
