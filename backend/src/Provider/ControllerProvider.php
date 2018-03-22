<?php
namespace Ludum\Provider;

use League\Container\ServiceProvider\AbstractServiceProvider;

class ControllerProvider extends AbstractServiceProvider
{
    const CONTROLLERS = [
        'Ludum\Controller\ApiController',
        'Ludum\Controller\UserController',
        'Ludum\Controller\AcademyController',
        'Ludum\Controller\SubscriptionController',
        'Ludum\Controller\PaymentController'
    ];

    public function provides($alias = null)
    {
        return static::CONTROLLERS;
    }

    public function register()
    {
        foreach (static::CONTROLLERS as $controllers) {
            $this->getContainer()->share($controllers);
        }
    }
}
