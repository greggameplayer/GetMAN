<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201029215053 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE requete (id INT AUTO_INCREMENT NOT NULL, type_requete VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL, body JSON NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD requete_id INT NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64918FB544F FOREIGN KEY (requete_id) REFERENCES requete (id)');
        $this->addSql('CREATE INDEX IDX_8D93D64918FB544F ON user (requete_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64918FB544F');
        $this->addSql('DROP TABLE requete');
        $this->addSql('DROP INDEX IDX_8D93D64918FB544F ON user');
        $this->addSql('ALTER TABLE user DROP requete_id');
    }
}
