use bookmarks;

CREATE TABLE `urls` (
 `url_id` int(11) NOT NULL AUTO_INCREMENT,
 `url` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `description` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `category` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `tags` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `id` int(11), 
 PRIMARY KEY (`url_id`), 
 FOREIGN KEY (`id`) REFERENCES users(id)
); 