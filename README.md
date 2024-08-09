<a name="readme-top"></a>
<br />

<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="public/Logo.png" alt="Logo" width="fit-content" height="fit-content">
  </a>

<br>
  <p align="justify">
    Using NextJS and TypeScript to allow users to add, like and save pins. Implemented NextAuth.js along with Zustand for user authentication. Leveraged Firebase to manage the database and storage requirements. Built a Chrome Extension  to seamlessly add content from other websites.</p>
    <img alt="Sockets" src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white"/> <img alt="Nodejs" src="https://img.shields.io/badge/Firebase-red?style=for-the-badge&logo=firebase&logoColor=white"/> <img alt="Sockets" src="https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=typescript&logoColor=black"/> <img alt="Sockets" src="https://img.shields.io/badge/Tailwind-rgb(56,189,248)?style=for-the-badge&logo=tailwindcss&logoColor=white"/> <img alt="Sockets" src="https://img.shields.io/badge/Zustand-purple?style=for-the-badge&logo=zustand&logoColor=white"/> <img alt="Sockets" src="https://img.shields.io/badge/Chrome Extension-red?style=for-the-badge&logo=googlechrome&logoColor=white"/>
<h3>Go to <a href="https://pintastik.vercel.app/">Pintastic.com</a> or see <a href="https://interviewlabs.netlify.app/">Demo Video</a></h3>
</div>

## Screenshots

### Login Screen

### New Meeting Screen

### Meeting Screen

## Technical Implementation

### Frontend Development

- **Next.js**: Leveraged for its robust framework to create a highly optimized and scalable web application.
- **TypeScript**: Employed to enhance code quality and maintainability by providing type safety.
- **NextAuth.js**: Implemented for secure and efficient authentication, ensuring a seamless user login experience.
- **Zustand**: Utilized for state management to maintain a predictable and centralized state across the application.

### Backend Development

- **Firebase**: Deployed as the backend service to handle database and storage needs, offering high reliability and scalability. Firebase’s real-time database ensures quick data synchronization, and its cloud storage provides secure and efficient file management.

### Browser Extension

- **Chrome Extension:**: Developed a Chrome extension to facilitate seamless pin posting from external websites. This integration boosts user engagement by 50% by allowing users to interact with the application directly from their browser, improving accessibility and user interaction.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

1. Install NPM packages in the following directories.

```sh
npm install
```

2. Create .env files in root directory

```sh
NEXT_PUBLIC_GOOGLE_CLIENT_ID =
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET =
NEXT_PUBLIC_FIREBASE_KEY =
```

3. Run Commands

```sh
npm run dev
```

### Prerequisites - Chrome Extension

1. Install NPM packages in the following directories.

```sh
cd ChromeExtension
npm install
```

2. Create .env files in root directory

```sh
PRIVATE_KEY_ID =
PRIVATE_KEY =
```

3. Run Commands

```sh
nodemon server.js
```

4. Setup Extension

```sh
cd/ ChromeExtension/ client
```

4. Go to Google Chrome

```sh
chrome://extensions
toggle developer mode ON
load client folder
```
