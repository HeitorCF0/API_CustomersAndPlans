-- create database `API_web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

-- API_web.plans definição

create table `plans` (
`id` varchar(100) not null,
`name` varchar(100) not null,
`description` varchar(100) not null,
`price` decimal(10, 0) not null,
`type` varchar(100) not null,
`createdAt` date not null,
primary key (`id`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- API_web.users definição

create table `users` (
`id` varchar(100) not null,
`name` varchar(100) not null,
`email` varchar(100) not null,
`password` varchar(100) not null,
`role` varchar(100) not null,
`createdAt` date not null,
primary key (`id`),
unique key `users_unique` (`email`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- API_web.customers definição

create table `customers` (
`id` varchar(100) not null,
`name` varchar(100) not null,
`createdAt` date not null,
`status` varchar(100) not null,
primary key (`id`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- API_web.subscriptions definição

create table `subscriptions` (
`id` varchar(100) not null,
`startDate` date not null,
`state` varchar(100) not null,
`customerId` varchar(100) not null,
`planId` varchar(100) not null,
primary key (`id`),
key `subscriptions_customers_FK` (`customerId`),
key `subscriptions_plans_FK` (`planId`),
constraint `subscriptions_customers_FK` foreign key (`customerId`) references `customers` (`id`),
constraint `subscriptions_plans_FK` foreign key (`planId`) references `plans` (`id`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- -- API_web.adresses definição

CREATE TABLE `adresses` (
`id` varchar(100) NOT NULL,
`customerId` varchar(100) NOT NULL,
`street` varchar(100) DEFAULT NULL,
`number` varchar(100) DEFAULT NULL,
`neighborhood` varchar(100) DEFAULT NULL,
`city` varchar(100) NOT NULL,
`state` varchar(100) NOT NULL,
`cep` varchar(100) DEFAULT NULL,
`complement` varchar(100) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `adresses_customers_FK` (`customerId`),
CONSTRAINT `adresses_customers_FK` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- API_web.emails definição

create table `emails` (
`id` varchar(100) not null,
`customerId` varchar(100) not null,
`email` varchar(100) not null,
primary key (`id`),
unique key `emails_unique` (`email`),
key `emails_customers_FK` (`customerId`),
constraint `emails_customers_FK` foreign key (`customerId`) references `customers` (`id`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- API_web.installment definição

create table `installment` (
`id` varchar(100) not null,
`dueDate` date not null,
`amount` decimal(10, 0) not null,
`state` varchar(100) not null,
`createdAt` varchar(100) not null,
`subscriptionId` varchar(100) not null,
primary key (`id`),
key `installment_subscriptions_FK` (`subscriptionId`),
constraint `installment_subscriptions_FK` foreign key (`subscriptionId`) references `subscriptions` (`id`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- API_web.payments definição

create table `payments` (
`id` varchar(100) not null,
`installmentId` varchar(100) not null,
`amount` decimal(10, 0) not null,
`paymentMethod` varchar(100) not null,
`status` varchar(100) not null,
`comment` varchar(100) default null,
`paidDate` date not null,
primary key (`id`),
key `payments_installment_FK` (`installmentId`),
constraint `payments_installment_FK` foreign key (`installmentId`) references `installment` (`id`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- API_web.phones definição

create table `phones` (
`id` varchar(100) not null,
`customerId` varchar(100) not null,
`phone` varchar(100) not null,
primary key (`id`),
key `phones_customers_FK` (`customerId`),
constraint `phones_customers_FK` foreign key (`customerId`) references `customers` (`id`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;