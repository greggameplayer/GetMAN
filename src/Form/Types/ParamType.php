<?php

namespace App\Form\Types;


use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ParamType extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'attr' => ['class' => 'd-flex flex-row justify-content-center justify-content-around paramtype']
        ]);
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('key', TextType::class, ['label' => false, 'attr' => ['class' => 'form-control mx-auto mb-3', 'placeholder' => 'Clé']])
            ->add('param', TextType::class, ['label' => false, 'attr' => ['class' => 'form-control mx-auto mb-3', 'placeholder' => 'Valeur']]);
    }
}
