import React, { useState } from 'react';
import { Container } from "./styles";
import Swal from 'sweetalert2';
import { Counter } from '../Counter';
import { Button } from '../Button';

export function Order({ data, cancelMyOrder, updateTotalPrice, removeOrderItem, api }) {
  const [quantity, setQuantity] = useState(data.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(data.price * quantity);
  const [showQuantityButtons, setShowQuantityButtons] = useState(false);

  const showCancelConfirmation = () => {
    Swal.fire({
      title: 'Cancelar Pedido',
      text: 'Você tem certeza que deseja cancelar seu pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, cancelar pedido!',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMyOrder(data.id);
      }
    });
  };

  const handleQuantityChange = (newQuantity) => {
    const newTotalPrice = data.price * newQuantity;
    setQuantity(newQuantity);
    setTotalPrice(newTotalPrice);
  };

  const handleUpdate = () => {
    updateTotalPrice(totalPrice, quantity);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      const newTotalPrice = data.price * newQuantity;
      setQuantity(newQuantity);
      setTotalPrice(newTotalPrice);
      updateTotalPrice(-data.price, -1);
    }
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    const newTotalPrice = data.price * newQuantity;
    setQuantity(newQuantity);
    setTotalPrice(newTotalPrice);
    updateTotalPrice(data.price, 1);
  };

  const handleRemoveItem = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const newTotalPrice = data.price * newQuantity;
      updateTotalPrice(-data.price, -1);
      setTotalPrice(newTotalPrice);
    } else {

      console.log('Quantidade mínima. Remoção inapropriada.');
    }
  };
  return (
    <Container>
      <img src={`${api.defaults.baseURL}/files/${data.image}`} alt='Imagem do prato.' />

      <div>
        <h2>{data.name}</h2>
        <button onClick={showCancelConfirmation} className='cancel-button'>Cancelar Pedido</button>
        <p className="price-total">{`R$${totalPrice.toFixed(2).replace(".", ",")}`}</p>
        <p>Quantidade: {quantity}</p>
        <Counter number={quantity} setNumber={setQuantity} />
        <Button title='-' onClick={handleDecreaseQuantity} data-hidden={!showQuantityButtons} />
        <Button title='+' onClick={handleIncreaseQuantity} data-hidden={!showQuantityButtons} />
        <Button title='atualizar' onClick={handleUpdate} className='update-button' />
        <Button title='remover um item' onClick={handleRemoveItem} className='remove-button' />
      </div>
    </Container>
  );
}
