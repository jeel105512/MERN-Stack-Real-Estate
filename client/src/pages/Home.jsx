import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import ListingCard from "../components/ListingCard/ListingCard";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const response = await fetch(`/api/listing/search?offer=true&limit=4`);
        const data = await response.json();
        setOfferListings(data.listings);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const response = await fetch(`/api/listing/search?type=rent&limit=4`);
        const data = await response.json();
        setRentListings(data.listings);
        fetchSellListings();
      } catch (error) {
        console.error(error);
      }
    }

    const fetchSellListings = async () => {
      try {
        const response = await fetch(`/api/listing/search?type=sell&limit=4`);
        const data = await response.json();
        setSellListings(data.listings);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOfferListings();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto"> {/* Corrected p-29 to p-6 */}
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease</h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Jeel Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>Lets get started</Link>
      </div>

      <Swiper navigation>
        {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div className="h-[500px]" style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: "cover" }}></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link to={"/search?offer=true"} className='text-sm text-blue-800 hover:underline'>Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for Rent</h2>
              <Link to={"/search?type=rent"} className='text-sm text-blue-800 hover:underline'>Show more places for rent</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {sellListings && sellListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sell</h2>
              <Link to={"/search?type=sell"} className='text-sm text-blue-800 hover:underline'>Show more places for sell</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {sellListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>


  )
}
