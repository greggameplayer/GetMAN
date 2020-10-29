<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
        /*
         * Détection Key & Value depuis URL
        ::A finir::
        $urlExploded = explode( "/?", $form->get('method')->getData());
        $urlKeyValue = explode("&", $urlExploded[1]);
        $urlKey_Value = explode("=", $urlKeyValue);
        $Key_ValueArray = [];
        for($part = 1; $part < count($urlKey_Value); $part+=2){
            $Key_ValueArray [$urlKey_Value[$part-1]] = $urlKey_Value[$part];
        }
        */
        if ($form->get('method')->getData() === "GET") {
            $response = $this->client->request(
                $form->get('method')->getData(),
                $form->get('url')->getData(),
                [
                    'query' => $paramsArray
                ]
            );
        } else {
            $response = $this->client->request(
                $form->get('method')->getData(),
                $form->get('url')->getData(),
                [
                    'json' => $bodyArray
                ]
            );
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
