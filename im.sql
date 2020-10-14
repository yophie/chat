-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: im
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cashout`
--

DROP TABLE IF EXISTS `cashout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cashout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `state` int DEFAULT NULL,
  `amount` decimal(20,2) DEFAULT NULL,
  `applyTime` bigint DEFAULT NULL,
  `approvalTime` bigint DEFAULT NULL,
  `fee` decimal(20,4) DEFAULT NULL,
  `approvalAmount` decimal(20,2) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `oppsite` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `f_userId` (`userId`),
  CONSTRAINT `cashout_check` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cashout`
--

LOCK TABLES `cashout` WRITE;
/*!40000 ALTER TABLE `cashout` DISABLE KEYS */;
INSERT INTO `cashout` VALUES (1,27,1,20.00,1601394892391,NULL,NULL,NULL,1,22),(2,27,1,20.00,1601394907044,NULL,NULL,NULL,1,22),(3,25,1,20.00,1601395222951,NULL,NULL,NULL,1,22),(4,25,1,20.00,1601395222959,NULL,NULL,NULL,1,22),(5,25,1,20.00,1601395222959,1601395222959,0.0200,19.60,1,22),(6,25,1,-20.00,1601433929700,1601436000647,0.0200,NULL,3,NULL),(7,25,1,-20.00,1601433999880,1601436350365,0.0200,NULL,3,NULL),(8,25,1,20.00,1601395222959,1601395222959,0.0200,19.60,1,22),(10,18,0,-30.00,1601436493655,NULL,0.0200,-29.40,3,NULL),(11,22,0,-20.00,1601525693063,NULL,0.0200,-19.60,3,NULL),(12,22,0,-20.00,1601526825809,NULL,0.0200,-19.60,3,NULL),(13,22,0,-20.00,1601526938852,NULL,0.0200,-19.60,3,NULL),(14,22,0,-20.00,1601526958840,NULL,0.0200,-19.60,3,NULL);
/*!40000 ALTER TABLE `cashout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatGroup`
--

DROP TABLE IF EXISTS `chatGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatGroup` (
  `groupId` int NOT NULL,
  `groupName` varchar(50) DEFAULT NULL,
  `avatar` varchar(50) DEFAULT NULL,
  `owner` int NOT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`groupId`),
  KEY `owner_check` (`owner`),
  CONSTRAINT `group_id_check` FOREIGN KEY (`groupId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `owner_check` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatGroup`
--

LOCK TABLES `chatGroup` WRITE;
/*!40000 ALTER TABLE `chatGroup` DISABLE KEYS */;
INSERT INTO `chatGroup` VALUES (33,'我的新群聊',NULL,27,0),(34,'我的新群聊',NULL,27,0);
/*!40000 ALTER TABLE `chatGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatWindow`
--

DROP TABLE IF EXISTS `chatWindow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatWindow` (
  `chatId` int NOT NULL AUTO_INCREMENT,
  `windowName` varchar(50) DEFAULT NULL,
  `owner` int NOT NULL,
  `userGroupId` int NOT NULL,
  `lastMessage` varchar(50) DEFAULT NULL,
  `lastTime` bigint DEFAULT NULL,
  `chatType` int NOT NULL,
  `unReadNum` int NOT NULL,
  `lastUserId` int DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `lastAvatar` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`chatId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatWindow`
--

LOCK TABLES `chatWindow` WRITE;
/*!40000 ALTER TABLE `chatWindow` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatWindow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `myId` int NOT NULL,
  `friendId` int NOT NULL,
  `friendNick` varchar(50) DEFAULT NULL,
  `state` int NOT NULL,
  `applyTime` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `f_myId` (`myId`),
  KEY `f_friendId` (`friendId`),
  CONSTRAINT `friend_id_check` FOREIGN KEY (`friendId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_id_check` FOREIGN KEY (`myId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (20,16,17,'test',1,1111),(21,16,18,'test',1,1112),(22,25,27,'test',2,1601394035360),(23,22,23,'test',1,1111),(24,22,24,'test',1,1111),(25,22,25,'test',1,1111),(26,22,26,'test',1,1111),(27,22,27,'test',1,1111),(28,23,27,'test',1,1111),(29,23,26,'test',1,1111),(30,23,25,'test',1,1111),(31,23,24,'test',1,1111),(33,23,22,'test',1,1111),(40,27,33,'test',0,1601394638439),(41,22,33,'test',0,1601394638439),(42,23,33,'test',0,1601394638439),(43,24,33,'test',0,1601394638439),(44,25,33,'test',0,1601394638439),(45,26,33,'test',0,1601394638439),(46,27,34,'test',0,1601394641112),(47,22,34,'test',0,1601394641112),(48,23,34,'test',0,1601394641112),(49,24,34,'test',0,1601394641112),(50,25,34,'test',0,1601394641112),(51,26,34,'test',0,1601394641112),(52,22,18,'newUser',1,1601455032329),(53,18,22,'newUser',1,1601455032329),(54,22,31,'newUser',3,1601525253047);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendSociety`
--

DROP TABLE IF EXISTS `friendSociety`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendSociety` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `time` bigint DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `f_userId` (`userId`),
  CONSTRAINT `society_check` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendSociety`
--

LOCK TABLES `friendSociety` WRITE;
/*!40000 ALTER TABLE `friendSociety` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendSociety` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packet`
--

DROP TABLE IF EXISTS `packet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packet` (
  `id` varchar(50) NOT NULL,
  `type` int DEFAULT NULL,
  `amount` decimal(20,2) DEFAULT NULL,
  `userGroupId` int DEFAULT NULL,
  `lastMessage` varchar(50) DEFAULT NULL,
  `num` int DEFAULT NULL,
  `time` bigint DEFAULT NULL,
  `state` int DEFAULT NULL,
  `returnAmount` int DEFAULT NULL,
  `returnTime` varchar(50) DEFAULT NULL,
  `sender` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packet`
