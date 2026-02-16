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
   - Authentication Method: Password -> Create your own password

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

