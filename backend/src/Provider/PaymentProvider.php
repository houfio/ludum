<?php
namespace Ludum\Provider;

use League\Container\ServiceProvider\AbstractServiceProvider;
use Mollie_API_Client;

class PaymentProvider extends AbstractServiceProvider
{
    protected $provides = [
        'payment'
    ];

    public function register()
    {
        $this->getContainer()->share('payment', function () {
            $mollie = new Mollie_API_Client();
            $mollie->setApiKey("test_QyKAhJbtwGVfkFx8t4pGVE5EyDBAF5");

            return $mollie;
        });
    }
}
