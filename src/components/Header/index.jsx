import { FiLogOut, FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Container, Brand, Menu, Logout } from './styles'

import { api } from '../../services/api';

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button'
import { Search } from '../../components/Search'
import brand from '../../assets/brand.svg';
import brandAdmin from '../../assets/brand-admin.svg'
import brandMobile from '../../assets/brand-mobile.svg'

export function Header({ $Isadmin, isDisabled, $ismenuOpen, setIsMenuOpen, setSearch }) {
  const $isDesktop = useMediaQuery({ minWidth: 1024 });
  const logo = $Isadmin ? ($isDesktop ? brandAdmin : brandMobile) : brand;

  const [quantityOfItemsInTheCart, setQuantityOfItemsInTheCart] = useState(" ");


  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleFavorites() {
    navigate('/favorites');
  }

  function handleNew() {
    navigate('/new');
  }

  function handleOrders() {
    setQuantityOfItemsInTheCart('...');
    navigate('/myorders');
  }

  function handleSignOut() {
    navigate('/');
    signOut();
  }

  useEffect(() => {
    const fetchCartQuantity = async () => {
      try {
        const response = await api.get('/myorders');
        const cartQuantity = response.data.length;
        setQuantityOfItemsInTheCart(cartQuantity);
      } catch (error) {
        console.log('Error fetching cart quantity:', error);
      }
    };

    fetchCartQuantity();
  }, []);


  return (
    <Container>
      {!$isDesktop && (
        <Menu>
          {!$ismenuOpen ?
            <FiMenu className='fi-menu-icon' onClick={() =>
              setIsMenuOpen(true)} /> :
            <>
              <MdClose size={'1.8rem'} onClick={() => setIsMenuOpen(false)} />
              <span>Menu</span>
            </>
          }
        </Menu>
      )}

      {($isDesktop || $ismenuOpen) && (
        <>
          <Brand>
            <Link to="/">
              <img src={logo} alt='Logo' />
            </Link>
          </Brand>

          {$isDesktop && <Search isDisabled={isDisabled} setSearch={setSearch} />}

          {$isDesktop &&
            <button className='favorites' onClick={handleFavorites}>Meus favoritos</button>
          }

          {$Isadmin ? (
            ($isDesktop && <Button className='new' title='Novo prato' onClick={handleNew} />)
          ) : (
            <Button
              className='orders'
              title={`${quantityOfItemsInTheCart}`}
              isCustomer
              ordercount={quantityOfItemsInTheCart}
              onClick={handleOrders}

            />
          )}

          {$isDesktop &&
            <Logout onClick={handleSignOut}>
              <FiLogOut size={'3.2rem'} />
            </Logout>
          }
        </>
      )}
    </Container>
  );
}     