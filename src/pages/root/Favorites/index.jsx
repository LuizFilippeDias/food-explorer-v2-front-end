import { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { api } from '../../../services/api';

import { useNavigate } from 'react-router-dom';
import { RxCaretLeft } from "react-icons/rx";

import { Container, Content } from "./styles";

import { Menu } from "../../../components/Menu";
import { Header } from '../../../components/Header';
import { ButtonCaption } from "../../../components/ButtonCaption";
import { Favorite } from '../../../components/Favorite';
import { Footer } from '../../../components/Footer';

export function Favorites({ $Isadmin }) {
  const $isDesktop = useMediaQuery({ minWidth: 1024 });

  const [$ismenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.log('Erro ao buscar favoritos:', error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (dishId) => {
    try {
      await api.delete(`/favorites/${dishId}`);

      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== dishId)
      );
    } catch (error) {
      console.log('Erro ao atualizar favoritos:', error);
    }
  };

  return (
    <Container>
      {!$isDesktop &&
        <Menu
          $Isadmin={$Isadmin}
          $ismenuOpen={$ismenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      }

      <Header
        $Isadmin={$Isadmin}
        $ismenuOpen={$ismenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {
        favorites &&
        <main>
          <div>
            <header>
              <ButtonCaption onClick={handleBack}>
                <RxCaretLeft />
                voltar
              </ButtonCaption>

              <h1>Meus favoritos</h1>
            </header>

            <Content>
              {
                favorites.map(favorite => (
                  <Favorite
                    key={String(favorite.id)}
                    data={favorite}
                    removeFavorite={removeFavorite}
                  />
                ))
              }
            </Content>
          </div>
        </main>
      }

      <Footer />
    </Container>
  );
}