<?php
namespace Ludum\Core;

use Ludum\Core\Traits\EntityManagerAwareTrait;
use Ludum\Core\Traits\RequestAwareTrait;
use Ludum\Core\Interfaces\EntityManagerAwareInterface;
use Ludum\Core\Interfaces\RequestAwareInterface;
use Ludum\Entity\AccessToken;
use Ludum\Entity\User;
use League\Container\ContainerAwareInterface;
use League\Container\ContainerAwareTrait;
use League\Route\Http\Exception\UnauthorizedException;

abstract class Controller implements ContainerAwareInterface, RequestAwareInterface, EntityManagerAwareInterface
{
    use ContainerAwareTrait;
    use RequestAwareTrait;
    use EntityManagerAwareTrait;

    public abstract function initialize(): RouteSet;

    public function getAuthenticatedUser(): User
    {
        if (!$this->getRequest()->hasHeader('Authorization')) {
            throw new UnauthorizedException();
        }

        $login_repo = $this->getEntityManager()->getRepository(AccessToken::class);
        /** @var AccessToken $login */
        $login = $login_repo->findOneBy(['token' => $this->getRequest()->getHeader('Authorization')]);

        if (!$login || !$login->active) {
            throw new UnauthorizedException();
        }

        return $login->user;
    }
}
