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
  KEY `cashout_check` (`userId`),
  CONSTRAINT `cashout_check` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cashout`
--

LOCK TABLES `cashout` WRITE;
/*!40000 ALTER TABLE `cashout` DISABLE KEYS */;
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
INSERT INTO `chatGroup` VALUES (19,'我的群聊','test avatar',16);
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
  KEY `my_id_check` (`myId`),
  KEY `friend_id_check` (`friendId`),
  CONSTRAINT `friend_id_check` FOREIGN KEY (`friendId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_id_check` FOREIGN KEY (`myId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (16,16,19,'我的群聊',0,1601302563581),(17,16,19,'我的群聊',0,1601302563581),(18,17,19,'我的群聊',0,1601302563581),(19,18,19,'我的群聊',0,1601302563581);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FriendSociety`
--

DROP TABLE IF EXISTS `FriendSociety`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FriendSociety` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `time` bigint DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `society_check` (`userId`),
  CONSTRAINT `society_check` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FriendSociety`
--

LOCK TABLES `FriendSociety` WRITE;
/*!40000 ALTER TABLE `FriendSociety` DISABLE KEYS */;
/*!40000 ALTER TABLE `FriendSociety` ENABLE KEYS */;
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
INSERT INTO `packet` VALUES ('1d41d293f03b40bba4f330b7bcfdee25',NULL,88.88,NULL,NULL,4,1601302703638,1,NULL,NULL,18);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packetState`
--

LOCK TABLES `packetState` WRITE;
/*!40000 ALTER TABLE `packetState` DISABLE KEYS */;
INSERT INTO `packetState` VALUES (4,'1d41d293f03b40bba4f330b7bcfdee25',16,22.22,1601303316078);
/*!40000 ALTER TABLE `packetState` ENABLE KEYS */;
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
  `avatar` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `money` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'fad9e518796c4de88b1dc2daf688f4d3','test1','newUser',NULL,NULL,'64ae708c1fb209f0eb9b1436bd381343',NULL),(17,'8733e16cbdd84d62839f38064ce349de','test2','newUser',NULL,NULL,'64ae708c1fb209f0eb9b1436bd381343',NULL),(18,'b86bc76b89d44429bc6ec72e36de391a','test3','newUser',NULL,NULL,'64ae708c1fb209f0eb9b1436bd381343',NULL),(19,'d24715bae7df4fefb733d7c8bb9d4105','16','我的群聊','test avatar',NULL,'group',NULL);
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

-- Dump completed on 2020-09-28 22:42:23
