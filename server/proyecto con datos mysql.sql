CREATE DATABASE  IF NOT EXISTS `proyecto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `barco`
--

DROP TABLE IF EXISTS `barco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barco` (
  `Id_Barco` int NOT NULL AUTO_INCREMENT,
  `vida` int DEFAULT NULL,
  `Hundido` tinyint(1) DEFAULT NULL,
  `coordenadaX` int DEFAULT NULL,
  `coordenadaY` int DEFAULT NULL,
  `id_jugador` int DEFAULT NULL,
  PRIMARY KEY (`Id_Barco`),
  KEY `id_jugador` (`id_jugador`),
  CONSTRAINT `barco_ibfk_1` FOREIGN KEY (`id_jugador`) REFERENCES `jugador` (`Id_Jugador`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barco`
--

LOCK TABLES `barco` WRITE;
/*!40000 ALTER TABLE `barco` DISABLE KEYS */;
INSERT INTO `barco` VALUES (1,3,0,20,31,2),(2,3,0,21,31,2),(3,3,0,22,31,2),(4,3,0,23,31,2),(5,3,0,24,31,2),(6,3,0,25,31,2),(7,3,0,20,31,5),(8,3,0,21,31,5),(9,3,0,22,31,5),(10,3,0,23,31,5),(11,3,0,24,31,5),(12,3,0,25,31,5),(13,3,0,20,31,9),(14,3,0,21,31,9),(15,3,0,22,31,9),(16,3,0,23,31,9),(17,3,0,24,31,9),(18,3,0,25,31,9),(19,3,0,20,31,10),(20,3,0,21,31,10),(21,3,0,22,31,10),(22,3,0,23,31,10),(23,3,0,24,31,10),(24,3,0,25,31,10),(25,3,0,20,31,15),(26,3,0,21,31,15),(27,3,0,22,31,15),(28,3,0,23,31,15),(29,3,0,24,31,15),(30,3,0,25,31,15),(31,3,0,20,31,12),(32,3,0,21,31,12),(33,3,0,22,31,12),(34,3,0,23,31,12),(35,3,0,24,31,12),(36,3,0,25,31,12);
/*!40000 ALTER TABLE `barco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destructor`
--

DROP TABLE IF EXISTS `destructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destructor` (
  `Id_Destructor` int NOT NULL AUTO_INCREMENT,
  `vida` int DEFAULT NULL,
  `coordenadaX` int DEFAULT NULL,
  `coordenadaY` int DEFAULT NULL,
  `Id_Jugador` int DEFAULT NULL,
  PRIMARY KEY (`Id_Destructor`),
  KEY `Id_Jugador` (`Id_Jugador`),
  CONSTRAINT `destructor_ibfk_1` FOREIGN KEY (`Id_Jugador`) REFERENCES `jugador` (`Id_Jugador`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destructor`
--

LOCK TABLES `destructor` WRITE;
/*!40000 ALTER TABLE `destructor` DISABLE KEYS */;
INSERT INTO `destructor` VALUES (1,3,23,12,2),(2,3,23,12,5),(3,3,23,12,9),(4,3,23,12,12),(5,3,23,12,15);
/*!40000 ALTER TABLE `destructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugador`
--

DROP TABLE IF EXISTS `jugador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jugador` (
  `Id_Partida` int DEFAULT NULL,
  `Id_Jugador` int NOT NULL AUTO_INCREMENT,
  `Bando` int DEFAULT NULL,
  `Id_Usuario` int DEFAULT NULL,
  PRIMARY KEY (`Id_Jugador`),
  KEY `Id_Partida` (`Id_Partida`),
  CONSTRAINT `jugador_ibfk_1` FOREIGN KEY (`Id_Partida`) REFERENCES `partida` (`Id_Partida`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugador`
--

LOCK TABLES `jugador` WRITE;
/*!40000 ALTER TABLE `jugador` DISABLE KEYS */;
INSERT INTO `jugador` VALUES (1000,2,1,1),(1000,3,2,2),(2087,5,1,3),(2087,6,2,5),(2552,8,2,1),(2552,9,1,1),(5237,10,1,3),(5237,11,2,2),(5670,12,1,4),(5670,13,2,3),(8907,14,2,3),(8907,15,1,4);
/*!40000 ALTER TABLE `jugador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida`
--

DROP TABLE IF EXISTS `partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida` (
  `Id_Partida` int NOT NULL,
  `Estado` varchar(45) DEFAULT NULL,
  `Guardada` tinyint(1) DEFAULT NULL,
  `Terminada` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id_Partida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida`
--

LOCK TABLES `partida` WRITE;
/*!40000 ALTER TABLE `partida` DISABLE KEYS */;
INSERT INTO `partida` VALUES (1000,'creada',0,0),(2087,'creada',1,0),(2552,'En curso',0,0),(5237,'creada',0,0),(5670,'creada',0,0),(8907,'creada',1,1);
/*!40000 ALTER TABLE `partida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submarino`
--

DROP TABLE IF EXISTS `submarino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submarino` (
  `Id_sub` int NOT NULL AUTO_INCREMENT,
  `vida` int DEFAULT NULL,
  `Profundidad` int DEFAULT NULL,
  `coordenadaX` int DEFAULT NULL,
  `coordenadaY` int DEFAULT NULL,
  `id_jugador` int DEFAULT NULL,
  PRIMARY KEY (`Id_sub`),
  KEY `id_jugador` (`id_jugador`),
  CONSTRAINT `submarino_ibfk_1` FOREIGN KEY (`id_jugador`) REFERENCES `jugador` (`Id_Jugador`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submarino`
--

LOCK TABLES `submarino` WRITE;
/*!40000 ALTER TABLE `submarino` DISABLE KEYS */;
INSERT INTO `submarino` VALUES (1,3,1,34,57,3),(2,3,2,34,57,6),(3,3,3,34,57,8),(4,3,1,34,57,11),(5,3,2,34,57,13),(6,3,3,34,57,14);
/*!40000 ALTER TABLE `submarino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(20) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `status_online` bit(1) NOT NULL,
  `partidas_ganadas` int DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Joaquin','joaquin',_binary '',2),(2,'veronia','veronica',_binary '',3),(3,'alejandro','alejandro',_binary '',7),(4,'fernando','fernando',_binary '',1),(5,'diego','diego',_binary '',4);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-13 16:36:21
