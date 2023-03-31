# Riverside High Shool

This is a software application for a school that allows them to create rooms/courses and manage students. The front-end of the application is built with Next.js framework, and the back-end is built with Node.js. The application uses Postgres as the database management system.

---

## Deployment

The API is deployed on Railway, and the front-end is deployed on Vercel. Both are set up for automatic deployment based on the latest version of the develop branch in the project's GitHub repository. This allows for seamless updates to the live application without manual intervention.  
- API Deployment: https://ratherlab-production.up.railway.app/
- FrontEnd Deployment: https://rather-lab.vercel.app/
  (deployment test user: test@ratherlab.com.ar pass: Ratherlab1)

---
## Technologies Used

- Frontend: Next.js, Auth0
- Backend: Node.js, Express.js
- Database: PostgreSQL  
- ORM: Sequelize  
- Authentication: Auth0  
- Image storage: Cloudinary  
---
## API 
The API developed for this project was designed to be completely independent from the front-end,
allowing for more flexibility and scalability in the future. It was built with Node.js using the 
Express framework and connected to a PostgreSQL database through Sequelize, an ORM that facilitates 
interaction with the database. The API provides CRUD endpoints for the Room and Student entities,
which can be accessed through HTTP requests using standard RESTful principles.
In /server/postman you could find a collection of request to test the API.  

### ROOMs Endpoints
GET /rooms -> Get a list of all rooms.

GET /rooms?name={nameToFilter} -> Get a filtered list of rooms.

GET /rooms/:id -> Get details of a specific room by ID.

POST /rooms -> Create a new room.

PUT /rooms/:id -> Update details of a specific room by ID.

DELETE /rooms/:id -> Delete a specific room by ID.

### STUDENTS Endpoints


GET /students-> Get a list of all students.

GET /students-> Get a filtered list of students.

GET /students/:id-> Get details of a specific student by ID.

POST /students-> Create a new student.

PUT /students/:id-> Update details of a specific student by ID.

DELETE /students/:id-> Delete a specific student by ID.  

---
## Functionality

### Landing Page

- Displays a list of all rooms.
- Allows the user to search for a room by name and order alphabetically.

### Room Details Page

- Displays the details of a room, including its name, teacher, and students.
- Allows logged user to edit the details of a room.
- Allows logged user to remove a student from the room.
- Allows logged user to remove the room.

### Student Details Page

- Displays the personal information of a student, including their name, age, and gender.
- Displays a list of other students who are siblings of the selected student.
- Display a profile picture of the student.
- Allows logged user to edit the details of the student inluding his siblings.
- Allows logged user to change a student from his room.
- Allows logged user to remove the student.

### Admin Panel
- Display information of the logged user and his last login.
- Allows the user to create a new room or student.

---
## Features and Usage Video
[![Alt Text](https://res.cloudinary.com/dmwfysfrn/image/upload/c_scale,w_700/v1680088652/ratherLab/screenshots/gxnvwtta97hzjjrl4kqy.png)](https://vimeo.com/812850120)



## Screenshots

### Landing Page
![Landing Page](https://res.cloudinary.com/dmwfysfrn/image/upload/c_scale,w_700/v1680088652/ratherLab/screenshots/gxnvwtta97hzjjrl4kqy.png)

### Room Details Page
![Room Details Page](https://res.cloudinary.com/dmwfysfrn/image/upload/c_scale,w_700/v1680088810/ratherLab/screenshots/vqazc28pq5vfkjabdetq.png)

### Student Details Page
![Student Details Page](https://res.cloudinary.com/dmwfysfrn/image/upload/c_scale,w_700/v1680088652/ratherLab/screenshots/ub8lzc1fw2eyg3n12vvr.png)

### Student List Page
![Student List Page](https://res.cloudinary.com/dmwfysfrn/image/upload/c_scale,w_700/v1680088652/ratherLab/screenshots/xhmi7hxqdkczjpepibee.png)

### Admin Panel
![Admin Panel](https://res.cloudinary.com/dmwfysfrn/image/upload/c_scale,w_700/v1680088652/ratherLab/screenshots/yb6qh0zylm4dihvyj6aw.png)
### Login Form
![Login Form](https://res.cloudinary.com/dmwfysfrn/image/upload/v1680088651/ratherLab/screenshots/ozjnmau8fwbbao0hmpu3.png)

---
## Documentation 
Documentation used throughout the project's development  
- [NextJs](https://nextjs.org/docs/getting-started)
- [Express](https://expressjs.com/es/guide/routing.html)
- [Sequelize](https://sequelize.org/docs/v6/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Auth0](https://auth0.com/docs)
- [Cloudinary](https://console.cloudinary.com/documentation/embed_widgets_players)
- [React-select](https://react-select.com/home)
- [FontAwesome](https://fontawesome.com/docs)
---
## Set-up

1. Clone the repository:
   ```bash
   git clone https://github.com/scottimariano/ratherLab.git
2. Install dependencies for the serve:
   ```bash
   cd server
   npm install
3. Copy the .env.local file to .env and config your server settings  
    Inside the file there are comment to help you to configure your variables.
    ```bash
    cp .env.local .env
4. Create a local PostgreSQL database and set the connection string in server/.env:
    ```bash
    DATABASE_URL=postgres://<username>:<password>@localhost:<port>/<database_name>

5. Run the development server:
   ```bash
   cd server
   npm run dev
6. Copy the .env.local file to .env and config your client settings.
    ```bash
    cp .env.local .env
7. Run the development client:
    ```bash
    cd client
    npm run dev


---