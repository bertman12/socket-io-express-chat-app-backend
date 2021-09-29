CREATE TABLE `messages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `serverId` int unsigned NOT NULL,
  `roomId` int unsigned NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `time` varchar(100) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci