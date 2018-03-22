<?php
namespace Ludum\Core\Traits;

use Mollie_API_Client;

trait PaymentAwareTrait
{
    private $payment;

    public function getPayment(): Mollie_API_Client
    {
        return $this->payment;
    }

    public function setPayment(Mollie_API_Client $payment)
    {
        $this->payment = $payment;
    }
}
