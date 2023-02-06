import Upload from "./Upload.png";
import Spotify from "./Spotify.png"
import Spectrogram from "./Spectrogram.png"

const LOGIN_URI =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8888/login'
        : 'https://spot-check.herokuapp.com/login';

const Login = () => (
    <div>
        <div className="flex-parent-element-3">
            <div className="flex-child-element-3">
                <img src={Upload} alt="Upload" className="child1 bounce" />
                <br></br>
                <img src={Spotify} alt="Spotify" className="child2 bounce" />
                <br></br>
                <img src={Spectrogram} alt="Spectrogram" className="child3 bounce" />
            </div>

        </div>

        <div className="getstarted">
            Get Started
            <br></br>
            <br></br>
            <div>
                <a href={LOGIN_URI}>
                    Log in to Spotify
                </a>
            </div>

        </div>



    </div>
);

export default Login;