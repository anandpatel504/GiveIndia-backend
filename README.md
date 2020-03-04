# GiveIndia-backend Description

In this project, user can upload the csv file as well as he/she can select the base currency, Now app parse the csv data and validate the each format for each row [Date,Order Id,Nonprofit,Donation Currency,Donation Amount]
App converts all donation amount into the user-selected base currency
App groups the donations according to nonprofit and return the data on nonprofit_data.csv file.

## Requirements

If you're using Linux-based OS, install the latest version of Nodejs and npm, by typing the following commands on your terminal.

```
sudo apt update
sudo apt install build-essential apt-transport-https lsb-release ca-certificates curl

```
Then, for the **Latest** release (version 13), add this PPA, by typing the following command on your terminal

```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt install nodejs

```
Now, you need to install necessary dependencies using npm (node-package-manager), open your termial, and first type <br>
`npm init` to initialize **package.json** file. Then, type <br>

```
npm install express
npm install axios
npm install body-parser

```
