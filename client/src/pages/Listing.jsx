import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
    SwiperCore.use([Navigation]);

    const params = useParams();
    const [listing, setListing] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/listing/show/${params.id}`);
                const listing = await response.json();
                if (!listing.success) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(listing.listing);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchListing();
    }, [params.id]);

    return (
        <main>
            {loading && <div className="text-center my-7 text-2xl">Loading...</div>}
            {error && <div className="text-center my-7 text-2xl text-red-700">Something went wrong...</div>}
            {listing && !loading && !error && listing.imageUrls && (
                <Swiper navigation>
                    {listing.imageUrls.map((url) => (
                        <SwiperSlide key={url}>
                            {console.log(url)}
                            <img className="h-80 w-full object-cover" src={url} alt="Listing Image" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </main>
    )
}
