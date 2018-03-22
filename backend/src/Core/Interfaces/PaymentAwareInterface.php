<?php
namespace Ludum\Core\Interfaces;

use Mollie_API_Client;

interface PaymentAwareInterface
{
    public function getPayment(): Mollie_API_Client;

    public function setPayment(Mollie_API_Client $payment);
}
