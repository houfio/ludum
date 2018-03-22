<?php
namespace Ludum\Provider;

use Doctrine\ORM\Tools\Console\Command\GenerateProxiesCommand;
use Doctrine\ORM\Tools\Console\Command\InfoCommand;
use Doctrine\ORM\Tools\Console\Command\SchemaTool\CreateCommand;
use Doctrine\ORM\Tools\Console\Command\SchemaTool\DropCommand;
use Doctrine\ORM\Tools\Console\Command\SchemaTool\UpdateCommand;
use League\Container\ServiceProvider\AbstractServiceProvider;
use Ludum\Command\RunServerCommand;

class CommandProvider extends AbstractServiceProvider
{
    const COMMANDS = [
        RunServerCommand::class,
        CreateCommand::class,
        DropCommand::class,
        UpdateCommand::class,
        GenerateProxiesCommand::class,
        InfoCommand::class
    ];

    public function provides($alias = null)
    {
        return static::COMMANDS;
    }

    public function register()
    {
        foreach (static::COMMANDS as $command) {
            $this->getContainer()->share($command);
        }
    }
}
