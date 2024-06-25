import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useParams, useNavigate } from 'react-router-dom';

import { RxCaretLeft } from 'react-icons/rx';
import { FiUpload } from 'react-icons/fi';
import { RiArrowDownSLine } from 'react-icons/ri';

import { api } from '../../../services/api';

import { Container, Form, Image, Category } from './styles';

import { Menu } from '../../../components/Menu';
import { Header } from '../../../components/Header';
import { ButtonCaption } from '../../../components/ButtonCaption';
import { Section } from '../../../components/Section';
import { Input } from '../../../components/Input';
import { FoodItem } from '../../../components/FoodItem';
import { TextArea } from '../../../components/TextArea';
import { Button } from '../../../components/Button';
import { Footer } from '../../../components/Footer';

import Swal from 'sweetalert2'

export function ItemEdit({ $Isadmin }) {
  const $isDesktop = useMediaQuery({ minWidth: 1024 });
  const [$ismenuOpen, setIsMenuOpen] = useState(false);

  const [dish, setDish] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchDish() {
      try {
        const response = await api.get(`/dishes/${params.id}`);
        setDish(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDish();
  }, [params.id]);

  useEffect(() => {
    if (dish) {
      setFileName(dish.image);
      setImage(dish.image);
      setName(dish.name);
      setCategory(dish.category);
      setPrice(dish.price);
      setDescription(dish.description);

      const allIngredients = dish.ingredients.map((ingredient) => ingredient.name);
      setTags(allIngredients);
    }
  }, [dish]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setUpdatedImage(file);
    setFileName(file.name);
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag('');
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleEditDish() {
    if (!image) {
      return Swal.fire({
        position: 'center-end',
        icon: 'warning',
        title: 'Selecione a imagem do prato.',
        showConfirmButton: false,
        timer: 3500
      });
    }

    if (!name) {
      return Swal.fire({
        position: 'center-end',
        icon: 'warning',
        title: 'Digite o nome do prato.',
        showConfirmButton: false,
        timer: 3500
      });
    }

    if (!category) {
      return Swal.fire({
        position: 'center-end',
        icon: 'warning',
        title: 'Selecione a categoria do prato.',
        showConfirmButton: false,
        timer: 3500
      });
    }

    if (tags.length === 0) {
      return Swal.fire({
        position: 'center-end',
        icon: 'warning',
        title: 'Informe pelo menos um ingrediente do prato.',
        showConfirmButton: false,
        timer: 3500
      });
    }

    if (newTag) {
      return Swal.fire({
        position: 'center-end',
        icon: 'warning',
        title: 'Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.',
        showConfirmButton: false,
        timer: 3500
      });
    }

    if (!price) {
      return Swal.fire({
        position: 'center-end',
        icon: 'warning',
        title: 'Digite o preço do prato.',
        showConfirmButton: false,
        timer: 3500
      });
    }

    if (!description) {
      return Swal.fire({
        position: 'center-end',
        icon: 'warning',
        title: 'Digite a descrição do prato.',
        showConfirmButton: false,
        timer: 3500
      });
    }

    setLoading(true);

    try {
      const updatedDish = {
        name: name,
        category: category,
        price: price,
        description: description,
        ingredients: tags,
      };

      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        await api.patch(`/dishes/${params.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      await api.patch(`/dishes/${params.id}`, updatedDish);

      Swal.fire({
        position: "center",
        icon: "info",
        title: 'Prato atualizado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
      navigate(-1);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Não foi possível cadastrar o prato.',
          showConfirmButton: false,
          timer: 3500
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveDish() {
    const confirm = window.confirm('Deseja realmente remover o prato?');

    if (confirm) {
      setLoading(true);

      try {
        await api.delete(`/dishes/${params.id}`);
        navigate('/');
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível excluir o prato.");
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Container>
      {!$isDesktop &&
        <Menu
          $Isadmin={$Isadmin}
          isDisabled={true}
          $ismenuOpen={$ismenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      }

      <Header
        $Isadmin={$Isadmin}
        isDisabled={true}
        $ismenuOpen={$ismenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main>
        <Form>
          <header>
            <ButtonCaption onClick={handleBack}>
              <RxCaretLeft />
              voltar
            </ButtonCaption>

            <h1>Editar prato</h1>
          </header>

          <div>
            <div className='image'>
              <Section title='Imagem do prato'>
                <Image className='image'>
                  <label htmlFor='image'>
                    <FiUpload size={'2.4rem'} />
                    <span>{fileName || 'Selecione imagem'}</span>

                    <input
                      id='image'
                      type='file'
                      onChange={handleImageChange}
                    />
                  </label>
                </Image>
              </Section>
            </div>

            <Section title='Nome'>
              <Input className='name'
                placeholder='Ex.: Salada Ceasar'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Section>

            <Section title='Categoria'>
              <Category className='category'>
                <label htmlFor='category'>
                  <select
                    id='category'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value=''>Selecionar</option>
                    <option value='meal'>Refeição</option>
                    <option value='dessert'>Sobremesa</option>
                    <option value='drink'>Bebida</option>
                  </select>

                  <RiArrowDownSLine size={'2.4rem'} />
                </label>
              </Category>
            </Section>
          </div>

          <div>
            <Section title='Ingredientes'>
              <div className='tags'>
                {
                  tags.map((tag, index) => (
                    <FoodItem
                      key={String(index)}
                      value={tag}
                      onClick={() => handleRemoveTag(tag)}
                    />
                  ))
                }

                <FoodItem
                  $isnew
                  placeholder='Adicionar'
                  onChange={(e) => setNewTag(e.target.value)}
                  value={newTag}
                  onClick={handleAddTag}
                />
              </div>
            </Section>

            <div id='Price'>
              <Section title='Preço'>
                <Input className='price'
                  placeholder='R$ 00,00'
                  type='number'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </Section>
            </div>
          </div>

          <Section title='Descrição'>
            <TextArea
              placeholder='Fale brevemente sobre o prato, seus ingredientes e composição'
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Section>

          <div className='buttons'>
            <Button
              className='delete'
              title='Excluir prato'
              onClick={handleRemoveDish}
              loading={loading}
            />

            <Button
              className='save'
              title='Salvar alterações'
              onClick={handleEditDish}
              loading={loading}
            />
          </div>
        </Form>
      </main>

      <Footer />
    </Container>
  );
}