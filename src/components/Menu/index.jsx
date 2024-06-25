import { Container } from "./styles";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { Header } from '../../components/Header';
import { Search } from '../Search';
import { ButtonCaption } from '../ButtonCaption';

export function Menu({ $Isadmin, $ismenuOpen, setIsMenuOpen, setSearch, isDisabled }) {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    function handleNew() {
        navigate("/new");
    }

    function handleFavorites() {
        navigate('/favorites');
    }

    function handleSignOut() {
        navigate('/');
        signOut();
    }
    return (
        <Container $ismenuOpen={$ismenuOpen}>
            <Header $Isadmin={$Isadmin} $ismenuOpen={$ismenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <main>
                <Search isDisabled={isDisabled} setSearch={setSearch} />

                {$Isadmin ? (
                    <ButtonCaption onClick={handleNew}>
                        Novo Prato
                    </ButtonCaption>
                ) : null}

                <ButtonCaption onClick={handleFavorites}>
                    Meus favoritos
                </ButtonCaption>


                <ButtonCaption onClick={handleSignOut}>
                    Sair
                </ButtonCaption>
            </main>
        </Container>
    );
}