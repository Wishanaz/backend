import { useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth"
import "../../shared/nav.scss"

const Navbar = () => {

    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <nav className="nav-bar">

            {/* LEFT - Logo */}
            <div className="nav-left">
                <p className="logo" onClick={() => navigate("/")}>
                    Insta
                </p>
            </div>

            {/* CENTER - (future search) */}
            <div className="nav-center">
                {/* future: search bar */}
            </div>

            {/* RIGHT - Actions */}
            <div className="nav-right">

                {user && (
                    <button
                        className="button primary-button"
                        onClick={() => navigate("/create-post")}
                    >
                        New Post
                    </button>
                )}

                <button
                    className="button primary-button"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>

            </div>

        </nav>
    )
}

export default Navbar