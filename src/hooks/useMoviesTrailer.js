import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTrailerVideo } from "../redux/slice/moviesSlice";

const useMoviesTrailer = (movieId) => {
    const dispatch = useDispatch();
    // Fetch trailer by id movie id fro TDBM
    const getMovieVideos = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            movieId +
            "/videos?language=en-US",
          API_OPTIONS
        );
        const json = await data.json();
    
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        console.log('trailer', trailer)
        dispatch(addTrailerVideo(trailer));
    };

    useEffect(() => {
        getMovieVideos();
    }, []);
}

export default useMoviesTrailer;