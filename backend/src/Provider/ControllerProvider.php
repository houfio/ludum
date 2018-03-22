<?php
namespace Ludum\Provider;

use League\Container\ServiceProvider\AbstractServiceProvider;
use Ludum\Controller\AcademyController;
use Ludum\Controller\ApiController;
use Ludum\Controller\PaymentController;
use Ludum\Controller\PositionController;
use Ludum\Controller\SubscriptionController;
use Ludum\Controller\UserController;

class ControllerProvider extends AbstractServiceProvider
{
    const CONTROLLERS = [
        ApiController::class,
        UserController::class,
        AcademyController::class,
        SubscriptionController::class,
        PaymentController::class,
        PositionController::class
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
