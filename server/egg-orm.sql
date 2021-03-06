/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : egg-orm

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 06/03/2021 16:27:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `browse` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `dictId` int(11) NOT NULL AUTO_INCREMENT,
  `dictName` varchar(255) NOT NULL,
  `dictCode` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`dictId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of dictionary
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for dictionaryItem
-- ----------------------------
DROP TABLE IF EXISTS `dictionaryItem`;
CREATE TABLE `dictionaryItem` (
  `dictItemId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `dictId` int(11) DEFAULT NULL,
  PRIMARY KEY (`dictItemId`),
  KEY `dictId` (`dictId`),
  CONSTRAINT `dictionaryitem_ibfk_1` FOREIGN KEY (`dictId`) REFERENCES `dictionary` (`dictId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of dictionaryItem
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `roleId` int(11) NOT NULL AUTO_INCREMENT,
  `roleCode` varchar(255) NOT NULL,
  `roleName` varchar(255) NOT NULL,
  `menuPerm` varchar(255) DEFAULT '',
  `apiPerm` varchar(255) DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES (1, 'admin', '超级管理员', '/article,/article/list,/article/add,/System,/System/User,/System/Role,/System/Dictionary,/demo,/demo/one,/list,/welcome', 'user:create,user:update,user:del,role:create,role:update,role:del', NULL, '2021-03-06 16:23:31');
INSERT INTO `role` VALUES (2, 'dev', '开发成员', '/article,/article/list,/article/add,/System,/System/Dictionary,/demo,/demo/one,/list,/System/Role', '', '2021-03-06 16:25:32', '2021-03-06 16:25:53');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', '123456', 1, NULL, NULL);
INSERT INTO `user` VALUES (2, 'dev', '123456', 2, '2021-03-06 16:26:06', '2021-03-06 16:26:06');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
