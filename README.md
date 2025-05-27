# Dog Adoption Platform API

This backend API supports user registration, authentication, dog registration, adoption, and management functionalities for a dog adoption platform.

## Folder Structure

- `controllers`: Handles request logic and responses  
- `models`: MongoDB schemas and database interactions  
- `routes`: API route definitions  
- `middlewares`: Authentication and other custom middleware  
- `.env`: Environment variables (excluded from version control)  
- `app.js`: Express app entry point  
- `db.js`: Database connection setup  
- `package.json`: Dependencies and scripts  

## Setup Instructions

1. Clone the repository  
2. Run `npm install` to install dependencies  
3. Create a `.env` file with the following variables:  
   - `PORT=3000`  
   - `MONGO_URI=<your_mongodb_connection_string>`  
   - `JWT_SECRET=<your_jwt_secret>`  
4. Run `npm run dev` to start the development server  
5. Use Postman or curl to test the API endpoints

## API Endpoints

- `POST /api/users/register` — Register new users  
- `POST /api/users/login` — Authenticate users and receive JWT token  
- `POST /api/dogs` — Register a new dog (requires authentication)  
- `POST /api/dogs/:id/adopt` — Adopt a dog by ID (requires authentication)  
- `DELETE /api/dogs/:id` — Remove a dog you own (requires authentication)  
- `GET /api/dogs` — List dogs with optional filters  
- `GET /api/dogs/adopted` — List adopted dogs

## Testing

Run `npm test` to execute API tests with Mocha and Chai.

## Notes

- Keep `.env` file secure and do not commit it to version control.  
- JWT tokens expire after 24 hours for security.


This structure provides a solid foundation for building a well-organized, scalable backend service. By separating concerns into dedicated directories and files, your project remains clean, navigable, and easier to debug and extend.

View the rubric for this assessment [here](https://storage.googleapis.com/hatchways.appspot.com/employers/springboard/student_rubrics/Dog%20Adoption%20Platform%20Rubric.pdf)
=======
# Dog Adoption API 

>>>>>>> e3635431795017994c381e151e5f4d6536feaa9c
