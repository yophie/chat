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
  `userId` varchar(50) NOT NULL,
  `state` int DEFAULT NULL,
  `amount` decimal(20,2) DEFAULT NULL,
  `applyTime` bigint DEFAULT NULL,
  `approvalTime` bigint DEFAULT NULL,
  `fee` decimal(20,4) DEFAULT NULL,
  `approvalAmount` decimal(20,2) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `oppsite` int DEFAULT NULL,
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatGroup`
--

LOCK TABLES `chatGroup` WRITE;
/*!40000 ALTER TABLE `chatGroup` DISABLE KEYS */;
INSERT INTO `chatGroup` VALUES (13,'我的群聊','test avatar',8),(14,'我的群聊','test avatar',8);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (7,8,9,NULL,1,1601097444126),(8,9,8,NULL,1,1601097444126),(10,9,13,'我的群聊',0,1601105897205),(11,8,14,'我的群聊',0,1601107650404),(12,9,14,'我的群聊',0,1601107650404);
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
  PRIMARY KEY (`id`)
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
INSERT INTO `packet` VALUES ('0832e497adf740b1b4a5ae4f035b7eac',0,88.88,NULL,NULL,1,1601119809019,0,NULL,NULL,8),('08fcb60fa8c34f5093238530e8365f83',0,88.88,NULL,NULL,1,1601119802840,0,NULL,NULL,9),('26137e2013474fc691460fe88013980f',0,88.88,NULL,NULL,1,1601119466607,0,NULL,NULL,8),('2aa080bd0f4e4fc8a1197f17f40db46d',0,88.88,NULL,NULL,1,1601120219808,0,NULL,NULL,8),('330ad158de0244ec99becba9fcf3fea7',NULL,88.88,NULL,NULL,4,1601136765485,0,NULL,NULL,8),('388a15bbd011415986f86f276597bda7',0,88.88,NULL,NULL,1,1601119536130,0,NULL,NULL,8),('8:9:1601119188082',0,88.88,NULL,NULL,1,1601119188082,NULL,NULL,NULL,8),('8:9:1601119215901',0,88.88,NULL,NULL,1,1601119215901,NULL,NULL,NULL,8),('b81e4b17a9bd4a5eb096e8c0048d4dd2',1,88.88,NULL,NULL,4,1601136896021,1,NULL,NULL,8),('c331232de9114439860b89e1dc839cd0',0,88.88,NULL,NULL,1,1601120819316,0,NULL,NULL,8);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packetState`
--

LOCK TABLES `packetState` WRITE;
/*!40000 ALTER TABLE `packetState` DISABLE KEYS */;
INSERT INTO `packetState` VALUES (2,'b81e4b17a9bd4a5eb096e8c0048d4dd2',8,38.99,1601139040040),(3,'b81e4b17a9bd4a5eb096e8c0048d4dd2',9,21.06,1601139065560);
/*!40000 ALTER TABLE `packetState` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'testaccount','testopenid','testname','testavatar','13388888888','test',8888.88),(8,'66d4591207034c41bbe62cd3a056e3d1','test1','newUser',NULL,NULL,'test',NULL),(9,'e9c4231e74c246f9a06a7819a3aca303','test2','newUser',NULL,NULL,'test',NULL),(11,NULL,'9','我的群聊','test avatar',NULL,'group',NULL),(12,NULL,'9','我的群聊','test avatar',NULL,'group',NULL),(13,'e71c9fe908f74956818c3e22036164c3','8','我的群聊','test avatar',NULL,'group',NULL),(14,'b2c23300cdcb437da15cb5c1db43aaaa','8','我的群聊','test avatar',NULL,'group',NULL);
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

-- Dump completed on 2020-09-27  0:59:15
