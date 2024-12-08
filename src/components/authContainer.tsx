import '../styles/components/login.scss';
import backgorund from '../assets/images/background.jpg';

const AuthContainer = ({ children }: any) => {
    return (
        <div className="login-container">
            <div className="image-container">
                <img src={backgorund}/>
            </div>
            <div className="form-container">
                <div className="box">
                    <div className="form">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthContainer;
