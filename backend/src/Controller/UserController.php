<?php
namespace Ludum\Controller;

use DateTime;
use Ludum\Core\Controller;
use Ludum\Entity\AccessToken;
use Ludum\Entity\User;
use Ludum\Core\RouteSet;
use League\Route\Http\Exception\UnauthorizedException;

class UserController extends Controller
{
    const PHONE_NUMBER_REGEX = '/^[0-9]{2}-[0-9]{8}$/';
    const ZIP_CODE_REGEX = '/^[0-9]{4}[A-Z]{2}$/';
    const HOUSE_NUMBER_REGEX = '/^[0-9-]+[A-B]*$/';

    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('user', '/user', 'getUser', true)
            ->post('user_register', '/user/register', 'postRegister', false, [
                'membership_id' => ['required', 'integer'],
                'membership_section' => ['required'],
                'password' => ['required', 'lengthMin' => [8]],
                'first_name' => ['required'],
                'last_name' => ['required'],
                'email' => ['required', 'email'],
                'phone_number' => ['required', 'regex' => [static::PHONE_NUMBER_REGEX]],
                'zip_code' => ['required', 'regex' => [static::ZIP_CODE_REGEX]],
                'house_number' => ['required', 'regex' => [static::HOUSE_NUMBER_REGEX]],
                'birth_date' => ['required', 'date']
            ])
            ->post('user_login', '/user/login', 'postLogin', false, [
                'email' => ['required', 'email'],
                'password' => ['required']
            ])
            ->get('user_logout', '/user/logout', 'getLogout', true)
            ->post('user_update', '/user/update', 'postUpdate', true, [
                'email' => ['email'],
                'receive_emails' => ['boolean'],
                'phone_number' => ['regex' => [static::PHONE_NUMBER_REGEX]],
                'zip_code' => ['regex' => [static::ZIP_CODE_REGEX]],
                'house_number' => ['regex' => [static::HOUSE_NUMBER_REGEX]]
            ])
            ->post('user_update_password', '/user/update/password', 'postPassword', true, [
                'password' => ['required', 'lengthMin' => [8]],
                'logout' => ['required', 'boolean']
            ]);
    }

    public function getUser()
    {
        return $this->getAuthenticatedUser();
    }

    public function postRegister(array $args)
    {
        $userRepo = $this->getEntityManager()->getRepository(User::class);
        $user = $userRepo->findOneBy(['email' => $args['email']]);

        if ($user) {
            return false;
        }

        $user = new User();
        $user->password = password_hash($args['password'], PASSWORD_BCRYPT);
        $user->first_name = $args['first_name'];
        $user->last_name = $args['last_name'];
        $user->email = $args['email'];
        $user->phone_number = $args['phone_number'];
        $user->zip_code = $args['zip_code'];
        $user->house_number = $args['house_number'];
        $user->birth_date = DateTime::createFromFormat('Y-m-d', $args['birth_date']);

        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();

        return true;
    }

    public function postLogin(array $args)
    {
        $serverParams = $this->getRequest()->getServerParams();

        if (!array_key_exists('HTTP_USER_AGENT', $serverParams)
            || !array_key_exists('REMOTE_ADDR', $serverParams)) {
            return false;
        }

        $userRepo = $this->getEntityManager()->getRepository(User::class);
        /** @var User $user */
        $user = $userRepo->findOneBy(['email' => $args['email']]);

        if (!$user || !password_verify($args['password'], $user->password)) {
            return false;
        }

        $login = new AccessToken();
        $login->user = $user;
        $login->token = bin2hex(random_bytes(64));
        $login->user_agent = $serverParams['HTTP_USER_AGENT'];
        $login->ip_address = $serverParams['REMOTE_ADDR'];

        $this->getEntityManager()->persist($login);
        $this->getEntityManager()->flush();

        return ['token' => $login->token];
    }

    public function getLogout()
    {
        $token = $this->getRequest()->getHeader('Authorization');

        if (count($token) === 0) {
            throw new UnauthorizedException();
        }

        $token = $token[0];

        $login_repo = $this->getEntityManager()->getRepository(AccessToken::class);
        /** @var AccessToken $login */
        $login = $login_repo->findOneBy(['token' => $token]);
        $login->active = false;

        $this->getEntityManager()->merge($login);
        $this->getEntityManager()->flush();

        return true;
    }

    public function postUpdate(array $args)
    {
        $user = $this->getAuthenticatedUser();

        foreach ($args as $key => $value) {
            $user->$key = $value;
        }

        $this->getEntityManager()->merge($user);
        $this->getEntityManager()->flush();

        return true;
    }

    public function postPassword(array $args)
    {
        $user = $this->getAuthenticatedUser();

        $user->password = password_hash($args['password'], PASSWORD_BCRYPT);

        if ($args['logout']) {
            foreach ($user->accessTokens as $accessToken) {
                $accessToken->active = false;

                $this->getEntityManager()->merge($accessToken);
            }
        }

        $this->getEntityManager()->merge($user);
        $this->getEntityManager()->flush();

        return true;
    }
}
