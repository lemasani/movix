# **Movie Streaming App**

A modern, responsive movie streaming application built with **Next.js 14** and **TypeScript**, leveraging the **TMDb API** to showcase trending movies and provide users with an engaging viewing experience.

## **Features**

- **Landing Page**: Displays popular/trending movies using data from the TMDb API.
- **Movie Carousel**: Uses **Swiper.js** for movie posters, offering smooth navigation.
- **Movie Details**: Shows details such as title, release date, and rating.
- **Authentication**: User authentication (using **NextAuth.js** or **Clerk**) for login, signup, and session management.
- **Responsive Design**: Ensures the app looks great on all devices.
  
## **Tech Stack**

- **Next.js 14**: Server-side rendering and modern React features.
- **TypeScript**: For type safety and improved developer experience.
- **Axios**: For fetching movie data from TMDb API.
- **Swiper.js**: For an intuitive carousel of trending movies.
- **Tailwind CSS**: For responsive, fast, and efficient styling.

## **Setup Instructions**

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/movie-streaming-app.git
    cd movie-streaming-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your **TMDb API Key**:

    ```bash
    NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

## **API Usage**

The application uses **The Movie Database (TMDb) API** to fetch the latest and trending movie information. To use the API:

- Get your API key from [TMDb](https://www.themoviedb.org/documentation/api).
- Configure the API key in the `.env` file as shown above.

## **Project Structure**

├── components │ ├── HeroCarousel.tsx # Carousel component for trending movies │ └── MovieCard.tsx # Card displaying movie info ├── pages │ ├── index.tsx # Landing page │ ├── api │ │ └── auth # Authentication API routes ├── styles │ └── globals.css # Global styling with Tailwind CSS ├── utils │ └── api.ts # Axios configuration for TMDb API └── README.md # Project documentation

## **External Libraries**

- **Axios**: For making API requests to TMDb.
- **Swiper.js**: For the carousel feature.
- **Tailwind CSS**: For styling.
- **NextAuth.js** or **Clerk**: For authentication (mention whichever you use).

## **Challenges Encountered**

- Implementing smooth transitions and autoplay in the carousel.
- Handling API rate limits while fetching large movie datasets.

## **Future Enhancements**

- Add user watchlists and personalized recommendations.
- Integrate additional filters (e.g., by genre, release year).
- Add social login options (Google, Facebook).
- Improve error handling and loading states.

## **Contributing**

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## **License**

This project is licensed under the [MIT License](LICENSE).

