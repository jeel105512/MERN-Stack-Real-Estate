import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ListingCard from '../components/ListingCard/ListingCard';

export default function Search() {
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "created_at",
        order: "desc",
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get("searchTerm");
        const typeFromURL = urlParams.get("type");
        const parkingFromURL = urlParams.get("parking");
        const furnishedFromURL = urlParams.get("furnished");
        const offerFromURL = urlParams.get("offer");
        const sortFromURL = urlParams.get("sort");
        const orderFromURL = urlParams.get("order");

        if (searchTermFromURL || typeFromURL || parkingFromURL || furnishedFromURL || offerFromURL || sortFromURL || orderFromURL) {
            setSidebarData({
                searchTerm: searchTermFromURL || "",
                type: typeFromURL || "all",
                parking: parkingFromURL === "true" ? true : false,
                furnished: furnishedFromURL === "true" ? true : false,
                offer: offerFromURL === "true" ? true : false,
                sort: sortFromURL || "created_at",
                order: orderFromURL || "desc",
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const response = await fetch(`api/listing/search?${searchQuery}`);
            const data = await response.json();
            setListings(data);
            setLoading(false);
        }
        fetchListings();
    }, [location.search]);

    const handleChange = (event) => {
        if (event.target.id === "all" || event.target.id === "rent" || event.target.id === "sell") {
            setSidebarData({ ...sidebarData, type: event.target.id });
        }

        if (event.target.id === "searchTerm") {
            setSidebarData({ ...sidebarData, searchTerm: event.target.value });
        }

        if (event.target.id === "parking" || event.target.id === "furnished" || event.target.id === "offer") {
            setSidebarData({ ...sidebarData, [event.target.id]: event.target.checked || event.target.checked === "true" ? true : false });
        }

        if (event.target.id === "sort_order") {
            const sort = event.target.id.split("_")[0] || "created_at";
            const order = event.target.id.split("_")[1] || "desc";
            setSidebarData({ ...sidebarData, sort, order });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", sidebarData.searchTerm);
        urlParams.set("type", sidebarData.type);
        urlParams.set("parking", sidebarData.parking);
        urlParams.set("furnished", sidebarData.furnished);
        urlParams.set("offer", sidebarData.offer);
        urlParams.set("sort", sidebarData.sort);
        urlParams.set("order", sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input type="text" id="searchTerm" placeholder='Search...' className='border rounded-lg p-3 w-full' value={sidebarData.searchTerm} onChange={handleChange} />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id='all' className='w-5' onChange={handleChange} checked={sidebarData.type === "all"} />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={sidebarData.type === "rent"} />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='sell' className='w-5' onChange={handleChange} checked={sidebarData.type === "sell"} />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={sidebarData.offer} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={sidebarData.parking} />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={sidebarData.furnished} />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='font-semibold'>Sort:</label>
                        <select onChange={handleChange} defaultValue="created_at_desc" id="sort_order" className='border rounded-lg p-3'>
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className="flex-1">
                <h1 className='text-3xl font-semibold border-b p-3 mt-5 text-slate-700'>Listing results:</h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {!loading && listings.length === 0 && (<p className='text-xl text-slate-700'>No listing found!</p>)}
                    {loading && (<p className='text-xl text-slate-700 text-center w-full'>Loading...</p>)}
                    {!loading && listings.listings && listings.listings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}
                </div>
            </div>
        </div>
    )
}
