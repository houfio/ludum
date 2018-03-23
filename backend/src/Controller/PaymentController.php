<?php
namespace Ludum\Controller;

use Ludum\Core\Controller;
use Ludum\Core\RouteSet;
use Ludum\Entity\Order;
use Mollie_API_Client;

class PaymentController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->post('payment_top_up', '/payments/top-up', 'postPaymentTopUp', true, [
                'amount' => ['required']
            ])
            ->get('payment_paid', '/payments/{id:number}', 'getPaymentIsPaid', true)
            ->post('payment_decrease', '/payments/decrease', 'postDecreaseBalance', true, [
                'amount' => ['required']
            ]);
    }

    public function postPaymentTopUp(array $args)
    {
        $user = $this->getAuthenticatedUser();
        $mollie = $this->getPayment();

        $order_id = time();

        $payment = $mollie->payments->create([
            "testmode" => true,
            "amount" => $args['amount'],
            "description" => "Balance top up for user with id: " . $user->id,
            "redirectUrl" => "http://ludum.localhost/payments/{$order_id}",
            "metadata" => [
                "order_id" => $order_id
            ]
        ]);

        $order = new Order();
        $order->order_id = $order_id;
        $order->payment_id = $payment->id;
        $order->user = $user;

        $this->getEntityManager()->persist($order);
        $this->getEntityManager()->flush();

        return $payment->getPaymentUrl();
    }

    public function getPaymentIsPaid(array $args, array $vars)
    {
        $user = $this->getAuthenticatedUser();
        $mollie = $this->getPayment();

        $orderRepo = $this->getEntityManager()->getRepository(Order::class);
        /** @var Order $order */
        $order = $orderRepo->findOneBy(['order_id' => $vars['id']]);

        if (!$order) {
            return false;
        }

        $payment = $mollie->payments->get($order->payment_id);

        if (!$order->completed && $payment->isPaid()) {
            $user->balance += $payment->amount;
            $order->completed = true;

            $this->getEntityManager()->persist($user);
            $this->getEntityManager()->persist($order);
            $this->getEntityManager()->flush();

            return true;
        }

        return false;
    }

    public function postDecreaseBalance(array $args)
    {
        $user = $this->getAuthenticatedUser();

        if ($args['amount'] > $user->balance) {
            return false;
        }

        $user->balance -= $args['amount'];

        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();

        return true;
    }
}
