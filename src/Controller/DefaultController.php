<?php

namespace App\Controller;

use App\Form\SendType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\Exception\ClientException;
use Symfony\Component\HttpClient\Exception\TransportException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpClient\CurlHttpClient;
use Symfony\Component\Routing\Annotation\Route;



class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(Request $request)
    {

        $affichage= false;
        $form = $this->createForm(SendType::class);
        $form->handleRequest($request);
        $result = '';
        $err = '';
        if($form->isSubmitted() && $form->isValid()){
            // envoie la requête
            $client = new CurlHttpClient();
            $requete = new HttpRequestController($client);
            try {
                $result = nl2br($this->prettyPrint(json_encode($requete->request($form))));
            }catch(TransportException $e){
                $err = $e->getMessage();
            }catch (ClientException $e){
                $err = $e->getMessage();
            }
            $affichage = true;
        }
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
            'form' => $form->createView(),
            'affichage' => $affichage,
            'result' => $result,
            'TransportError' => $err,
            'user' => $this->getUser()
        ]);
    }

    function prettyPrint( $json )
    {
        $result = '';
        $level = 0;
        $in_quotes = false;
        $in_escape = false;
        $ends_line_level = NULL;
        $json_length = strlen( $json );
        $colorswitch = false;

        for( $i = 0; $i < $json_length; $i++ ) {
            $char = $json[$i];
            $new_line_level = NULL;
            $post = "";
            if( $ends_line_level !== NULL ) {
                $new_line_level = $ends_line_level;
                $ends_line_level = NULL;
            }
            if ( $in_escape ) {
                $in_escape = false;
            } else if( $char === '"' ) {
                if(! $colorswitch){
                    $char = '<span style="color: green;">'.$char;
                    $colorswitch = true;
                } else {
                    $char = $char.'</span>';
                    $colorswitch = false;
                }
                $in_quotes = !$in_quotes;
            } else if( ! $in_quotes ) {
                switch( $char ) {
                    case '}': case ']':
                    $level--;
                    $ends_line_level = NULL;
                    $new_line_level = $level;
                    $char = '<span style="color: red;">'.$char.'</span>';
                    break;

                    case '{': case '[':
                    $level++;
                    $char = '<span style="color: red;">'.$char.'</span>';
                    case ',':
                        $ends_line_level = $level;
                        $char = '<span style="color: orange;">'.$char.'</span>';
                        break;

                    case ':':
                        $post = " ";
                        break;

                    case " ": case "\t": case "\n": case "\r":
                    $char = "";
                    $ends_line_level = $new_line_level;
                    $new_line_level = NULL;
                    break;
                }
            } else if ( $char === '\\' ) {
                $in_escape = true;
            }
            if( $new_line_level !== NULL ) {
                $result .= "\n".str_repeat( "&nbsp;&nbsp;&nbsp;&nbsp;", $new_line_level );
            }
            $result .= $char.$post;
        }

        return $result;
    }
}
