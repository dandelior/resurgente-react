import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState(state => ({
            active: !state.active
        }));
        document.body.classList.toggle('fixed');
    }
    
    render() {

        let actualState = this.state.active;

        return (
            <header className="site-header">
                <div className="header-wrapper pd-lr">
                    <div className="brand">
                        <Link to="/">
                            <svg className={`logo ${actualState ? "invert-logo" : ""}`} width="146" height="24" viewBox="0 0 146 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.204 16.734C35.204 16.874 35.316 17 35.47 17H37.136C37.276 17 37.402 16.874 37.402 16.734V13.164H38.368L40.23 16.874C40.258 16.93 40.342 17 40.454 17H42.316C42.554 17 42.652 16.776 42.554 16.594L40.636 13.038C41.854 12.548 42.708 11.512 42.708 10.224C42.708 8.558 41.336 7.2 39.656 7.2H35.47C35.316 7.2 35.204 7.326 35.204 7.466V16.734ZM37.402 11.386V9.202H39.474C40.048 9.202 40.538 9.678 40.538 10.266C40.538 10.854 40.048 11.386 39.474 11.386H37.402ZM47.1029 16.734C47.1029 16.874 47.2149 17 47.3689 17H53.1649C53.3189 17 53.4309 16.874 53.4309 16.734V15.208C53.4309 15.068 53.3189 14.942 53.1649 14.942H49.2869V13.052H52.4789C52.6189 13.052 52.7449 12.94 52.7449 12.786V11.26C52.7449 11.12 52.6189 10.994 52.4789 10.994H49.2869V9.258H53.1649C53.3189 9.258 53.4309 9.132 53.4309 8.992V7.466C53.4309 7.326 53.3189 7.2 53.1649 7.2H47.3689C47.2149 7.2 47.1029 7.326 47.1029 7.466V16.734ZM57.336 16.062C57.658 16.384 58.666 17.14 60.486 17.14C62.544 17.14 63.79 15.684 63.79 14.242C63.79 12.338 62.054 11.484 60.962 11.05C59.856 10.602 59.436 10.21 59.436 9.692C59.436 9.314 59.814 8.978 60.318 8.978C61.172 8.978 62.194 9.748 62.32 9.818C62.446 9.916 62.698 9.79 62.796 9.636L63.51 8.558C63.566 8.46 63.594 8.208 63.426 8.11C63.006 7.802 61.886 7.06 60.43 7.06C58.274 7.06 57.196 8.46 57.196 9.846C57.196 11.526 58.708 12.464 59.912 12.94C60.864 13.318 61.354 13.766 61.354 14.354C61.354 14.844 60.948 15.194 60.388 15.194C59.464 15.194 58.456 14.452 58.4 14.424C58.302 14.354 58.036 14.326 57.924 14.508L57.266 15.67C57.154 15.866 57.196 15.922 57.336 16.062ZM67.876 13.248C67.876 15.376 69.654 17.14 71.852 17.14C74.064 17.14 75.856 15.376 75.856 13.248V7.466C75.856 7.326 75.73 7.2 75.59 7.2H73.868C73.714 7.2 73.602 7.326 73.602 7.466V13.136C73.602 14.116 72.86 14.9 71.852 14.9C70.858 14.9 70.13 14.116 70.13 13.136V7.466C70.13 7.326 70.018 7.2 69.864 7.2H68.142C68.002 7.2 67.876 7.326 67.876 7.466V13.248ZM80.6258 16.734C80.6258 16.874 80.7378 17 80.8918 17H82.5578C82.6978 17 82.8238 16.874 82.8238 16.734V13.164H83.7898L85.6518 16.874C85.6798 16.93 85.7638 17 85.8758 17H87.7378C87.9758 17 88.0738 16.776 87.9758 16.594L86.0578 13.038C87.2758 12.548 88.1298 11.512 88.1298 10.224C88.1298 8.558 86.7578 7.2 85.0778 7.2H80.8918C80.7378 7.2 80.6258 7.326 80.6258 7.466V16.734ZM82.8238 11.386V9.202H84.8958C85.4698 9.202 85.9598 9.678 85.9598 10.266C85.9598 10.854 85.4698 11.386 84.8958 11.386H82.8238ZM91.8247 12.114C91.8247 14.914 94.0647 17.126 96.8507 17.126C98.8807 17.126 100.323 16.216 100.323 16.216C100.379 16.174 100.435 16.062 100.435 15.992L100.421 12.226C100.421 12.086 100.309 11.96 100.169 11.96H97.3547C97.2007 11.96 97.0887 12.072 97.0887 12.226V13.612C97.0887 13.752 97.2007 13.864 97.3547 13.864H98.2367V14.676C97.8167 14.844 97.3967 14.9 96.9907 14.9C95.4647 14.9 94.2187 13.64 94.2187 12.114C94.2187 10.574 95.4507 9.286 96.9767 9.286C97.6627 9.286 98.2787 9.468 98.8107 9.958C98.9227 10.042 99.0767 10.042 99.1887 9.944L100.295 8.768C100.407 8.656 100.393 8.488 100.267 8.39C99.3147 7.564 98.0267 7.074 96.8507 7.074C94.0647 7.074 91.8247 9.314 91.8247 12.114ZM104.875 16.734C104.875 16.874 104.987 17 105.141 17H110.937C111.091 17 111.203 16.874 111.203 16.734V15.208C111.203 15.068 111.091 14.942 110.937 14.942H107.059V13.052H110.251C110.391 13.052 110.517 12.94 110.517 12.786V11.26C110.517 11.12 110.391 10.994 110.251 10.994H107.059V9.258H110.937C111.091 9.258 111.203 9.132 111.203 8.992V7.466C111.203 7.326 111.091 7.2 110.937 7.2H105.141C104.987 7.2 104.875 7.326 104.875 7.466V16.734ZM115.598 16.734C115.598 16.874 115.724 17 115.864 17H117.53C117.684 17 117.796 16.874 117.796 16.734V11.512H117.81L123.34 17.07C123.368 17.098 123.48 17.14 123.522 17.14H123.746C123.886 17.14 124.012 17.028 124.012 16.888V7.466C124.012 7.326 123.886 7.2 123.746 7.2H122.066C121.912 7.2 121.8 7.326 121.8 7.466V12.436H121.786L116.2 7.06H115.85C115.71 7.06 115.584 7.172 115.584 7.312L115.598 16.734ZM130.206 16.734C130.206 16.874 130.332 17 130.472 17H132.152C132.292 17 132.418 16.874 132.418 16.734V9.258H134.42C134.574 9.258 134.686 9.132 134.686 8.992V7.466C134.686 7.326 134.574 7.2 134.42 7.2H128.204C128.05 7.2 127.938 7.326 127.938 7.466V8.992C127.938 9.132 128.05 9.258 128.204 9.258H130.206V16.734ZM138.603 16.734C138.603 16.874 138.715 17 138.869 17H144.665C144.819 17 144.931 16.874 144.931 16.734V15.208C144.931 15.068 144.819 14.942 144.665 14.942H140.787V13.052H143.979C144.119 13.052 144.245 12.94 144.245 12.786V11.26C144.245 11.12 144.119 10.994 143.979 10.994H140.787V9.258H144.665C144.819 9.258 144.931 9.132 144.931 8.992V7.466C144.931 7.326 144.819 7.2 144.665 7.2H138.869C138.715 7.2 138.603 7.326 138.603 7.466V16.734Z" />
                                <g clipPath="url(#clip0)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9604 6.09568C6.68724 -2.6074 -7.06273 10.2374 11.7561 20.6495C11.8836 20.7204 12.0381 20.7204 12.1656 20.6495C30.9861 10.2374 17.2353 -2.6074 11.9604 6.09568ZM10.7513 16.0561C10.753 16.0586 10.753 16.062 10.7513 16.0645C10.7496 16.067 10.7462 16.0679 10.7437 16.067C10.2404 15.9235 9.79711 15.5089 9.60037 14.9482C9.22209 13.8708 9.67214 12.8195 10.1754 12.0638C10.6491 11.3131 11.8473 9.38625 10.9708 7.94573C10.9573 7.90351 10.9691 7.85791 11.0012 7.82836C11.0324 7.79796 11.0789 7.78867 11.1194 7.80387C12.8707 8.98601 14.6118 11.3993 14.6228 13.3929C14.6287 14.3943 13.9397 15.5942 13.363 16.1C13.3596 16.1033 13.3545 16.1033 13.3503 16.1008C13.3461 16.0974 13.3452 16.0924 13.3469 16.0881C13.4558 15.8796 13.7902 15.5942 13.786 14.8427C13.7809 13.8201 12.8876 12.5822 11.9891 11.976C11.968 11.9684 11.9444 11.9726 11.9283 11.9886C11.9123 12.0038 11.9064 12.0266 11.9131 12.0478C11.9131 12.0486 11.9131 12.0486 11.9131 12.0486C12.3193 12.7165 11.8574 13.5871 11.5847 14.0329C11.4589 13.7931 11.3913 13.522 11.4783 13.2502C11.48 13.2324 11.4707 13.2164 11.4563 13.2079C11.4411 13.1995 11.4226 13.2003 11.4082 13.2096C10.8467 13.8243 10.4025 14.9094 10.5824 15.6744C10.617 15.8213 10.6761 15.948 10.7513 16.0561Z" />
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="24" height="24" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                    </div>
                    <button className={`hamburger hamburger--collapse ${actualState ? "is-active" : ""}`} type="button" onClick={this.toggleMenu}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button> 
                    <div className="menu">
                        <nav className={`the-menu ${actualState ? "open" : ""}`}>
                            <Link onClick={document.body.classList.contains('fixed') ? this.toggleMenu : ""} to="/">Inicio</Link>
                            <Link onClick={document.body.classList.contains('fixed') ? this.toggleMenu : ""} to="/tag/fe">Fe</Link>
                            <Link onClick={document.body.classList.contains('fixed') ? this.toggleMenu : ""} to="/tag/vida">Vida</Link>
                            <Link onClick={document.body.classList.contains('fixed') ? this.toggleMenu : ""} to="/tag/cultura">Cultura</Link>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;