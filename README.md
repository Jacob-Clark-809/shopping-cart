# Shopping Cart App

Application for tracking items added to shopping cart. Includes express backend and react frontend.

## Setup

1. Install [Node.js](https://nodejs.org/en/download/package-manager/) if you haven't already
2. Clone this repository
3. `cd` into the downloaded directory
4. `cd` into server and run `npm install` from the command line to install all dependencies

## DataBase Setup

1. Create mongoDB account - https://account.mongodb.com/account/register
2. Create a free AWS cluster
3. Go to `collections` (Browse Collections) and create a new database (shopping_cart) for example with two collections `products` and `cartitems`. Note: If you are going to work in pairs create two databases (for example team1_shopping and team2_shopping) and each database should have two collections `products` and `cartitems`.
4. Under Security tab, click Database Access, and on the right `add new database user`. After you enter username and password, click `add user` at the bottom right corner.
5. Under Security tab, click Network Access, and whitelist your IP address.
6. Once your cluster is created, under Clusters tab, click connect and then MongoDB for VSCode and copy the connection string which will look something like this `mongodb+srv://test123:<password>@cluster0-zamyu.mongodb.net/`. Instead of `test123` there will be your username, and you will need to replace `<password>` with your password and `test` with the database name. You will have to put the name of your database after the connection string with some flags `mongodb+srv://test123:<password>@cluster0-zamyu.mongodb.net/<databaseName>?retryWrites=true&w=majority`. Change `<databaseName>` with the name of your database.
7. Finally, inside your project folder, `cd` into server, create new file `.env` and enter `DB=<paste the string from above here>`. It will look similar to this `DB=mongodb+srv://test123:mypass@cluster0-zamyu.mongodb.net/shopping_cart?retryWrites=true&w=majority`.

## DOCS

You can find documentation in the `docs` folder in `api.md` file.
