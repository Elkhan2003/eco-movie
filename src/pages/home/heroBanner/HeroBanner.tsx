// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import forceImg from "./../../../assets/k1KrbaCMACQiq7EA0Yhw3bdzMv7.jpg";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { TypeWriterWelcome } from "../../typeWriter/TypeWriterWelcome.tsx";

const HeroBanner = () => {
	const [background, setBackground] = useState("");
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	const { url } = useSelector((state) => state.home);
	const { data, loading } = useFetch("/movie/upcoming");
	const backgroundSite = () => {
		const randomIndex = Math.floor(Math.random() * 20);
		if (url.backdrop && data?.results?.[randomIndex]?.backdrop_path) {
			const bg = url.backdrop + data?.results?.[randomIndex]?.backdrop_path;
			setBackground(bg);
			console.error("First Way");
		} else if (data?.results?.[randomIndex]?.backdrop_path) {
			const fixOriginalUrl = "https://image.tmdb.org/t/p/original";
			const bg = fixOriginalUrl + data?.results?.[randomIndex]?.backdrop_path;
			setBackground(bg);
			console.error("Middle Way");
		} else {
			setBackground(forceImg);
			console.error("Last Way");
		}
	};

	useEffect(() => {
		backgroundSite();
	}, [data]);
	const searchQueryHandler = (event) => {
		if (event.key === "Enter" && query.length > 0) {
			navigate(`/search/${query}`);
		}
	};
	const searchButton = () => {
		if (query.length > 0) {
			navigate(`/search/${query}`);
		}
	};

	return (
		<div className="heroBanner">
			{!loading && (
				<div className="backdrop-img">
					<Img src={background} />
				</div>
			)}

			<div className="opacity-layer"></div>
			<ContentWrapper>
				<div className="heroBannerContent">
					<span className="title">
						<TypeWriterWelcome />
					</span>
					<span className="subTitle">
						Millions of movies, TV shows and people to discover. Explore now.
					</span>
					<div className="searchInput">
						<input
							type="text"
							placeholder="Search for a movie or tv show...."
							onChange={(e) => setQuery(e.target.value)}
							onKeyUp={searchQueryHandler}
						/>
						<button onClick={searchButton}>Search</button>
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
};

export default HeroBanner;
