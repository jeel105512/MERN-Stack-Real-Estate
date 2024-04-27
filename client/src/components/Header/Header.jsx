import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Header() {
    const { currentUser } = useSelector(state => state.user);
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Jeel</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type="text" name="" placeholder='Search...' className='bg-transparent outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-600' />
                </form>

                <ul className='flex gap-4'>
                    <Link to="/">
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
                    </Link>
                    <Link to="/about">
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
                    </Link>
                    {
                        currentUser ?
                            <Link to="/profile">
                                <img src={currentUser.avatar} alt="profile" className='rounded-full w-7 h-7 object-cover'></img>
                            </Link>
                            :
                            <Link to="/sign-in">
                                <li className='sm:inline text-slate-700 hover:underline cursor-pointer'>Sign in</li>
                            </Link>
                    }
                </ul>
            </div>
        </header>
    )
}