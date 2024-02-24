import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Header: React.FC = () => {
    const { FirstName, LastName, email } = useSelector((state: RootState) => state.user);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <header>
            <div className='userPicContainer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src="userPic.png" alt="User Pic" className='userPic' />
                {isHovered && (
                    <div className='userInfos'>
                        <p>{FirstName} {LastName}</p>
                        <p>{email}</p>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;