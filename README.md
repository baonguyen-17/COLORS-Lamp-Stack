# COLORS-Lamp-Stack
A Simple LAMP Stack WebApp, powered by DigitalOcean and GoDaddy

## Overview
A simple webapp simulating a user-based management system, allowing each user to host & manage their unique collection of colors via a semi-RESTful API implementation. 

This system database consists of:
1. ```Users```: manage the list of registered users & their respective ```id```
2. ```Colors```: manage each user's host of colors & support configuration

## Languages:
### Frontend: **HTML**, **CSS**, **JavaScript**
### Backend: **MySQL**, **PHP**

## Requirements
A. ### Host Server *(DigitalOcean)*
Steps:
1. Log into (https://digitalocean.com/), or sign up if you don't have an account
2. Navigate to Droplet tab on left vertical bar, and click **Create Droplet**
   - ### Droplet Configuration
   - Region: your region
   - Datacenter: your nearest datacenter
   - Image: Go to **Marketplace** tab, and select *LAMP on Ubuntu 24.04*
   - Size: Basic
   - CPU: Your preferred CPU configs >> **(prices vary)**
   - Authentication Method: Password -> Create your own password, used later to connect via SSH

   - **Note**: Remember to add a payment method as well!

B. ### Domain Server *(GODaddy)*
Steps:
1. Log into (https://godaddy.com), or sign up if you don't have an account
2. Purchase a domain
   - **Tips**: Look for .xyz, .abc, or uncommon domains for cheaper prices
3. Navigate to **Manage DNS** for purchased domain on GoDaddy website
4. Select **Add new record**
   - ### Record Configuration
   - Type: A
   - Name: @
   - Data: Your DigitalOcean Droplet IP Address *(displayed as ipv4)*
   - TTL: Custom (600 seconds)
   - **Note**: It may take up to 48 hours for the DNS to start recognizing the record


C. FTP Software *(FileZilla)*
1. Download FileZilla for simpler file uploads to host server

## Setup:
* Open Command Prompt (on Windows) or Terminal (on Mac/Linux)
* Connect to Droplet ip address via SSH command: *ssh root@YOUR_IP_ADDR*
* Connect to MySQL: *mysql -u root -p* & use same password
* Create databases:
  - 1. ```create database COLORMANAGER```;      // db_name
  - 2. ```use COLORMANAGER```;
  - 3. 
```
  CREATE TABLE `COLORMANAGER`.`Users` ( `ID` INT NOT NULL AUTO_INCREMENT , `FirstName`
VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Login`
VARCHAR(50) NOT NULL DEFAULT '' , `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
PRIMARY KEY (`ID`)) ENGINE = InnoDB;
```
  - 4. 
```
CREATE TABLE `COP4331`.`Colors` ( `ID` INT NOT NULL AUTO_INCREMENT , `Name`
VARCHAR(50) NOT NULL DEFAULT '' , `UserID` INT NOT NULL DEFAULT '0' , PRIMARY KEY
(`ID`)) ENGINE = InnoDB;
```
* Populate databases
  - Use command template: ```insert into Users (FirstName, LastName, Login, Password) values (FIRST_NAME, LAST_NAME, LOGIN, PASSWORD);``` to insert a new user
  - Use command template: ```create user USERNAME identified by PASSWORD;```, followed by ```grant all privileges on COLORMANAGER.* to USERNAME@'%';``` to grant database privileges to that user (which we use later to configure the API endpoints)

* Configure API Endpoints
  - For all the ```.php``` files located in the LAMPAPI folder, access each and do the following:
    - Change the ```localhost```, ```username```, ```password``` and ```db_name``` to your configuration

* Configure script.js
 - For the file ```script.js``` located in ```public```, change the var ```urlBase``` to become: ```http://YOUR_DOMAIN/LAMPAPI/```

* Open Filezilla, configure the fields on top & connect:
  - host: YOUR_DOMAIN
  - username: YOUR_DROPLET_ROOT
  - password: YOUR_PASSWORD
  - port: 22

* Use search bar to navigate to ```var/www/html```
* Upload the folders ```public``` and ```LAMPAPI```

### Test
* Search your domain & test the UIs


