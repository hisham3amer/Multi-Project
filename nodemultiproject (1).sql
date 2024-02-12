-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2024 at 09:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodemultiproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `details` varchar(555) NOT NULL,
  `photo` varchar(555) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `title`, `details`, `photo`) VALUES
(1, 'slide 01', 'details 01', 'banner001.jpg'),
(2, 'slide 02', 'details 02', 'banner002.jpg'),
(3, 'slide 03', 'details 03', 'banner003.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `contactform`
--

CREATE TABLE `contactform` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactform`
--

INSERT INTO `contactform` (`id`, `fullName`, `email`, `subject`, `message`, `isRead`) VALUES
(1, 'ali samy', 'aaa@aaa.aaa', 'hi', 'zzzzzzzzz', 1),
(2, 'assasa', 'osama@gmnai.com', 'aqqqq', 'DFDFDF', 1),
(3, 'ali samy', 'aaa@aaa.aaa', 'hi', 'sdasdasdas', 1),
(9, 'asas', 'aaa@aaa.aaa', 'asa', 'asas', 1),
(10, 'ali samy', 'aaa@aaa.aaa', 'hi', 'cxzczxczxc', 0),
(12, 'ali samy', 'aaa@aaa.aaa', 'xcxcxc', 'xcxcxc', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `username`, `password`, `role`) VALUES
(1, 'ali samy', 'ali', '$2b$11$mBwXtxXozTiJ5xfus0h.eOga9SyiCvLqGcQV9pn9xR3L7UrFw4FuK', 'admin'),
(2, 'emad amer', 'emad', '$2b$11$ZcCsp.AuDma2Bq.nsw5B0ulkgSHlp7iGw.VWzJkoFTt5XkZM58iIK', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `workcat`
--

CREATE TABLE `workcat` (
  `id` int(10) UNSIGNED NOT NULL,
  `catName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workcat`
--

INSERT INTO `workcat` (`id`, `catName`) VALUES
(1, 'creative'),
(2, 'corporate'),
(3, 'portifolio');

-- --------------------------------------------------------

--
-- Table structure for table `workcatproj`
--

CREATE TABLE `workcatproj` (
  `catId` int(10) UNSIGNED NOT NULL,
  `projId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workcatproj`
--

INSERT INTO `workcatproj` (`catId`, `projId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 3),
(2, 4),
(2, 5),
(3, 1),
(3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `workproj`
--

CREATE TABLE `workproj` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `photo` varchar(555) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workproj`
--

INSERT INTO `workproj` (`id`, `title`, `description`, `photo`) VALUES
(1, 'proj 01', 'desc 01', 'proj01.jpg'),
(2, 'proj 02', 'desc 02', 'proj02.jpg'),
(3, 'proj 03', 'desc 03', 'proj03.jpg'),
(4, 'proj 03', 'desc 03', 'proj04.jpg'),
(5, 'proj 05', 'desc 05', 'proj05.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactform`
--
ALTER TABLE `contactform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workcat`
--
ALTER TABLE `workcat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workproj`
--
ALTER TABLE `workproj`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contactform`
--
ALTER TABLE `contactform`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `workcat`
--
ALTER TABLE `workcat`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `workproj`
--
ALTER TABLE `workproj`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
