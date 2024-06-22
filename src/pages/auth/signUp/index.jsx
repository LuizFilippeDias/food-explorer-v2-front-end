import { Container, Form, Brand } from './styles'
import { Link, useNavigate  } from 'react-router-dom'; 
import { api } from '../../../services/api'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Section } from '../../../components/Section';
import brand from '../../../assets/brand.svg'
import { useState } from 'react';

import Swal from 'sweetalert2'


export function SignUp (){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleSignUp() {
        if (!name || !email || !password) {
          return Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Preencha todos os campos!',
            showConfirmButton: false,
            timer: 4500
          });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        
        return Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Digite um e-mail válido!',
          showConfirmButton: false,
          timer: 4500
        });
      }
  
      if (password.length < 6) {
        return Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'A senha deve ter no mínimo 6 caracteres!',
          showConfirmButton: false,
          timer: 4500
        });
      }

      setLoading(true);

    api
    .post('/users', { name, email, password })
    .then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuário cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 5000
      });
      navigate(-1);
    })
    .catch((error) => {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Não foi possível cadastrar.',
          showConfirmButton: false,
          timer: 5000
        });
        
      }
    })
    .finally(() => setLoading(false));
}
    return (
        <Container>
            <Brand>
             <img src={brand} alt='Logo'/>
            </Brand>

            <Form>
                <h2>Criar sua Conta</h2>

                <Section title='Seu nome'>
                    <Input
                    placeholder = 'Exemplo: Maria da Silva'
                    type = 'text'
                    onChange={e => setName(e.target.value)}
                    />
                </Section>

                <Section title='Email'>
                    <Input
                    placeholder = 'Exemplo: exemplo@exemplo.com.br'
                    type = 'text'
                    onChange={e => setEmail(e.target.value)}
                    />
                </Section>

                <Section title='Senha'>
                    <Input
                    placeholder = 'No mínimo 6 caracteres'
                    type = 'password'
                    onChange={e => setPassword(e.target.value)}
                    />
                </Section>

                <Button title='Criar Conta' onClick={handleSignUp} loading={loading}/>

                <Link to ='/'>
                    Já tenho uma conta
                </Link>

                </Form>
        </Container>
    )
}