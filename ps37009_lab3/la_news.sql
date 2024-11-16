-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: la_news
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `loaitin`
--

DROP TABLE IF EXISTS `loaitin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaitin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaitin`
--

LOCK TABLES `loaitin` WRITE;
/*!40000 ALTER TABLE `loaitin` DISABLE KEYS */;
INSERT INTO `loaitin` VALUES (1,'Tin mới'),(2,'tin thế giới'),(3,'Tin trong nước');
/*!40000 ALTER TABLE `loaitin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tin`
--

DROP TABLE IF EXISTS `tin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tieude` varchar(255) DEFAULT NULL,
  `tomtat` text,
  `noidung` text,
  `xem` int DEFAULT NULL,
  `noibat` tinyint DEFAULT NULL,
  `ngaydang` date DEFAULT NULL,
  `idlt` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tin_loaitin` (`idlt`),
  CONSTRAINT `tin_loaitin` FOREIGN KEY (`idlt`) REFERENCES `loaitin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tin`
--

LOCK TABLES `tin` WRITE;
/*!40000 ALTER TABLE `tin` DISABLE KEYS */;
INSERT INTO `tin` VALUES (1,'Tin tức 1','Tóm tắt tin tức 1','Nội dung chi tiết của tin tức 1',120,1,'2024-10-01',1),(2,'Tin tức 2','Tóm tắt tin tức 2','Nội dung chi tiết của tin tức 2',98,0,'2024-10-02',2),(3,'Tin tức 3','Tóm tắt tin tức 3','Nội dung chi tiết của tin tức 3',45,1,'2024-10-03',3),(4,'Tin tức 4','Tóm tắt tin tức 4','Nội dung chi tiết của tin tức 4',160,0,'2024-10-04',1),(5,'Tin tức 5','Tóm tắt tin tức 5','Nội dung chi tiết của tin tức 5',75,1,'2024-10-05',2),(6,'Tin tức 6','Tóm tắt tin tức 6','Nội dung chi tiết của tin tức 6',30,0,'2024-10-06',3),(7,'Tin tức 7','Tóm tắt tin tức 7','Nội dung chi tiết của tin tức 7',200,1,'2024-10-07',1),(8,'Tin tức 8','Tóm tắt tin tức 8','Nội dung chi tiết của tin tức 8',120,0,'2024-10-08',2),(9,'Tin tức 9','Tóm tắt tin tức 9','Nội dung chi tiết của tin tức 9',85,1,'2024-10-09',3),(10,'Tin tức 10','Tóm tắt tin tức 10','Nội dung chi tiết của tin tức 10',50,0,'2024-10-10',1);
/*!40000 ALTER TABLE `tin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-16  8:52:49
