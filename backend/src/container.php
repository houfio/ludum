<?php
use League\Container\ContainerAwareInterface;
use Ludum\Core\Interfaces\EntityManagerAwareInterface;
use Ludum\Core\Interfaces\PaymentAwareInterface;
use Ludum\Core\Interfaces\RequestAwareInterface;
use Ludum\Provider\CommandProvider;
use Ludum\Provider\ConfigProvider;
use Ludum\Provider\ControllerProvider;
use Ludum\Provider\DispatcherProvider;
use Ludum\Provider\EntityManagerProvider;
use Ludum\Provider\PaymentProvider;
use Ludum\Provider\RequestProvider;
use Ludum\Provider\ResponseProvider;
use League\Container\Argument\RawArgument;
use League\Container\Container;

$container = new Container();

$container->addServiceProvider(new ConfigProvider());
$container->addServiceProvider(new EntityManagerProvider());
$container->addServiceProvider(new CommandProvider());
$container->addServiceProvider(new RequestProvider());
$container->addServiceProvider(new ResponseProvider());
$container->addServiceProvider(new DispatcherProvider());
$container->addServiceProvider(new ControllerProvider());
$container->addServiceProvider(new PaymentProvider());

$container->inflector(ContainerAwareInterface::class)
    ->invokeMethod('setContainer', [new RawArgument($container)]);

$container->inflector(EntityManagerAwareInterface::class)
    ->invokeMethod('setEntityManager', ['entityManager']);

$container->inflector(RequestAwareInterface::class)
    ->invokeMethod('setRequest', ['request']);

$container->inflector(PaymentAwareInterface::class)
    ->invokeMethod('setPayment', ['payment']);

return $container;
