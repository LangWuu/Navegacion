import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaHiking, FaCompass } from 'react-icons/fa';
import '../styles/roleSelection.css';

export default function RoleSelection() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const mode = searchParams.get('mode') || 'register';
    const isLogin = mode === 'login';

    const handleTuristaClick = () => {
        navigate(isLogin ? '/login?rol=turista' : '/register?rol=turista');
    };

    const handleGuiaClick = () => {
        navigate(isLogin ? '/login?rol=guia' : '/register?rol=guia');
    };

    return (
        <div className="role-selection">
            <div className="role-selection__container">
                <div className="role-selection__header">
                    <h1 className="role-selection__title">
                        {isLogin
                            ? '¿Cómo quieres iniciar sesión?'
                            : '¿Cómo quieres explorar Colombia?'}
                    </h1>
                    <p className="role-selection__subtitle">
                        {isLogin
                            ? 'Selecciona tu tipo de cuenta'
                            : 'Selecciona el tipo de cuenta que mejor se ajuste a ti'}
                    </p>
                </div>

                <div className="role-selection__options">
                    <button
                        className="role-card role-card--turista"
                        onClick={handleTuristaClick}
                    >
                        <div className="role-card__icon">
                            <FaHiking />
                        </div>
                        <h2 className="role-card__title">Soy Turista</h2>
                        <p className="role-card__description">
                            {isLogin
                                ? 'Accede a tus experiencias y rutas guardadas'
                                : 'Quiero descubrir y vivir experiencias únicas'}
                        </p>
                        <div className="role-card__features">
                            <span>✓ Explora rutas temáticas</span>
                            <span>✓ Reserva experiencias</span>
                            <span>✓ Comparte reseñas</span>
                        </div>
                    </button>

                    <button
                        className="role-card role-card--guia"
                        onClick={handleGuiaClick}
                    >
                        <div className="role-card__icon">
                            <FaCompass />
                        </div>
                        <h2 className="role-card__title">Soy Guía</h2>
                        <p className="role-card__description">
                            {isLogin
                                ? 'Gestiona tus experiencias y rutas creadas'
                                : 'Quiero crear y ofrecer experiencias auténticas'}
                        </p>
                        <div className="role-card__features">
                            <span>✓ Crea experiencias</span>
                            <span>✓ Diseña rutas</span>
                            <span>✓ Conecta con viajeros</span>
                        </div>
                    </button>
                </div>

                <div className="role-selection__footer">
                    <p>
                        {isLogin ? (
                            <>
                                ¿No tienes cuenta?{' '}
                                <button
                                    className="role-selection__login-link"
                                    onClick={() =>
                                        navigate('/seleccionar-rol?mode=register')
                                    }
                                >
                                    Regístrate aquí
                                </button>
                            </>
                        ) : (
                            <>
                                ¿Ya tienes cuenta?{' '}
                                <button
                                    className="role-selection__login-link"
                                    onClick={() =>
                                        navigate('/seleccionar-rol?mode=login')
                                    }
                                >
                                    Inicia sesión aquí
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
