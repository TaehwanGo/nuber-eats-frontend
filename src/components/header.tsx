import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import nuberLogo from '../images/logo.svg';

export const Header: React.FC = () => {
  const { data } = useMe(); // 이렇게 사용하면 두번 query를 graphql에 요청하는 것 같지만 사실은 apollo cache에 있으면 그것을 가져오기 때문에 한번만 요청함
  // apollo cache + custom hooks => awesome
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-sm text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <img src={nuberLogo} alt="logoImg" className="w-24" />
          <span className="text-xs">
            <Link to="/my-profile/">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
