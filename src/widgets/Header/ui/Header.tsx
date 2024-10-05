import { ClipboardIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className='p-1 bg-purple-600 text-white'>
            <nav className='flex items-center'>
                <NavLink to={'/'} className='font-bold text-2xl mr-6'>
                    FocusHub
                </NavLink>
                <NavLink to={'/board'} className='flex items-center gap-x-1 hover:text-gray-100 duration-300'>
                  <ClipboardIcon className='text-xl' width={24}/>
                  Board
                </NavLink>
            </nav>
        </header>
    );
}
export default Header;
