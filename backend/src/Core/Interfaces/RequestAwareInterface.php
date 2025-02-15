<?php
namespace Ludum\Core\Interfaces;

use Zend\Diactoros\ServerRequest;

interface RequestAwareInterface
{
    public function getRequest(): ServerRequest;

    public function setRequest(ServerRequest $request);
}
