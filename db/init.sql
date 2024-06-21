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