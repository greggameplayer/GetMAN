<?php

namespace App\Entity;

use App\Repository\RequeteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RequeteRepository::class)
 */
class Requete
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $url;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $methodType;

    /**
     * @ORM\Column(type="json")
     */
    private $body = [];

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="requete")
     */
    private $user;


    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getMethodType(): ?string
    {
        return $this->methodType;
    }

    public function setMethodType(string $methodType): self
    {
        $this->methodType = $methodType;

        return $this;
    }

    public function getBody(): ?array
    {
        return $this->body;
    }

    public function setBody(array $body): self
    {
        $this->body = $body;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

}
