## SQL DB Dump

```SQL
-- MySQL dump 10.13 Distrib 8.0.38, for Win64 (x86_64)

--

-- Host: localhost Database: lastbanking

-- ------------------------------------------------------

-- Server version 8.0.38



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!50503 SET NAMES utf8 */;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;

/*!40103 SET TIME_ZONE='+00:00' */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



--

-- Table structure for table `account`

--



DROP  TABLE  IF  EXISTS  `account`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `account` (

`Account_ID`  varchar(16) NOT NULL,

`Balance`  decimal(20,4) NOT NULL  DEFAULT  '0.0000',

`Branch_ID`  varchar(10) NOT NULL,

`Customer_ID`  varchar(16) NOT NULL,

`Account_Type` enum('Saving','Current') NOT NULL  DEFAULT  'Saving',

PRIMARY KEY (`Account_ID`),

KEY  `Branch_ID` (`Branch_ID`),

KEY  `Customer_ID` (`Customer_ID`),

CONSTRAINT  `account_ibfk_1`  FOREIGN KEY (`Branch_ID`) REFERENCES  `branch` (`Branch_ID`),

CONSTRAINT  `account_ibfk_2`  FOREIGN KEY (`Customer_ID`) REFERENCES  `customer` (`Customer_ID`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `account`

--



LOCK TABLES `account` WRITE;

/*!40000 ALTER TABLE `account` DISABLE KEYS */;

INSERT INTO  `account`  VALUES ('3ae16e02-96b7-11',4000.0000,'H8K2L7T3','18d2215b-96b7-11','Saving'),('8cd70c3c-9613-11',160121.0000,'P7R5L8F2','A1B2C3D4E5F6','Saving'),('8d965850-9607-11',14900.0000,'H8K2L7T3','A1B2C3D4E5F6','Current'),('d0f12fe6-9610-11',2700.0000,'H8K2L7T3','A1B2C3D4E5F6','Saving'),('d75faba1-96a2-11',2000.0000,'H8K2L7T3','245a0304-969e-11','Saving'),('f2a9e495-96ae-11',2000.0000,'P7R5L8F2','8e9c3e71-96ae-11','Saving'),('f3cfae36-96b4-11',7580.0000,'P7R5L8F2','d57871ad-96b4-11','Saving');

/*!40000 ALTER TABLE `account` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `branch`

--



DROP  TABLE  IF  EXISTS  `branch`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `branch` (

`Name`  varchar(100) NOT NULL,

`Location`  varchar(250) NOT NULL,

`Branch_ID`  varchar(10) NOT NULL,

`Manager_ID`  varchar(10) DEFAULT  NULL,

PRIMARY KEY (`Branch_ID`),

UNIQUE  KEY  `unique_name_branch` (`Name`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `branch`

--



LOCK TABLES `branch` WRITE;

/*!40000 ALTER TABLE `branch` DISABLE KEYS */;

INSERT INTO  `branch`  VALUES ('Main Branch','123 Main St, New York','H8K2L7T3','X2F9G5P8'),('West Branch','456 Oak St, Los Angeles','P7R5L8F2','M6P9R4B1');

/*!40000 ALTER TABLE `branch` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `customer`

--



DROP  TABLE  IF  EXISTS  `customer`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `customer` (

`Customer_ID`  varchar(16) NOT NULL,

`Name`  varchar(100) NOT NULL,

`Address_Line_1`  varchar(50) DEFAULT  NULL,

`Address_Line_2`  varchar(50) DEFAULT  NULL,

`City`  varchar(20) NOT NULL,

`Phone_Number`  varchar(15) NOT NULL,

`Email`  varchar(50) NOT NULL,

`Password`  varchar(60) NOT NULL,

PRIMARY KEY (`Customer_ID`),

UNIQUE  KEY  `unique_email_customer` (`Email`),

UNIQUE  KEY  `unique_phone_customer` (`Phone_Number`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `customer`

--



LOCK TABLES `customer` WRITE;

/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO  `customer`  VALUES ('18d2215b-96b7-11','Sunimal Ranatunge','Katubedda','Moratuwa','Colombo','0823728378','s@gmail.com','00000'),('245a0304-969e-11','Anuja Pavan Kalhara Nandasiri','7/22, Chamara Uyana, Wathurugama Road','','Mudungoda','123456789123456','anujak@gmail.com','00000'),('8e9c3e71-96ae-11','Pulindu','Y Junction','Makola','Colombo','0775438928','pv@gmail.com','00000'),('A1B2C3D4E5F6','John Doe','123 Main St','Apt 4B','New York','1234567890','john.doe@example.com','$2b$10$o/CwJcYL0SbU71ZKpI2I7eQRg4W8VCjFbmvy..WFMYyodOZAZmoJm'),('d57871ad-96b4-11','Steve Vaugh','Baker Street','','London','0112563548','stevevaugh@bank.com','00000'),('F4H6J7L9P1R2','Jane Smith','456 Oak St','','Los Angeles','0987654321','jane.smith@example.com','$2b$10$o/CwJcYL0SbU71ZKpI2I7eQRg4W8VCjFbmvy..WFMYyodOZAZmoJm');

/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `employee`

--



DROP  TABLE  IF  EXISTS  `employee`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `employee` (

`Name`  varchar(100) NOT NULL,

`Employee_ID`  varchar(10) NOT NULL,

`Address_Line_1`  varchar(50) DEFAULT  NULL,

`Address_Line_2`  varchar(50) DEFAULT  NULL,

`City`  varchar(20) NOT NULL,

`Phone_Number`  varchar(15) NOT NULL,

`Email`  varchar(50) NOT NULL,

`NIC`  varchar(10) NOT NULL,

`Branch_ID`  varchar(10) NOT NULL,

`Password`  varchar(60) NOT NULL,

PRIMARY KEY (`Employee_ID`),

UNIQUE  KEY  `unique_email_employee` (`Email`),

UNIQUE  KEY  `unique_phone_employee` (`Phone_Number`),

UNIQUE  KEY  `unique_nic_employee` (`NIC`),

KEY  `Branch_ID` (`Branch_ID`),

CONSTRAINT  `employee_ibfk_1`  FOREIGN KEY (`Branch_ID`) REFERENCES  `branch` (`Branch_ID`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `employee`

--



LOCK TABLES `employee` WRITE;

/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO  `employee`  VALUES ('Anuja Nandasiri','M6P9R4B1','350','Miriswatte','Gampaha','076623415212345','apk@bank.com','2001714212','P7R5L8F2','$2b$10$iwcwD3KhmgRRMGBRCqm8XOb3Tz/f/SQOqit0mhjwrJf0MSfzAONi.'),('Susa Dilmin','M7P9Z4B1','Kalpitiya Rd',NULL,'Puttalama','076678965212345','susa@bank.com','2004563212','P7R5L8F2','$2b$10$iwcwD3KhmgRRMGBRCqm8XOb3Tz/f/SQOqit0mhjwrJf0MSfzAONi.'),('Dilanka Eshan','X2F9G5P8','207','Gonagala','Benthota','076541415212345','hashdil@bank.com','2002563212','H8K2L7T3','$2b$10$iwcwD3KhmgRRMGBRCqm8XOb3Tz/f/SQOqit0mhjwrJf0MSfzAONi.');

/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `fd`

--



DROP  TABLE  IF  EXISTS  `fd`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `fd` (

`FD_ID`  varchar(16) NOT NULL,

`Account_ID`  varchar(16) NOT NULL,

`Amount`  decimal(20,4) NOT NULL  DEFAULT  '0.0000',

`Start_Date`  date  NOT NULL,

`FD_Plan_ID`  varchar(5) NOT NULL,

`Status` enum('Active','Matured','Closed') DEFAULT  NULL,

`Next_interest_calculation`  date  DEFAULT  NULL,

PRIMARY KEY (`FD_ID`),

KEY  `Account_ID` (`Account_ID`),

KEY  `FD_Plan_ID` (`FD_Plan_ID`),

CONSTRAINT  `fk_fd_plan`  FOREIGN KEY (`FD_Plan_ID`) REFERENCES  `fd_plan` (`FD_Plan_ID`) ON DELETE RESTRICT,

CONSTRAINT  `fk_fd_saving_account`  FOREIGN KEY (`Account_ID`) REFERENCES  `saving_account` (`Account_ID`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `fd`

--



LOCK TABLES `fd` WRITE;

/*!40000 ALTER TABLE `fd` DISABLE KEYS */;

INSERT INTO  `fd`  VALUES ('0000000000000001','8cd70c3c-9613-11',100.0000,'2024-10-30','T5G8P','Active','2024-11-29'),('0000000000000002','d0f12fe6-9610-11',30.0000,'2024-10-30','T5G8P','Active','2024-11-29');

/*!40000 ALTER TABLE `fd` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `fd_plan`

--



DROP  TABLE  IF  EXISTS  `fd_plan`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `fd_plan` (

`FD_Plan_ID`  varchar(5) NOT NULL,

`Period_in_Months`  int  NOT NULL,

`Interest_Rate`  decimal(6,4) NOT NULL,

PRIMARY KEY (`FD_Plan_ID`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `fd_plan`

--



LOCK TABLES `fd_plan` WRITE;

/*!40000 ALTER TABLE `fd_plan` DISABLE KEYS */;

INSERT INTO  `fd_plan`  VALUES ('T5G8P',12,3.5000),('Z4W9S',24,4.0000);

/*!40000 ALTER TABLE `fd_plan` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Temporary view structure for view `fetchallaccountsview`

--



DROP  TABLE  IF  EXISTS  `fetchallaccountsview`;

/*!50001 DROP VIEW IF EXISTS `fetchallaccountsview`*/;

SET @saved_cs_client = @@character_set_client;

/*!50503 SET character_set_client = utf8mb4 */;

/*!50001 CREATE VIEW `fetchallaccountsview` AS SELECT

1 AS `Customer_ID`,

1 AS `Customer_Name`,

1 AS `Account_ID`,

1 AS `Balance`,

1 AS `Branch_ID`,

1 AS `Branch_Name`*/;

SET character_set_client = @saved_cs_client;



--

-- Temporary view structure for view `fetchcustomerfullview`

--



DROP  TABLE  IF  EXISTS  `fetchcustomerfullview`;

/*!50001 DROP VIEW IF EXISTS `fetchcustomerfullview`*/;

SET @saved_cs_client = @@character_set_client;

/*!50503 SET character_set_client = utf8mb4 */;

/*!50001 CREATE VIEW `fetchcustomerfullview` AS SELECT

1 AS `Customer_ID`,

1 AS `Name`,

1 AS `Address_Line_1`,

1 AS `Address_Line_2`,

1 AS `City`,

1 AS `Phone_Number`,

1 AS `Email`,

1 AS `Account_ID`,

1 AS `Balance`,

1 AS `Branch_ID`,

1 AS `Branch_Name`*/;

SET character_set_client = @saved_cs_client;



--

-- Temporary view structure for view `fetchcustomersfiltered`

--



DROP  TABLE  IF  EXISTS  `fetchcustomersfiltered`;

/*!50001 DROP VIEW IF EXISTS `fetchcustomersfiltered`*/;

SET @saved_cs_client = @@character_set_client;

/*!50503 SET character_set_client = utf8mb4 */;

/*!50001 CREATE VIEW `fetchcustomersfiltered` AS SELECT

1 AS `Account_IDs`,

1 AS `Customer_ID`,

1 AS `Name`,

1 AS `Total_Balance`,

1 AS `Email`,

1 AS `City`,

1 AS `Phone_Number`*/;

SET character_set_client = @saved_cs_client;



--

-- Temporary view structure for view `fetchloansview`

--



DROP  TABLE  IF  EXISTS  `fetchloansview`;

/*!50001 DROP VIEW IF EXISTS `fetchloansview`*/;

SET @saved_cs_client = @@character_set_client;

/*!50503 SET character_set_client = utf8mb4 */;

/*!50001 CREATE VIEW `fetchloansview` AS SELECT

1 AS `Loan_ID`,

1 AS `Amount`,

1 AS `Interest_Rate`,

1 AS `Issued_Date`,

1 AS `Duration_in_Months`,

1 AS `Account_ID`,

1 AS `Fixed_Deposit_ID`*/;

SET character_set_client = @saved_cs_client;



--

-- Temporary view structure for view `fetchtransactionsbybranchview`

--



DROP  TABLE  IF  EXISTS  `fetchtransactionsbybranchview`;

/*!50001 DROP VIEW IF EXISTS `fetchtransactionsbybranchview`*/;

SET @saved_cs_client = @@character_set_client;

/*!50503 SET character_set_client = utf8mb4 */;

/*!50001 CREATE VIEW `fetchtransactionsbybranchview` AS SELECT

1 AS `Transaction_ID`,

1 AS `Source_Account_ID`,

1 AS `Destination_Account_ID`,

1 AS `Date_and_Time`,

1 AS `Amount`,

1 AS `Type`,

1 AS `Transaction_Branch_ID`,

1 AS `Source_Branch_ID`,

1 AS `Destination_Branch_ID`*/;

SET character_set_client = @saved_cs_client;



--

-- Table structure for table `loan`

--



DROP  TABLE  IF  EXISTS  `loan`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `loan` (

`Loan_ID`  varchar(16) NOT NULL,

`Amount`  decimal(20,4) NOT NULL  DEFAULT  '0.0000',

`Interest_Rate`  decimal(6,4) NOT NULL,

`Issued_Date`  date  NOT NULL,

`Duration_in_Months`  int  NOT NULL,

`Status` enum('Active','Settled','Bad-Debt') NOT NULL  DEFAULT  'Active',

`Account_ID`  varchar(16) NOT NULL,

PRIMARY KEY (`Loan_ID`),

KEY  `Account_ID` (`Account_ID`),

CONSTRAINT  `loan_account_id`  FOREIGN KEY (`Account_ID`) REFERENCES  `account` (`Account_ID`) ON DELETE RESTRICT

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `loan`

--



LOCK TABLES `loan` WRITE;

/*!40000 ALTER TABLE `loan` DISABLE KEYS */;

INSERT INTO  `loan`  VALUES ('000001',60000.0000,10.0000,'2024-10-30',6,'Active','8cd70c3c-9613-11'),('000002',60000.0000,10.0000,'2024-10-30',12,'Active','8cd70c3c-9613-11'),('000003',99999.0000,10.0000,'2024-10-30',6,'Active','8cd70c3c-9613-11'),('92JOYIM4',35.0000,12.0000,'2024-10-30',6,'Active','8cd70c3c-9613-11'),('V1FF0H7O',20.0000,12.0000,'2024-10-30',6,'Active','8cd70c3c-9613-11'),('ZDC0VWHD',20.0000,12.0000,'2024-10-30',6,'Active','8cd70c3c-9613-11');

/*!40000 ALTER TABLE `loan` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `loan_installment`

--



DROP  TABLE  IF  EXISTS  `loan_installment`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `loan_installment` (

`Instalment_ID`  varchar(16) NOT NULL,

`Due_Date`  date  NOT NULL,

`Amount`  decimal(20,4) NOT NULL  DEFAULT  '0.0000',

`Loan_ID`  varchar(16) NOT NULL,

`Status` enum('Pending','Paid','Partial') DEFAULT  NULL,

PRIMARY KEY (`Instalment_ID`),

KEY  `Loan_ID` (`Loan_ID`),

CONSTRAINT  `loan_installment_loanID`  FOREIGN KEY (`Loan_ID`) REFERENCES  `loan` (`Loan_ID`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `loan_installment`

--



LOCK TABLES `loan_installment` WRITE;

/*!40000 ALTER TABLE `loan_installment` DISABLE KEYS */;

INSERT INTO  `loan_installment`  VALUES ('000001_01','2024-10-30',60000.0000,'000001','Pending'),('000001_02','2024-11-30',60000.0000,'000001','Pending'),('000001_03','2024-12-30',60000.0000,'000001','Pending'),('000001_04','2025-01-30',60000.0000,'000001','Pending'),('000001_05','2025-02-28',60000.0000,'000001','Pending'),('000001_06','2025-03-30',60000.0000,'000001','Pending'),('000003_01','2024-10-30',99999.0000,'000003','Pending'),('000003_02','2024-11-30',99999.0000,'000003','Pending'),('000003_03','2024-12-30',99999.0000,'000003','Pending'),('000003_04','2025-01-30',99999.0000,'000003','Pending'),('000003_05','2025-02-28',99999.0000,'000003','Pending'),('000003_06','2025-03-30',99999.0000,'000003','Pending'),('92JOYIM4_1','2024-10-30',40.8333,'92JOYIM4',NULL),('92JOYIM4_2','2024-11-30',40.8333,'92JOYIM4',NULL),('92JOYIM4_3','2024-12-30',40.8333,'92JOYIM4',NULL),('92JOYIM4_4','2025-01-30',40.8333,'92JOYIM4',NULL),('92JOYIM4_5','2025-02-28',40.8333,'92JOYIM4',NULL),('92JOYIM4_6','2025-03-28',40.8333,'92JOYIM4',NULL),('V1FF0H7O_1','2024-10-30',23.3333,'V1FF0H7O',NULL),('V1FF0H7O_2','2024-11-30',23.3333,'V1FF0H7O',NULL),('V1FF0H7O_3','2024-12-30',23.3333,'V1FF0H7O',NULL),('V1FF0H7O_4','2025-01-30',23.3333,'V1FF0H7O',NULL),('V1FF0H7O_5','2025-02-28',23.3333,'V1FF0H7O',NULL),('V1FF0H7O_6','2025-03-28',23.3333,'V1FF0H7O',NULL),('ZDC0VWHD_1','2024-10-30',23.3333,'ZDC0VWHD',NULL),('ZDC0VWHD_2','2024-11-30',23.3333,'ZDC0VWHD',NULL),('ZDC0VWHD_3','2024-12-30',23.3333,'ZDC0VWHD',NULL),('ZDC0VWHD_4','2025-01-30',23.3333,'ZDC0VWHD',NULL),('ZDC0VWHD_5','2025-02-28',23.3333,'ZDC0VWHD',NULL),('ZDC0VWHD_6','2025-03-28',23.3333,'ZDC0VWHD',NULL);

/*!40000 ALTER TABLE `loan_installment` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `manual_loan`

--



DROP  TABLE  IF  EXISTS  `manual_loan`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `manual_loan` (

`Loan_ID`  varchar(16) NOT NULL,

`Status` enum('Accept','Reject','Pending') NOT NULL  DEFAULT  'Pending',

`Employee_ID`  varchar(10) NOT NULL,

PRIMARY KEY (`Loan_ID`),

KEY  `Employee_ID` (`Employee_ID`),

CONSTRAINT  `fk_manual_loan_employee`  FOREIGN KEY (`Employee_ID`) REFERENCES  `employee` (`Employee_ID`) ON DELETE RESTRICT

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `manual_loan`

--



LOCK TABLES `manual_loan` WRITE;

/*!40000 ALTER TABLE `manual_loan` DISABLE KEYS */;

INSERT INTO  `manual_loan`  VALUES ('000001','Accept','M7P9Z4B1'),('000002','Pending','M6P9R4B1'),('000003','Accept','M6P9R4B1');

/*!40000 ALTER TABLE `manual_loan` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `online_loan`

--



DROP  TABLE  IF  EXISTS  `online_loan`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `online_loan` (

`Loan_ID`  varchar(16) NOT NULL,

`Fixed_Deposit_ID`  varchar(16) NOT NULL,

PRIMARY KEY (`Loan_ID`),

KEY  `Fixed_Deposit_ID` (`Fixed_Deposit_ID`),

CONSTRAINT  `fk_online_loan_fd`  FOREIGN KEY (`Fixed_Deposit_ID`) REFERENCES  `fd` (`FD_ID`) ON DELETE RESTRICT

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `online_loan`

--



LOCK TABLES `online_loan` WRITE;

/*!40000 ALTER TABLE `online_loan` DISABLE KEYS */;

INSERT INTO  `online_loan`  VALUES ('92JOYIM4','0000000000000001'),('V1FF0H7O','0000000000000001'),('ZDC0VWHD','0000000000000001');

/*!40000 ALTER TABLE `online_loan` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `organization`

--



DROP  TABLE  IF  EXISTS  `organization`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `organization` (

`Customer_ID`  varchar(16) NOT NULL,

`Registration_Number`  varchar(10) NOT NULL,

`Registration_Date`  date  NOT NULL,

PRIMARY KEY (`Customer_ID`),

CONSTRAINT  `fk_organization_customer`  FOREIGN KEY (`Customer_ID`) REFERENCES  `customer` (`Customer_ID`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `organization`

--



LOCK TABLES `organization` WRITE;

/*!40000 ALTER TABLE `organization` DISABLE KEYS */;

INSERT INTO  `organization`  VALUES ('A1B2C3D4E5F6','7YT54321','2020-01-01'),('F4H6J7L9P1R2','8YTR6543','2019-05-15');

/*!40000 ALTER TABLE `organization` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `personal`

--



DROP  TABLE  IF  EXISTS  `personal`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `personal` (

`Customer_ID`  varchar(16) NOT NULL,

`NIC`  varchar(10) NOT NULL,

`Date_of_Birth`  date  NOT NULL,

PRIMARY KEY (`Customer_ID`),

UNIQUE  KEY  `unique_nic_personal` (`NIC`),

CONSTRAINT  `fk_personal_customer`  FOREIGN KEY (`Customer_ID`) REFERENCES  `customer` (`Customer_ID`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `personal`

--



LOCK TABLES `personal` WRITE;

/*!40000 ALTER TABLE `personal` DISABLE KEYS */;

INSERT INTO  `personal`  VALUES ('18d2215b-96b7-11','8274813278','2000-03-22'),('245a0304-969e-11','1234567891','1997-01-15'),('8e9c3e71-96ae-11','2323230199','2002-06-13'),('A1B2C3D4E5F6','987654321V','1990-10-05'),('d57871ad-96b4-11','1237896542','2024-10-16'),('F4H6J7L9P1R2','123456789V','1985-08-23');

/*!40000 ALTER TABLE `personal` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `plan_type`

--



DROP  TABLE  IF  EXISTS  `plan_type`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `plan_type` (

`Plan_ID`  varchar(5) NOT NULL,

`Plan_Name`  varchar(50) NOT NULL,

`Interest_Rate`  decimal(6,4) NOT NULL,

`minimum_amount`  decimal(20,4) DEFAULT  '0.0000',

PRIMARY KEY (`Plan_ID`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `plan_type`

--



LOCK TABLES `plan_type` WRITE;

/*!40000 ALTER TABLE `plan_type` DISABLE KEYS */;

INSERT INTO  `plan_type`  VALUES ('LK620','Senior',0.1300,1000.0000),('LK621','Adult',0.1000,1000.0000),('LK622','Teen',0.1100,500.0000),('LK623','Children',0.1200,0.0000);

/*!40000 ALTER TABLE `plan_type` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `saving_account`

--



DROP  TABLE  IF  EXISTS  `saving_account`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `saving_account` (

`Account_ID`  varchar(16) NOT NULL,

`Remaining_Withdrawals`  int  NOT NULL  DEFAULT  '0',

`Plan_ID`  varchar(5) NOT NULL,

PRIMARY KEY (`Account_ID`),

KEY  `Plan_ID` (`Plan_ID`),

CONSTRAINT  `fk_saving_account_base`  FOREIGN KEY (`Account_ID`) REFERENCES  `account` (`Account_ID`) ON DELETE CASCADE,

CONSTRAINT  `fk_saving_account_plan`  FOREIGN KEY (`Plan_ID`) REFERENCES  `plan_type` (`Plan_ID`) ON DELETE RESTRICT ON  UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `saving_account`

--



LOCK TABLES `saving_account` WRITE;

/*!40000 ALTER TABLE `saving_account` DISABLE KEYS */;

INSERT INTO  `saving_account`  VALUES ('3ae16e02-96b7-11',5,'LK621'),('8cd70c3c-9613-11',0,'LK621'),('d0f12fe6-9610-11',5,'LK620'),('d75faba1-96a2-11',5,'LK620'),('f2a9e495-96ae-11',5,'LK621'),('f3cfae36-96b4-11',5,'LK621');

/*!40000 ALTER TABLE `saving_account` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Table structure for table `transaction`

--



DROP  TABLE  IF  EXISTS  `transaction`;

/*!40101 SET @saved_cs_client = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE  TABLE `transaction` (

`Transaction_ID`  varchar(20) NOT NULL,

`Source_Account_ID`  varchar(16) DEFAULT  NULL,

`Destination_Account_ID`  varchar(16) DEFAULT  NULL,

`Date_and_Time`  timestamp  NOT NULL  DEFAULT CURRENT_TIMESTAMP,

`Amount`  decimal(20,4) NOT NULL  DEFAULT  '0.0000',

`Type` enum('Deposit','Withdrawal','Loan-Payment','Interest-Rate','Transfer','FD','Loan') NOT NULL  DEFAULT  'Transfer',

`Description`  varchar(100) DEFAULT  NULL,

`Branch_ID`  varchar(10) NOT NULL,

PRIMARY KEY (`Transaction_ID`),

KEY  `Source_Account_ID` (`Source_Account_ID`),

KEY  `Destination_Account_ID` (`Destination_Account_ID`),

KEY  `Branch_ID` (`Branch_ID`),

CONSTRAINT  `fk_transaction_branch`  FOREIGN KEY (`Branch_ID`) REFERENCES  `branch` (`Branch_ID`) ON DELETE RESTRICT,

CONSTRAINT  `fk_transaction_destination`  FOREIGN KEY (`Destination_Account_ID`) REFERENCES  `account` (`Account_ID`) ON DELETE RESTRICT,

CONSTRAINT  `fk_transaction_source`  FOREIGN KEY (`Source_Account_ID`) REFERENCES  `account` (`Account_ID`) ON DELETE RESTRICT

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Dumping data for table `transaction`

--



LOCK TABLES `transaction` WRITE;

/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;

INSERT INTO  `transaction`  VALUES ('3ae1e461-96b7-11ef-8','3ae16e02-96b7-11',NULL,'2024-10-30 12:05:18',4000.0000,'Deposit','Initial deposit','H8K2L7T3'),('459f9538-969a-11',NULL,'8cd70c3c-9613-11','2024-10-30 08:38:00',300.0000,'Deposit',NULL,'P7R5L8F2'),('5b1929fc-969c-11ef-8','d0f12fe6-9610-11',NULL,'2024-10-30 08:52:55',30.0000,'FD','Fixed Deposit Created, FD_ID: 0000000000000002','H8K2L7T3'),('61aba068-969a-11ef-8','8cd70c3c-9613-11',NULL,'2024-10-30 08:38:47',500.0000,'Withdrawal',NULL,'P7R5L8F2'),('70934e32-969a-11ef-8','8cd70c3c-9613-11',NULL,'2024-10-30 08:39:12',100.0000,'FD','Fixed Deposit Created, FD_ID: 0000000000000001','P7R5L8F2'),('83907209-96b8-11ef-8','8cd70c3c-9613-11',NULL,'2024-10-30 12:14:29',10.0000,'Withdrawal',NULL,'P7R5L8F2'),('8be000f2-96b8-11ef-8','8cd70c3c-9613-11',NULL,'2024-10-30 12:14:43',10.0000,'Withdrawal',NULL,'P7R5L8F2'),('8cd75b1f-9613-11','8cd70c3c-9613-11',NULL,'2024-10-29 16:33:38',462.0000,'Deposit','Initial deposit','P7R5L8F2'),('8d976a4b-9607-11','8d965850-9607-11',NULL,'2024-10-29 15:07:45',15000.0000,'Deposit','Initial deposit','H8K2L7T3'),('9456cf56-96b7-11ef-8','8d965850-9607-11','8cd70c3c-9613-11','2024-10-30 12:07:48',100.0000,'Transfer','Transfer to another acc','H8K2L7T3'),('a22a32bd-96b8-11ef-8','8cd70c3c-9613-11',NULL,'2024-10-30 12:15:21',10.0000,'Withdrawal',NULL,'P7R5L8F2'),('a67d190f-96a4-11',NULL,'8cd70c3c-9613-11','2024-10-30 09:52:18',60000.0000,'Deposit',NULL,'P7R5L8F2'),('ac906571-96b8-11ef-8','8cd70c3c-9613-11',NULL,'2024-10-30 12:15:38',10.0000,'Withdrawal',NULL,'P7R5L8F2'),('c9044a16-96a4-11',NULL,'8cd70c3c-9613-11','2024-10-30 09:53:16',99999.0000,'Deposit',NULL,'P7R5L8F2'),('d0f1b15a-9610-11','d0f12fe6-9610-11',NULL,'2024-10-29 16:14:04',2630.0000,'Deposit','Initial deposit','H8K2L7T3'),('d75feb96-96a2-11','d75faba1-96a2-11',NULL,'2024-10-30 09:39:21',2000.0000,'Deposit','Initial deposit','H8K2L7T3'),('f2aa0d00-96ae-11ef-8','f2a9e495-96ae-11',NULL,'2024-10-30 11:06:01',2000.0000,'Deposit','Initial deposit','P7R5L8F2'),('f3cfc9cd-96b4-11ef-8','f3cfae36-96b4-11',NULL,'2024-10-30 11:49:00',7580.0000,'Deposit','Initial deposit','P7R5L8F2'),('ff12880e-969c-11ef-8','8cd70c3c-9613-11','d0f12fe6-9610-11','2024-10-30 08:57:31',100.0000,'Transfer','Online Tranfer','H8K2L7T3');

/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;

UNLOCK TABLES;



--

-- Final view structure for view `fetchallaccountsview`

--



/*!50001 DROP VIEW IF EXISTS `fetchallaccountsview`*/;

/*!50001 SET @saved_cs_client = @@character_set_client */;

/*!50001 SET @saved_cs_results = @@character_set_results */;

/*!50001 SET @saved_col_connection = @@collation_connection */;

/*!50001 SET character_set_client = utf8mb4 */;

/*!50001 SET character_set_results = utf8mb4 */;

/*!50001 SET collation_connection = utf8mb4_0900_ai_ci */;

/*!50001 CREATE ALGORITHM=UNDEFINED */

/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */

/*!50001 VIEW `fetchallaccountsview` AS select `c`.`Customer_ID` AS `Customer_ID`,`c`.`Name` AS `Customer_Name`,`a`.`Account_ID` AS `Account_ID`,`a`.`Balance` AS `Balance`,`a`.`Branch_ID` AS `Branch_ID`,`b`.`Name` AS `Branch_Name` from ((`account` `a` join `customer` `c` on((`a`.`Customer_ID` = `c`.`Customer_ID`))) join `branch` `b` on((`a`.`Branch_ID` = `b`.`Branch_ID`))) */;

/*!50001 SET character_set_client = @saved_cs_client */;

/*!50001 SET character_set_results = @saved_cs_results */;

/*!50001 SET collation_connection = @saved_col_connection */;



--

-- Final view structure for view `fetchcustomerfullview`

--



/*!50001 DROP VIEW IF EXISTS `fetchcustomerfullview`*/;

/*!50001 SET @saved_cs_client = @@character_set_client */;

/*!50001 SET @saved_cs_results = @@character_set_results */;

/*!50001 SET @saved_col_connection = @@collation_connection */;

/*!50001 SET character_set_client = utf8mb4 */;

/*!50001 SET character_set_results = utf8mb4 */;

/*!50001 SET collation_connection = utf8mb4_0900_ai_ci */;

/*!50001 CREATE ALGORITHM=UNDEFINED */

/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */

/*!50001 VIEW `fetchcustomerfullview` AS select `c`.`Customer_ID` AS `Customer_ID`,`c`.`Name` AS `Name`,`c`.`Address_Line_1` AS `Address_Line_1`,`c`.`Address_Line_2` AS `Address_Line_2`,`c`.`City` AS `City`,`c`.`Phone_Number` AS `Phone_Number`,`c`.`Email` AS `Email`,`a`.`Account_ID` AS `Account_ID`,`a`.`Balance` AS `Balance`,`a`.`Branch_ID` AS `Branch_ID`,`b`.`Name` AS `Branch_Name` from ((`customer` `c` join `account` `a` on((`a`.`Customer_ID` = `c`.`Customer_ID`))) join `branch` `b` on((`a`.`Branch_ID` = `b`.`Branch_ID`))) */;

/*!50001 SET character_set_client = @saved_cs_client */;

/*!50001 SET character_set_results = @saved_cs_results */;

/*!50001 SET collation_connection = @saved_col_connection */;



--

-- Final view structure for view `fetchcustomersfiltered`

--



/*!50001 DROP VIEW IF EXISTS `fetchcustomersfiltered`*/;

/*!50001 SET @saved_cs_client = @@character_set_client */;

/*!50001 SET @saved_cs_results = @@character_set_results */;

/*!50001 SET @saved_col_connection = @@collation_connection */;

/*!50001 SET character_set_client = utf8mb4 */;

/*!50001 SET character_set_results = utf8mb4 */;

/*!50001 SET collation_connection = utf8mb4_0900_ai_ci */;

/*!50001 CREATE ALGORITHM=UNDEFINED */

/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */

/*!50001 VIEW `fetchcustomersfiltered` AS select group_concat(`a`.`Account_ID` separator ',') AS `Account_IDs`,`c`.`Customer_ID` AS `Customer_ID`,`c`.`Name` AS `Name`,sum(`a`.`Balance`) AS `Total_Balance`,`c`.`Email` AS `Email`,`c`.`City` AS `City`,`c`.`Phone_Number` AS `Phone_Number` from (`account` `a` join `customer` `c` on((`a`.`Customer_ID` = `c`.`Customer_ID`))) group by `c`.`Customer_ID`,`c`.`Name`,`c`.`Email`,`c`.`City`,`c`.`Phone_Number` order by `c`.`Customer_ID` desc */;

/*!50001 SET character_set_client = @saved_cs_client */;

/*!50001 SET character_set_results = @saved_cs_results */;

/*!50001 SET collation_connection = @saved_col_connection */;



--

-- Final view structure for view `fetchloansview`

--



/*!50001 DROP VIEW IF EXISTS `fetchloansview`*/;

/*!50001 SET @saved_cs_client = @@character_set_client */;

/*!50001 SET @saved_cs_results = @@character_set_results */;

/*!50001 SET @saved_col_connection = @@collation_connection */;

/*!50001 SET character_set_client = utf8mb4 */;

/*!50001 SET character_set_results = utf8mb4 */;

/*!50001 SET collation_connection = utf8mb4_0900_ai_ci */;

/*!50001 CREATE ALGORITHM=UNDEFINED */

/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */

/*!50001 VIEW `fetchloansview` AS select `loan`.`Loan_ID` AS `Loan_ID`,`loan`.`Amount` AS `Amount`,`loan`.`Interest_Rate` AS `Interest_Rate`,`loan`.`Issued_Date` AS `Issued_Date`,`loan`.`Duration_in_Months` AS `Duration_in_Months`,`loan`.`Account_ID` AS `Account_ID`,`online_loan`.`Fixed_Deposit_ID` AS `Fixed_Deposit_ID` from ((`loan` left join `account` on((`loan`.`Account_ID` = `account`.`Account_ID`))) left join `online_loan` on((`loan`.`Loan_ID` = `online_loan`.`Loan_ID`))) */;

/*!50001 SET character_set_client = @saved_cs_client */;

/*!50001 SET character_set_results = @saved_cs_results */;

/*!50001 SET collation_connection = @saved_col_connection */;



--

-- Final view structure for view `fetchtransactionsbybranchview`

--



/*!50001 DROP VIEW IF EXISTS `fetchtransactionsbybranchview`*/;

/*!50001 SET @saved_cs_client = @@character_set_client */;

/*!50001 SET @saved_cs_results = @@character_set_results */;

/*!50001 SET @saved_col_connection = @@collation_connection */;

/*!50001 SET character_set_client = utf8mb4 */;

/*!50001 SET character_set_results = utf8mb4 */;

/*!50001 SET collation_connection = utf8mb4_0900_ai_ci */;

/*!50001 CREATE ALGORITHM=UNDEFINED */

/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */

/*!50001 VIEW `fetchtransactionsbybranchview` AS select `t`.`Transaction_ID` AS `Transaction_ID`,`t`.`Source_Account_ID` AS `Source_Account_ID`,`t`.`Destination_Account_ID` AS `Destination_Account_ID`,`t`.`Date_and_Time` AS `Date_and_Time`,`t`.`Amount` AS `Amount`,`t`.`Type` AS `Type`,`t`.`Branch_ID` AS `Transaction_Branch_ID`,`sa`.`Branch_ID` AS `Source_Branch_ID`,`da`.`Branch_ID` AS `Destination_Branch_ID` from ((`transaction` `t` join `account` `sa` on((`t`.`Source_Account_ID` = `sa`.`Account_ID`))) join `account` `da` on((`t`.`Destination_Account_ID` = `da`.`Account_ID`))) */;

/*!50001 SET character_set_client = @saved_cs_client */;

/*!50001 SET character_set_results = @saved_cs_results */;

/*!50001 SET collation_connection = @saved_col_connection */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;



-- Dump completed on 2024-10-30 22:45:13

```
