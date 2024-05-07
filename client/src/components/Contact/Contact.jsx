import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const response = await fetch(`/api/user/${listing.userRef}`);
                const data = await response.json();
                setLandlord(data.user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLandlord();
    }, [listing.userRef]);

    function onChange(event) {
        setMessage(event.target.value);
    }

    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-2">
                    <p>Contact <span className='font-semibold'>{landlord.userName}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                    <textarea className='w-full border p-3 rounded-lg' name="message" id="message" rows="2" value={message} placeholder='Enter your message here...' onChange={onChange}></textarea>
                    <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
                        Send Message
                    </Link>
                </div>
            )}
        </>
    )
}
