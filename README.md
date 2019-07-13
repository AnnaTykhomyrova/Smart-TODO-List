# Smart TODO list

It's a midterm group project in [Lighthouse Labs](https://www.lighthouselabs.ca/). 
This project was created by [me](https://github.com/AnnaTykhomyrova), [Aidan Chase](https://github.com/Aidanchase) and [Vishnu Chennuru](https://github.com/vishnuchen) in 5 days. We have used Knex, Wolfram Alpha API and PostgreSQL.

## Description 

When you are recommended something it's not always easy to jot it down for later in an organized fashion. Adding the item to your phone or computer ends up taking time and opening up the right app is only part of the problem. You then have to locate the right list ("Movies to watch", "Books to read", etc.) to add to. And if you do get it in to the right list, you don't have much more context about it. This delay and lack of additional information acts as a huge deterrent.

The solution? A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list.

## Final product

!["Screenshot of ."]()
!["Screenshot of ."]()
!["Screenshot of ."]()
!["Screenshot of ."]()
!["Screenshot of ."]()

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies using the `npm install` command.
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Prepare your database with `knex migrate:latest` or `npm run knex migrate:latest` command.
6. Seed category keywords with `knex seed:run` or `npm run knex seed:run` command.
7. Start the web server using the `npm run local` command.
8. Go to `http://localhost:8080/` in your browser.

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- bcrypt
- body-parser
- cookie-session
- ejs
- express
- knex
- knex-logger
- morgan
- node-sass-middleware
- pg
- dotenv