# N@me Dropper

## Getting Started

### Prerequisites

[**Docker**](https://www.docker.com/) - The simplest way to run this application is to install Docker and run the application in a container. Ensure Docker is installed bofore getting started.

1. `git clone git@github.com:catdadcode/name-dropper.git && cd name-dropper`

2. `docker compose up`

3. Navigate to `http://localhost:3000` in your browser.

That's it! You should now be ready to start n@me dropping!

## Technologies Used

- [Angular v17.3](https://angular.io/)
- [Docker](https://www.docker.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Overview

This application is intended as a simple demonstration. The task was to create a simple application that would allow a user to type a comment in a text field and mention another user by name via an @ symbol mention. However, rather than implement the bare bones functionality, I decided to take some time to spruce it up and add a bit of flair 😄

## Original Instructions

Build a simple Angular (latest) app that has this functionality:

- A list of comments
- A field that can allow people to add new comments
- The field should be able to detect when you type in someone's name starting with an @ like slack does. Here is a static set of users:

```json
[
  { "userID": 1, "name": "Kevin" },
  { "userID": 2, "name": "Jeff" },
  { "userID": 3, "name": "Bryan" },
  { "userID": 4, "name": "Julie" },
  { "userID": 5, "name": "Gabbey" }
]
```

When the entry is entered it needs to detect which user was typed in and trigger a javascript function that alerts their name.

The primary purpose of this project is to get the detect @user portion ready to port into our comment feature inside of Limble. So don't worry about things like persistence. Do make the styling of the dropdown and tagging of users look and function well because that is what is being ported over :).

There is only 1 rule: don't use a library that provides this functionality, we want to see how you write it.
