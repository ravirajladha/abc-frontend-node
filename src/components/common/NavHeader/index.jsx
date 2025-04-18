import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip, Button, OverlayTrigger } from 'react-bootstrap';

import LogoutButton from '../LogoutButton';
import { STUDENT_ROUTES } from '@/utils/constants';

import Logo from '@/assets/images/logo-transparent.png';

function NavHeader({ isOpen, toggleNav }) {
  const [isFull, setIsFull] = useState(true);

  const toggleNavWidth = () => {
    mainContent.classList.toggle('menu-active');
    setIsFull(!isFull);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 991.98) {
        mainContent.classList.toggle('menu-active', isFull);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  const toggleNavClass = `${isFull ? 'menu-active' : ''}`;

  return (
    <nav
      className={`navigation scroll-bar  ${toggleNavClass} ${
        isOpen ? 'nav-active' : ''
      }`}
    >
      <div className="container pl-0 pr-0">
        <div className="nav-content">
          <div className="nav-top">
            <Link to="/" className="justify-content-center pl-0">
              <img src={Logo} alt="Logo" className="" width={90} />
            </Link>
            <span
              onClick={toggleNav}
              className="close-nav d-inline-block d-lg-none"
            >
              <i className="ti-close bg-grey mb-4 btn-round-sm font-xssss fw-700  ml-auto mr-2 "></i>
            </span>
          </div>
          <div className="nav-caption fw-600 font-xssss text-grey-500">
            {/* <span>Navigate </span>Feeds */}
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            {/* two conditions while showing route */}
            {STUDENT_ROUTES.map((route, index) => (
              <li key={index}>
                {route.title && isFull ? (
                  <OverlayTrigger
                    delay={{ hide: 300, show: 250 }}
                    overlay={(props) => (
                      <Tooltip {...props}>{route.title}</Tooltip>
                    )}
                    placement="right"
                  >
                    <NavLink
                      to={route.path}
                      className="nav-content-bttn open-font"
                      data-tab="chats"
                    >
                      <i className={`${route.icon} mr-3`}></i>
                      <span>{route.title}</span>
                    </NavLink>
                  </OverlayTrigger>
                ) : (
                  <NavLink
                    to={route.path}
                    className="nav-content-bttn open-font"
                    data-tab="chats"
                  >
                    <i className={`${route.icon} mr-3`}></i>
                    <span>{route.title}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-caption fw-600 font-xssss text-grey-500"></div>
          <ul>
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) =>
                  isFull ? (
                    <Tooltip {...props}>Expand the sidebar</Tooltip>
                  ) : (
                    <span />
                  )
                }
                placement="right"
              >
                <Link
                  to="#"
                  onClick={toggleNavWidth}
                  className="nav-content-bttn open-font h-auto pt-2 pb-2"
                >
                  <i
                    className={`font-sm ${
                      isFull ? 'feather-chevron-right' : 'feather-chevron-left'
                    }  mr-3 text-dark`}
                  ></i>
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavHeader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default NavHeader;
