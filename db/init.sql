-- init.sql
CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    account VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS interviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    company_name VARCHAR(50) NOT NULL,
    title_name VARCHAR(50),
    status ENUM('pending', 'sent', 'approved', 'interview', 'calculate_salary', 'reject', 'get_offer') DEFAULT 'pending',
    reject_reason VARCHAR(255),
    month_salary INT,
    year_salary INT,
    welfare VARCHAR(255),
    guarantee_month INT,
    projects JSON,
    main_product VARCHAR(50),
    interview_flow JSON,
    current_test_level INT,
    created_date DATETIME DEFAULT NOW(),
    updated_date DATETIME DEFAULT NOW(),
    interview_dates JSON
);


-- 共乘打卡

CREATE TABLE IF NOT EXISTS ride_check_in (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('to_work', 'off_work') DEFAULT 'to_work',
    checked_in_date DATE NOT NULL,
    created_date DATETIME DEFAULT NOW(),
    user_id INT NOT NULL,
    CONSTRAINT unique_user_check_in_date UNIQUE (user_id, checked_in_date)  -- 複合唯一約束
);

CREATE TABLE IF NOT EXISTS ride_transaction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fee INT NOT NULL,
    ride_month CHAR(7) NOT NULL,
    created_date DATETIME DEFAULT NOW(),
    transaction_date DATE NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT unique_user_ride_month UNIQUE (user_id, ride_month)
);
