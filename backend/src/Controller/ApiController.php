<?php
namespace Ludum\Controller;

use Ludum\Core\Controller;
use Ludum\Core\RouteSet;
use Zend\Diactoros\Response\EmptyResponse;

class ApiController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('api', '/', 'getApi');
    }

    public function getApi()
    {
        return $this->getContainer()->get('pages');
    }

    public function optionsApi()
    {
        return (new EmptyResponse())
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST')
            ->withHeader('Access-Control-Allow-Headers', 'Authorization');
    }
}
