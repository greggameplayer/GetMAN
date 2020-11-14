<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201102132552 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE requete ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE requete ADD CONSTRAINT FK_1E6639AAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_1E6639AAA76ED395 ON requete (user_id)');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64910A1A70');
        $this->addSql('DROP INDEX IDX_8D93D64910A1A70 ON user');
        $this->addSql('ALTER TABLE user DROP requetes_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE requete DROP FOREIGN KEY FK_1E6639AAA76ED395');
        $this->addSql('DROP INDEX IDX_1E6639AAA76ED395 ON requete');
        $this->addSql('ALTER TABLE requete DROP user_id');
        $this->addSql('ALTER TABLE user ADD requetes_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64910A1A70 FOREIGN KEY (requetes_id) REFERENCES requete (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_8D93D64910A1A70 ON user (requetes_id)');
    }
}