--

LOCK TABLES `packet` WRITE;
/*!40000 ALTER TABLE `packet` DISABLE KEYS */;
INSERT INTO `packet` VALUES ('1d41d293f03b40bba4f330b7bcfdde30',0,100.00,32,NULL,5,11111,1,NULL,NULL,22),('1d41d293f03b40bba4f330b7bcfdde31',0,100.00,32,NULL,5,11111,1,NULL,NULL,22),('1d41d293f03b40bba4f330b7bcfdee25',NULL,88.88,NULL,NULL,4,1601302703638,1,NULL,NULL,18),('1d41d293f03b40bba4f330b7bcfdee30',0,100.00,32,NULL,5,11111,1,NULL,NULL,22);
/*!40000 ALTER TABLE `packet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packetState`
--

DROP TABLE IF EXISTS `packetState`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packetState` (
  `id` int NOT NULL AUTO_INCREMENT,
  `packetId` varchar(50) NOT NULL,
  `reciever` int DEFAULT NULL,
  `amount` decimal(20,2) DEFAULT NULL,
  `time` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `packet_check` (`packetId`),
  CONSTRAINT `packet_check` FOREIGN KEY (`packetId`) REFERENCES `packet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packetState`
--

LOCK TABLES `packetState` WRITE;
/*!40000 ALTER TABLE `packetState` DISABLE KEYS */;
INSERT INTO `packetState` VALUES (4,'1d41d293f03b40bba4f330b7bcfdee25',16,22.22,1601303316078),(5,'1d41d293f03b40bba4f330b7bcfdee30',27,20.00,1601394892391),(6,'1d41d293f03b40bba4f330b7bcfdee30',22,20.00,1601394907044),(7,'1d41d293f03b40bba4f330b7bcfdee30',25,20.00,1601395222951);
/*!40000 ALTER TABLE `packetState` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `lowest` decimal(20,2) DEFAULT NULL,
  `fee` decimal(20,4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (0.00,0.0200);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `superuser`
--

DROP TABLE IF EXISTS `superuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `superuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `avatar` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superuser`
--

LOCK TABLES `superuser` WRITE;
/*!40000 ALTER TABLE `superuser` DISABLE KEYS */;
INSERT INTO `superuser` VALUES (1,'admin','admin','admin','88888888888','1313886e2dc7bd73249ce844c3cc2231');
/*!40000 ALTER TABLE `superuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(50) DEFAULT NULL,
  `openId` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `money` decimal(20,2) DEFAULT NULL,
  `bankAccount` varchar(20) DEFAULT NULL,
  `realName` varchar(50) DEFAULT NULL,
  `bankName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'fad9e518796c4de88b1dc2daf688f4d3','test1','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(17,'8733e16cbdd84d62839f38064ce349de','test2','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(18,'b86bc76b89d44429bc6ec72e36de391a','test3','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',70.00),(19,'d24715bae7df4fefb733d7c8bb9d4105','16','我的群聊','test avatar','88888','group',90.00),(20,'cb755beb8e234b2f9df35747d902d51c','1601368182332','newUser','test avatar','88888','9ece6f28502a3380969791b557ac5634',100.00),(21,'c21909bfc1784f279a713859ef379533','曹鹏','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(22,'ca4bc00affee4ed7a9c92ee07c03e602','曹鹏1','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',20.00),(23,'110355d8589d49d3a994853e4d5054e5','曹鹏2','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(24,'bdb0b34f992a4299936ac268a007806b','曹鹏3','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(25,'933bd4aa337645b0a871b13037ec3b03','曹鹏4','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',40.00),(26,'6b57ab78e06f4b0fbb1efd2dfccbfcbd','曹鹏5','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(27,'32fa022c519546368f0d8a778e2baa0f','曹鹏6','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',140.00),(28,'f2b2809d23a14126ba81d1aa0d14e802','曹鹏7','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(29,'d75534cbd4194f3d922523397c76b842','曹鹏8','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(30,'38d6d36005fd4dffa623de54f0383581','曹鹏9','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(31,'0d9003eafd1d4bc8bdf47c4386690633','曹鹏10','newUser','test avatar','88888','64ae708c1fb209f0eb9b1436bd381343',100.00),(33,'d22cc31d8a65479fb69f2b0ce8284c2f','27','我的新群聊','test avatar','88888','group',NULL),(34,'36dd8d5bb398404c930aa36df1f894a7','27','我的新群聊','test avatar','88888','group',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-04 16:23:15
