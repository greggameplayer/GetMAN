<?php

namespace App\Form;

use App\Form\Types\ParamType;
use Doctrine\DBAL\ParameterType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\BaseType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SendType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('method',ChoiceType::class,[
                'choices' =>[
                    "GET" => "GET",
                    "PUT" => "PUT",
                    "POST" => "POST",
                    "DELETE" => "DELETE",
                    "PATCH"=>"PATCH",
                    "COPY"=>"COPY",
                    "HEAD" => "HEAD",
                    "PURGE"=>"PURGE",
                    "OPTIONS" =>"OPTIONS",
                    "LINK"=>"LINK",
                    "UNLINK"=>"UNLINK",
                    "UNLOCK"=>"UNLOCK",
                    "PROFIND"=>"PROFIND",
                    "VIEW"=>"VIEW"
                ]
            ])
            ->add('url', UrlType::class, ['required' => true])
            ->add('params', CollectionType::class, [
                'entry_type' => ParamType::class,
                'entry_options' => ['label' => false, 'attr' => ['class' => 'd-flex flex-row justify-content-center justify-content-around paramtype']],
                'prototype' => true,
                'allow_add' => true,
                'allow_delete' => true,
                'label' => false
            ])
            ->add('Send',SubmitType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
