<?php

namespace App\Controller;

use App\Entity\Requete;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use phpDocumentor\Reflection\Types\Boolean;
use PhpParser\Node\Expr\Cast\Bool_;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpClient\Exception\ClientException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class HttpRequestController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function request(FormInterface $form): array
    {
        $paramsArray = [];
        for ($i = 0; $i < count($form->get('params')->getData()); $i++) {
            if (is_numeric($form->get('params')->getData()[$i]['param'])) {
                $paramsArray[$form->get('params')->getData()[$i]['key']] = intval($form->get('params')->getData()[$i]['param']);
            } else {
                $paramsArray[$form->get('params')->getData()[$i]['key']] = $form->get('params')->getData()[$i]['param'];
            }
        }

        $bodyArray = [];
        for ($i = 0; $i < count($form->get('body')->getData()); $i++) {
            if (is_numeric($form->get('body')->getData()[$i]['param'])) {
                $bodyArray[$form->get('body')->getData()[$i]['key']] = intval($form->get('body')->getData()[$i]['param']);
            } else {
                $bodyArray[$form->get('body')->getData()[$i]['key']] = $form->get('body')->getData()[$i]['param'];
            }
        }

        $headersArray = [];
        for ($i = 0; $i < count($form->get('headers')->getData()); $i++) {
            if (is_numeric($form->get('headers')->getData()[$i]['param'])) {
                $headersArray[$form->get('headers')->getData()[$i]['key']] = intval($form->get('headers')->getData()[$i]['param']);
            } else {
                $headersArray[$form->get('headers')->getData()[$i]['key']] = $form->get('headers')->getData()[$i]['param'];
            }
        }

        if ($form->get('method')->getData() === "GET") {
            $response = $this->client->request(
                $form->get('method')->getData(),
                $form->get('url')->getData(),
                [
                    'query' => $paramsArray,
                    'headers' => $headersArray
                ]
            );
        } else {
            $response = $this->client->request(
                $form->get('method')->getData(),
                $form->get('url')->getData(),
                [
                    'json' => $bodyArray,
                    'headers' => $headersArray
                ]
            );
        }

        if($this->client->connected)
        {
            $requeteBdd = new Requete();
            /** @var EntityManager $entityManager */
            $entityManager = $this->client->getDoctrine->getManager();
            $requeteBdd->setUser($this->client->getUser);
            $requeteBdd->setUrl($form->get('url')->getData());
            $requeteBdd->setMethodType($form->get('method')->getData());
            $requeteBdd->setBody($bodyArray);
            $entityManager->persist($requeteBdd);
            $entityManager->flush();
        }



        $statusCode = $response->getStatusCode();
        // $statusCode = 200
        $contentType = $response->getHeaders()['content-type'][0];
        // $contentType = 'application/json'
        $content = $response->getContent();
        // $content = '{"id":521583, "name":"symfony-docs", ...}'
        $content = $response->toArray();
        // $content = ['id' => 521583, 'name' => 'symfony-docs', ...]

        return $content;
    }
}
