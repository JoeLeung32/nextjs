[Back](../README.md)

# Manual Setup Next.js

1. Install next react react-dom
    ```text
    yarn add next react react-dom
    ```
2. Open `package.json` and add code:
    ```text
    "scripts": {
      "dev": "next",
      "build": "next build",
      "start": "next start"
    }
    ```
3. Create a `pages` directory inside your project.
4. Populate `./pages/index.js` with the following contents:
    ```text
    const HomePage = () => {
        return <div>Welcome to Next.js!</div>;
    };
    
    export default HomePage;
    ```
5. To start developing your application run `npm run dev`. This starts the development server on `http://localhost:3000`.

[Back](../README.md)