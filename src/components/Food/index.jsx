import { BiPencil } from 'react-icons/bi'
import { FiHeart } from 'react-icons/fi'
import { RxCaretRight } from 'react-icons/rx'
import { useMediaQuery } from 'react-responsive'
import theme from '../../styles/theme'
import { Container, Title, OrderChosen, StyledFiHeart } from './styles'
import { Counter } from '../../components/Counter'
import { Button } from '../../components/Button'
import { api } from '../../services/api';
import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export function Food({ data, $Isadmin, isFavorite, isMyorder, updateFavorite, updateMyOrder, handleDetails, user_id, setOrderCount, ...rest }) {
  const $isDesktop = useMediaQuery({ minWidth: 1024 });

  const params = useParams();
  const navigate = useNavigate();

  const [number, setNumber] = useState(1);
  const [cartId, setCartId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [quantityOfItemsInTheCart, setQuantityOfItemsInTheCart] = useState(0);


  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        updateFavorite(true, data.id);
      } else {
        updateFavorite(false, data.id);
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Erro ao atualizar favoritos',
        text: 'Não foi possível atualizar os favoritos.',
        showConfirmButton: false,
        timer: 1500,
      });
      console.log('Erro ao atualizar favoritos:', error);
    }
  };

  function handleEdit() {
    navigate(`/edit/${data.id}`);
  }

  const handleMyOrder = async () => {
    setLoading(true);
    try {
      setQuantityOfItemsInTheCart((prevCount) => prevCount + 1);

      if (isMyorder) {
        updateMyOrder(true, data.id);
      } else {
        updateMyOrder(false, data.id);
      }

      const cartItem = {
        dish_id: data.id,
        name: data.name,
        quantity: number,
      };

      const response = await api.get('/carts', { params: { created_by: user_id } });
      const cart = response.data[0];

      if (cart) {
        await api.patch(`/carts/${cart.id}`, { cart_items: [cartItem] });
      } else {
        const createResponse = await api.post('/carts', { cart_items: [cartItem], created_by: user_id });
        const createdCart = createResponse.data;

        setCartId(createdCart.id);
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: 'Prato adicionado ao carrinho!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: 'Não foi possível adicionar ao carrinho.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Erro ao adicionar ao carrinho:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container {...rest} $Isadmin={$Isadmin}>
      {$Isadmin ? (
        <BiPencil size={'2.4rem'} onClick={handleEdit} />
      ) : (
        <StyledFiHeart onClick={handleFavorite} isfavorite={isFavorite ? "true" : "false"}>
          <FiHeart
            size={"2.4rem"}
            fill={isFavorite ? "#B31B1B" : "transparent"}
            stroke={isFavorite ? "#B31B1B" : theme.COLORS.GRAY_200}
            strokeWidth={2}
          />
        </StyledFiHeart>
      )}

      <img
        src={`${api.defaults.baseURL}/files/${data.image}`}
        alt='Imagem do prato.'
        onClick={() => handleDetails(data.id)}
      />

      <Title>
        <h2>{data.name}</h2>
        <RxCaretRight
          size={$isDesktop ? '2.4rem' : '1.4rem'}
          onClick={() => handleDetails(data.id)}
        />
      </Title>

      {$isDesktop && <p>{data.description}</p>}
      <span>R$ {data.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      {!$Isadmin && (
        <OrderChosen>
          <Counter number={number} setNumber={setNumber} />
          <Button
            title='incluir'
            onClick={handleMyOrder}
            loading={loading}
            value={quantityOfItemsInTheCart}
          />
        </OrderChosen>
      )}
    </Container>
  );
}