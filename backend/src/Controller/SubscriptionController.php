<?php
namespace Ludum\Controller;

use League\Route\Http\Exception\NotFoundException;
use Ludum\Core\Controller;
use Ludum\Core\RouteSet;
use Ludum\Entity\Academy;
use Ludum\Entity\AcademySubscription;
use Ludum\Entity\ScoutSubscription;
use Ludum\Entity\UserSubscription;

class SubscriptionController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('subscription_scout', '/subscription/scout', 'getScoutSubscription')
            ->post('subscribe', '/subscription/add', 'postSubscriptionAdd', true, [
                'id' => ['integer', 'required']
            ]);
    }

    public function getScoutSubscription()
    {
        $scoutSubscriptionRepo = $this->getEntityManager()->getRepository(ScoutSubscription::class);
        $scoutSubscription = $scoutSubscriptionRepo->findAll();

        return $scoutSubscription;
    }

    public function postSubscriptionAdd(array $args)
    {
        $user = $this->getAuthenticatedUser();
        $subscriptionRepo = $this->getEntityManager()->getRepository(AcademySubscription::class);
        /** @var AcademySubscription $subscription */
        $subscription = $subscriptionRepo->findOneBy(['id' => $args['id']]);

        if (!$subscription || $user->balance <= $subscription->price) {
            return false;
        }

        $sub = new UserSubscription();
        $sub->user = $user;
        $sub->subscription = $subscription;

        $user->balance -= $subscription->price;

        $this->getEntityManager()->persist($sub);
        $this->getEntityManager()->merge($user);
        $this->getEntityManager()->flush();

        return true;
    }
}
