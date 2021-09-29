CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT 'no name',
  `email` varchar(50) NOT NULL DEFAULT 'no name',
  `bio` varchar(250) NOT NULL DEFAULT 'no name',
  `avatar_image` varchar(500) NOT NULL DEFAULT 'no name',
  `role` int unsigned NOT NULL,
  `current_room` int unsigned NOT NULL,
  `current_server` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci