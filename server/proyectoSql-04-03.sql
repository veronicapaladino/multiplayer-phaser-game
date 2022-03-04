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
  PRIMARY KEY (`Id_Barco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barco`
--

LOCK TABLES `barco` WRITE;
/*!40000 ALTER TABLE `barco` DISABLE KEYS */;
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
  `coordenadaX` float DEFAULT NULL,
  `coordenadaY` float DEFAULT NULL,
  `Id_Jugador` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Id_Destructor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destructor`
--

LOCK TABLES `destructor` WRITE;
/*!40000 ALTER TABLE `destructor` DISABLE KEYS */;
INSERT INTO `destructor` VALUES (1,3,0,0,'cz0TyA2a6PT_h6C_AAAD'),(2,3,0,0,'axIEHEKfAgd0Q4o0AAAB');
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
  `Id_Jugador` varchar(20) NOT NULL,
  `Bando` varchar(10) DEFAULT NULL,
  `Id_Usuario` int DEFAULT NULL,
  PRIMARY KEY (`Id_Jugador`),
  KEY `paritdafk_idx` (`Id_Partida`),
  CONSTRAINT `paritdafk` FOREIGN KEY (`Id_Partida`) REFERENCES `partida` (`Id_Partida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugador`
--

LOCK TABLES `jugador` WRITE;
/*!40000 ALTER TABLE `jugador` DISABLE KEYS */;
INSERT INTO `jugador` VALUES (8993,'_ykJ9LGchvT8VpbXAAAC','barco',NULL),(9028,'-I1iCtX6I7Rkr_TOAAAF','submarino',NULL),(8965,'-sISdxS4jl1D5clHAAAD',NULL,NULL),(9056,'0l591goupEIAddxxAAAH','submarino',NULL),(5237,'10','1',3),(5237,'11','2',2),(5670,'12','1',4),(5670,'13','2',3),(8907,'14','2',3),(8907,'15','1',4),(5000,'16','1',4),(1000,'2','1',1),(1000,'3','2',2),(2087,'5','1',3),(9012,'5wen_IMZCYeWFi3WAAAB','barco',NULL),(2087,'6','2',5),(8998,'62PPz6uXKsCZwuVxAAAF','submarino',NULL),(9010,'7h6fLhCisXEs2PFYAAAB','barco',NULL),(9056,'7J0RII86LECHrv11AAAF','barco',NULL),(2552,'8','2',1),(9054,'88ZoscXTXXb1kJ5SAAAD','submarino',NULL),(8983,'893mL8LtCRUiXn3PAAAB','barco',NULL),(8985,'8GQfH8f74TzMRcZHAAAB','submarino',NULL),(8957,'8hSQoyeBKEmRpB_nAAAD','barco',NULL),(9020,'8yITYNJWCXkQeM3iAAAB','barco',NULL),(2552,'9','1',1),(8991,'9bwrOhq9tCSoRJNsAAAF','barco',NULL),(9050,'9za6XFjpze0WuhjDAAAD','submarino',NULL),(9014,'A5aaQi41fYondkrmAAAB','barco',NULL),(8987,'AGXmJVqmFAiEWXn_AAAJ','submarino',NULL),(9061,'aH5LLW4JXDzR2_ZeAAAD','submarino',NULL),(9013,'amEY1abGVu4PJ5uGAAAD','submarino',NULL),(9061,'axIEHEKfAgd0Q4o0AAAB','barco',NULL),(9007,'beKT5PxZO8ob_Wb_AAAD','submarino',NULL),(9015,'bgflyTYYW_pbKGVuAAAD','submarino',NULL),(8989,'BvvR1dg3vakl_MTqAAAB','barco',NULL),(9059,'CeQG2_yAgg1EyAyWAAAB','barco',NULL),(9054,'CeygziTJTmsCtQWyAAAB','barco',NULL),(8988,'CmgaLzFf-cNk9eX6AAAL','submarino',NULL),(8997,'CNAfVpBOUXsHfzkQAAAD','barco',NULL),(8962,'CSTRy7-peb5qyPZnAAAB','barco',NULL),(9009,'cU9KB4oTZ_GQH1KGAAAD','submarino',NULL),(9060,'cz0TyA2a6PT_h6C_AAAD','barco',NULL),(9059,'D2L68zrA0ty5rCbsAAAD','submarino',NULL),(9017,'DSJCt0FndpLYvdjCAAAD','submarino',NULL),(9025,'efdlWEHLMR3dSdF8AAAB','barco',NULL),(8977,'EfJosbZjKpF-kQKPAAAB','barco',NULL),(8955,'EGV8qCLVEAWi6SXrAAAB','barco',NULL),(9055,'ElaqQ7ObNn-Bvw8RAAAB','barco',NULL),(9004,'emlMAJ0TIKOmO3GeAAAB','barco',NULL),(8961,'FNFLOfXgS3767JI1AAAD','barco',NULL),(9011,'fTphEscSXCBdwmucAAAB','barco',NULL),(9021,'GoMPJUghME5loy9-AAAD','barco',NULL),(8995,'H6o2zOmkbgrjHbtEAAAB','barco',NULL),(9024,'HDgip2qfL5hT03vYAAAD','submarino',NULL),(9045,'HOwu6c9WZk1HDtK0AAAD','submarino',NULL),(8999,'iBScJV2aJmbeO64jAAAB','barco',NULL),(9016,'IC9heB7hpet-sDIJAAAB','barco',NULL),(8955,'ifhHg2uzvCL3Qyr3AAAB','barco',NULL),(9027,'iOqkdt5kpWvjCwAXAAAD','barco',NULL),(8982,'IqK_pHXEXHEbmY3nAAAB','barco',NULL),(8966,'iQUiywA86AQPbFmyAAAF',NULL,NULL),(9058,'itrRAZkgLYacv8L4AAAD','submarino',NULL),(9044,'Ix-I7zSsMCX7kuvHAAAF','barco',NULL),(9049,'jEe1ivIoQFii5aeSAAAD','submarino',NULL),(9002,'jiArZyVO8DYnQEUUAAAB','barco',NULL),(8992,'k1Prcn6YiplVqV99AAAH','submarino',NULL),(8959,'KQ8ii_xJtCfwhJjCAAAB','barco',NULL),(8971,'M8I9z8Nx0Dus-k9_AAAB','barco',NULL),(9052,'Mgc3JQj-xBCdrnsKAAAD','submarino',NULL),(8996,'MKXj96h5nY3271sEAAAD','submarino',NULL),(8964,'ms7v49DLWDdSP80XAAAB','barco',NULL),(9057,'n7XsHR4Z3URLhse7AAAH','submarino',NULL),(9051,'Nd0jHdE2fWtdvOe9AAAB','barco',NULL),(8970,'Nl1knJKsGBTrCzhrAAAD',NULL,NULL),(8967,'oAdkKHbuxDL4ZC0NAAAB','submarino',NULL),(8960,'Ob5RIWY6F9agx0u6AAAB','barco',NULL),(8976,'oDQ_CActDuxQriHXAAAB','barco',NULL),(9055,'OHsYH5WzfwnHxH5NAAAD','submarino',NULL),(9048,'P5UopjwxKYEPvJI5AAAF','submarino',NULL),(8973,'p9l7t9c6PQ90d2ppAAAB','barco',NULL),(9053,'pz6g7Jwl9MrOMSLXAAAD','submarino',NULL),(8990,'Qya4Nop3l623UZ3rAAAD','submarino',NULL),(9000,'rAl-VqbrWoK-MtVXAAAD','submarino',NULL),(8978,'rST_m1YMQ1yHesbUAAAB','barco',NULL),(8969,'RSuVTOTk3jyQfXsqAAAB','submarino',NULL),(9023,'s6ZvAH7hxq5jhFBLAAAB','barco',NULL),(9026,'sQam5T23huQgWyigAAAD','submarino',NULL),(8955,'TIpQm5Ft_ki5wZQLAAAB','barco',NULL),(9008,'TQ-rsxRL2Nncelc0AAAB','barco',NULL),(9005,'TScOK7p730Ip2DSHAAAB','barco',NULL),(8955,'tSkeY_JRYsZJoWFiAAAB','barco',NULL),(8974,'U_yCe4Ud7mz4_jLYAAAB','barco',NULL),(8958,'uhG0OTwYvUNe7-WgAAAB','barco',NULL),(9018,'UwhkhZvUjAg2Gr4kAAAC','submarino',NULL),(8986,'VuqRGQXITPUeqRvmAAAD','barco',NULL),(9047,'WD1DbQz7DJqPF_N_AAAB','barco',NULL),(8979,'xmWd7E8eJSETaiK2AAAH','barco',NULL),(8968,'YemETkDTdPGlamLyAAAD',NULL,NULL),(9060,'yGpiKNqw_kRKIh_pAAAB','submarino',NULL),(9003,'yQVhuVG0LpTVlpOcAAAH','barco',NULL),(8980,'YxM2flfO6LoU-WhqAAAB','barco',NULL),(9006,'z6peGrcu0E7RW7hfAAAB','barco',NULL);
/*!40000 ALTER TABLE `jugador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida`
--

DROP TABLE IF EXISTS `partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida` (
  `Id_Partida` int NOT NULL AUTO_INCREMENT,
  `Estado` varchar(45) DEFAULT NULL,
  `Guardada` tinyint(1) DEFAULT NULL,
  `Terminada` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id_Partida`)
) ENGINE=InnoDB AUTO_INCREMENT=9062 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida`
--

LOCK TABLES `partida` WRITE;
/*!40000 ALTER TABLE `partida` DISABLE KEYS */;
INSERT INTO `partida` VALUES (1000,'creada',0,0),(2087,'creada',1,0),(2552,'En curso',0,0),(5000,'Creada',0,0),(5237,'creada',0,0),(5670,'creada',0,0),(8907,'creada',1,1),(8908,'Creada',0,0),(8909,'Creada',0,0),(8910,'Creada',0,0),(8911,'Creada',0,0),(8912,'Creada',0,0),(8913,'Creada',0,0),(8914,'Creada',0,0),(8915,'Creada',0,0),(8916,'Creada',0,0),(8917,'Creada',0,0),(8918,'Creada',0,0),(8919,'Creada',0,0),(8920,'Creada',0,0),(8921,'Creada',0,0),(8922,'Creada',0,0),(8923,'Creada',0,0),(8924,'Creada',0,0),(8925,'Creada',0,0),(8926,'Creada',0,0),(8927,'Creada',0,0),(8928,'Creada',0,0),(8929,'Creada',0,0),(8930,'Creada',0,0),(8931,'Creada',0,0),(8932,'Creada',0,0),(8933,'Creada',0,0),(8934,'Creada',0,0),(8935,'Creada',0,0),(8936,'Creada',0,0),(8937,'Creada',0,0),(8938,'Creada',0,0),(8939,'Creada',0,0),(8940,'Creada',0,0),(8941,'Creada',0,0),(8942,'Creada',0,0),(8943,'Creada',0,0),(8944,'Creada',0,0),(8945,'Creada',0,0),(8946,'Creada',0,0),(8947,'Creada',0,0),(8948,'Creada',0,0),(8949,'Creada',0,0),(8950,'Creada',0,0),(8951,'Creada',0,0),(8952,'Creada',0,0),(8953,'Creada',0,0),(8954,'Creada',0,0),(8955,'Creada',0,0),(8956,'Creada',0,0),(8957,'Creada',0,0),(8958,'Creada',0,0),(8959,'Creada',0,0),(8960,'Creada',0,0),(8961,'Creada',0,0),(8962,'Creada',0,0),(8963,'Creada',0,0),(8964,'Creada',0,0),(8965,'Creada',0,0),(8966,'Creada',0,0),(8967,'Creada',0,0),(8968,'Creada',0,0),(8969,'Creada',0,0),(8970,'Creada',0,0),(8971,'Creada',0,0),(8972,'Creada',0,0),(8973,'Creada',0,0),(8974,'Creada',0,0),(8975,'Creada',0,0),(8976,'Creada',0,0),(8977,'Creada',0,0),(8978,'Creada',0,0),(8979,'Creada',0,0),(8980,'Creada',0,0),(8981,'Creada',0,0),(8982,'Creada',0,0),(8983,'Creada',0,0),(8984,'Creada',0,0),(8985,'Creada',0,0),(8986,'Creada',0,0),(8987,'Creada',0,0),(8988,'Creada',0,0),(8989,'Creada',0,0),(8990,'Creada',0,0),(8991,'Creada',0,0),(8992,'Creada',0,0),(8993,'Creada',0,0),(8994,'Creada',0,0),(8995,'Creada',0,0),(8996,'Creada',0,0),(8997,'Creada',0,0),(8998,'Creada',0,0),(8999,'Creada',0,0),(9000,'Creada',0,0),(9001,'Creada',0,0),(9002,'Creada',0,0),(9003,'Creada',0,0),(9004,'Creada',0,0),(9005,'Creada',0,0),(9006,'Creada',0,0),(9007,'Creada',0,0),(9008,'Creada',0,0),(9009,'Creada',0,0),(9010,'Creada',0,0),(9011,'Creada',0,0),(9012,'Creada',0,0),(9013,'Creada',0,0),(9014,'Creada',0,0),(9015,'Creada',0,0),(9016,'Creada',0,0),(9017,'Creada',0,0),(9018,'Creada',0,0),(9019,'Creada',0,0),(9020,'Creada',0,0),(9021,'Creada',0,0),(9022,'Creada',0,0),(9023,'Creada',0,0),(9024,'Creada',0,0),(9025,'Creada',0,0),(9026,'Creada',0,0),(9027,'Creada',0,0),(9028,'Creada',0,0),(9029,'Creada',0,0),(9030,'Creada',0,0),(9031,'Creada',0,0),(9032,'Creada',0,0),(9033,'Creada',0,0),(9034,'Creada',0,0),(9035,'Creada',0,0),(9036,'Creada',0,0),(9037,'Creada',0,0),(9038,'Creada',0,0),(9039,'Creada',0,0),(9040,'Creada',0,0),(9041,'Creada',0,0),(9042,'Creada',0,0),(9043,'Creada',0,0),(9044,'Creada',0,0),(9045,'Creada',0,0),(9046,'Creada',0,0),(9047,'Creada',0,0),(9048,'Creada',0,0),(9049,'Creada',0,0),(9050,'Creada',0,0),(9051,'Creada',0,0),(9052,'Creada',0,0),(9053,'Creada',0,0),(9054,'Creada',0,0),(9055,'Creada',0,0),(9056,'Creada',0,0),(9057,'Creada',0,0),(9058,'Creada',0,0),(9059,'Creada',0,0),(9060,'Creada',0,0),(9061,'Creada',0,0);
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
  `coordenadaX` float DEFAULT NULL,
  `coordenadaY` float DEFAULT NULL,
  `id_jugador` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Id_sub`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submarino`
--

LOCK TABLES `submarino` WRITE;
/*!40000 ALTER TABLE `submarino` DISABLE KEYS */;
INSERT INTO `submarino` VALUES (1,3,1,0,0,'D2L68zrA0ty5rCbsAAAD'),(2,3,1,0,0,'aH5LLW4JXDzR2_ZeAAAD');
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
  PRIMARY KEY (`id_usuario`,`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Joaquin','joaquin',_binary '\0',2),(2,'veronia','veronica',_binary '\0',3),(3,'alejandro','alejandro',_binary '\0',7),(4,'fernando','fernando',_binary '',1),(5,'diego','diego',_binary '\0',4),(107,'joaquin','1234',_binary '',0),(108,'alejandro','1234',_binary '',0),(109,'lucia','1234',_binary '',0),(110,'','1234',_binary '',0);
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

-- Dump completed on 2022-03-04  8:26:10
