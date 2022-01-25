[![LinkedIn][linkedin-shield]][linkedin-url]  

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h1>Login With Google OAth 2.0 authentication</h1>
  <p align="center">
    <a href="https://login-register-server.herokuapp.com//">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


[![product-screenshot]]()

[![login-screenshot]]()

[![register-screenshot]]()


### Built With

* [React.js](https://reactjs.org/)
* [Passport.js](https://www.passportjs.org/)
* [Axios](https://axios-http.com/)
* [Express](https://expressjs.com/)
* [MySQL](https://dev.mysql.com/doc/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/tranhongquang94/login-register-form.git
   ```
2. Go to your project root directory and install NPM packages
   ```sh
   npm install
   ```
3. Go to client folder and install npm packages for client-side.
   ```sh
   cd client && npm install
   ```
4. To start backend server, go to root folder and run the server.js file:
    ```sh
    node server.js
    ```
5. To start to client server, go to client folder and run the react script:
    ```sh
    npm start
    ```
The front-end react client will run on port 3000. The express back-end will run on port 8001.

<!-- CONTACT -->
## Contact

Tony Quang - tranhongquang94@gmail.com

Project Link: [https://github.com/tranhongquang94/login-register-form](https://github.com/tranhongquang94/login-register-form)


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Nodemon](https://nodemon.io/)
* [Http-Proxy-Middleware](https://www.npmjs.com/package/http-proxy-middleware)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/quang-tran-754a98bb/
[product-screenshot]: ./images/homepage.PNG
[login-screenshot]: ./images/login-form.png
[register-screenshot]: ./images/register-form.png