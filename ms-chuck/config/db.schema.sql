CREATE DATABASE `project-chuck`;
USE `project-chuck`;

CREATE TABLE IF NOT EXISTS `campaign_tracker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tracking_id` varchar(150) NOT NULL,
  `campaign_id` varchar(150) NOT NULL,
  `first_name` varchar(150) NULL,
  `last_name` varchar(150) NULL,
  `phone_number` varchar(45) NULL,
  `salary` varchar(12) NULL,
  `product` varchar(150) NULL,
  `contact_time_from` time NULL,
  `contact_time_to` time NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tracking_id` (`tracking_id`),
  KEY `campaign_id` (`campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `campaign_opt_out` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tracking_id` varchar(150) NOT NULL,
  `campaign_id` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tracking_id` (`tracking_id`),
  KEY `campaign_id` (`campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
