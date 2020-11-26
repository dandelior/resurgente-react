import {
    Link
} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer-wrapper pd-lr">
                <Link to="/resurgente">Sobre Nosotros</Link>
                <p>
                    Resurgente<br/>Algunos derechos reservados
                </p>
            </div>
        </footer>
    )
}