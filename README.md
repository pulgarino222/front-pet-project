```markdown
# FRONT-PET-PROJECT

## Folder Structure

```plaintext
FRONT-PET-PROJECT                      # Root folder of the project
│
├── public                         # Static files served directly
│   └── (static files)            # Example: index.html, favicon, etc.
│
├── src                            # Contains all source code for the project
│   ├── Assets                     # Images and other assets
│   │   ├── AuthImg               # Images related to authentication
│   │   ├── Banner                 # Banner images
│   │   ├── GeneralImages          # General images for the project
│   │   └── Logos                  # Logos for social media
│   │       └── SocialMedia        # Specific social media logos
│   │
│   ├── Components                 # Reusable components of the application
│   │   ├── AboutPage              # Component for the "About Us" page
│   │   ├── AboutSection           # "About Us" section
│   │   ├── Auth                   # Authentication component
│   │   ├── Catalog                # Catalog component
│   │   ├── ContactSection         # Contact section
│   │   ├── CrudPet                # Component for CRUD operations for pets
│   │   ├── Footer                 # Footer component
│   │   ├── Header                 # Header component
│   │   ├── MainHeroSection        # Main hero section
│   │   ├── Sponsor                # Sponsors component
│   │   └── UserCrud               # Component for CRUD operations for users
│   │
│   ├── Context                    # Files for Context API if used
│   ├── Helpers                    # Helper functions and utilities
│   ├── Images                     # Other images that don't fit previous categories
│   ├── Pages                      # Components that represent complete pages
│   ├── Routes                     # Application routing configuration
│   ├── App.js                     # Main component of the application
│   ├── index.js                   # Entry point of the application
│   ├── reportWebVitals.js         # For measuring performance
│   └── setupTests.js              # Testing configuration
│
├── .gitignore                     # Files and folders that Git should ignore
├── package-lock.json              # Specific versions of dependencies
├── package.json                   # Information about the project and its dependencies
├── README.md                      # Project documentation
└── tailwind.config.js             # Tailwind CSS configuration
```

## Technologies Used

This project is built with the following technologies and dependencies:

- **React**: The main library for building user interfaces.
- **React Router DOM**: Handles navigation between different pages of the application.
- **Tailwind CSS**: A CSS framework for responsive design and styling.
- **AOS (Animate On Scroll)**: For animations on scroll.
- **Confetti.js**: For confetti effects during celebrations.
- **EmailJS**: Allows sending emails directly from the application.
- **JWT Decode**: For decoding JWT tokens.
- **SweetAlert2**: To display styled alerts.
- **React Slick**: To create image carousels.
- **Swiper**: A library for creating sliders.
- **Testing Library**: Tools for testing the application.

### Dependencies

The project dependencies can be found in the `package.json` file. Here are some of the most relevant ones:

- `react` and `react-dom`: Fundamental for development with React.
- `react-router-dom`: For handling routing in the application.
- `tailwindcss`: For responsive styling and design.
- `gh-pages`: For deploying the application on GitHub Pages.

## Starting the Project

To start the project, make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

1. Clone the repository:
   ```bash
   https://github.com/user-attachments/assets/fdf8f871-ed5d-4eaa-82b8-dc8c5593546d
   ```

2. Navigate to the project folder:
   ```bash
   cd FRONT-PET-PROJECT
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

Your application will be available at `http://localhost:3000`.

## Deployment

The application is deployed and available at [https://front-pet-project-nine.vercel.app/](https://front-pet-project-nine.vercel.app/).
