<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;


class EmailVerifier
{
    private $verifyEmailHelper;
    private $mailer;
    private $entityManager;

    public function __construct(VerifyEmailHelperInterface $helper, MailerInterface $mailer, EntityManagerInterface $manager)
    {
        $this->verifyEmailHelper = $helper;
        $this->mailer = $mailer;
        $this->entityManager = $manager;
    }

    public function sendEmailConfirmation(string $verifyEmailRouteName, string $token, TemplatedEmail $email): void
    {

        $context = $email->getContext();
        $context['url'] = $_SERVER["SERVER_NAME"]. '/verify/email?token='.$token;

        $email->context($context);

        $this->mailer->send($email);
    }

    public function handleEmailConfirmation(Request $request): void
    {
        /** @var User $user */

        $user = $this->entityManager->getRepository(User::class)->findBy(
            ['token' => $request->get('token')]
        );

        $user[0]->setIsVerified(true);

        $this->entityManager->persist($user[0]);
        $this->entityManager->flush();
    }
}
