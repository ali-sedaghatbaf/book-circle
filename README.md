# BookCircle - A Next.js Community App

Welcome to BookCircle! This is a web application built with Next.js that allows users to form communities around their favorite books, discussing them one chapter at a time. It's a space for readers to share thoughts, discover new perspectives, and connect with fellow book lovers.

This project serves as a demonstration of building a modern, full-stack application using a powerful and productive tech stack.

## ✨ Features

- **Book Discovery:** Browse a collection of books with summaries and cover art.
- **Chapter-based Discussions:** Each book is broken down into chapters, allowing for focused discussion threads.
- **AI-Powered Summaries:** Can't remember the key points of a long discussion? Use the AI-powered summarization feature to get a quick overview.
- **Responsive Design:** A clean, modern, and responsive UI built with ShadCN UI and Tailwind CSS.
- **Mock Data:** The app uses a mock data layer to simulate a real database, making it easy to get started without a complex backend setup.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Integration:** [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🛠️ Installation & Setup

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

1.  **Install Dependencies:**
    First, install the necessary project dependencies using npm.
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    Create a `.env` file in the root of your project. You will need to add your Google AI API key to this file to enable the AI features.
    ```
    GOOGLE_API_KEY="your_google_ai_api_key_here"
    ```

3.  **Run the Development Servers:**
    The application requires two processes to run concurrently: the Next.js frontend and the Genkit AI backend. Open two separate terminal windows for the following commands.

    - **Terminal 1: Run the Next.js App**
      ```bash
      npm run dev
      ```
      This will start the web application on [http://localhost:9002](http://localhost:9002).

    - **Terminal 2: Run the Genkit AI Server**
      ```bash
      npm run genkit:watch
      ```
      This will start the Genkit development server, which handles the AI flows.

    You should now be able to access the application in your browser!

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

This project was bootstrapped in Firebase Studio.
