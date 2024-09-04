import './style.css'
import Trash from '../../assets/16qg.svg'
import api from '../../services/api.js'
import { useState, useRef } from 'react'

function Home() {
      // user é onde está os dados
      // setUser é responsável por colocar os dados em user
  const [users, setUsers] = useState([])

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    const email = inputEmail.current.value;
  
    try {
      // Verifica se o e-mail já existe
      const { data: existingUsers } = await api.get(`./usuarios?email=${email}`);
      
      if (existingUsers.length > 0) {
        alert('E-mail já cadastrado! Por favor, use um e-mail diferente.');
        return; // Retorna sem criar o usuário
      }
  
      // Cria o usuário se o e-mail não existir
      await api.post('./usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: email
      });
  
      // Atualiza a lista de usuários
      getUsers();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Ocorreu um erro ao tentar criar o usuário. Tente novamente.');
    }
  }
  

  async function deleteUsers(id) {
    await api.delete(`./usuarios/${id}`, {
    })

    
  }

  // useEffect(() => {
  //   getUsers()
  // })

  return (
    <div className='container'>
      <form action="">
        <h1>Cadastro de usuários</h1>
        <input type="text" placeholder='Digite seu nome' name='nome' ref={inputName}/>
        <input type="number" placeholder='Digite sua idade' name='idade' ref={inputAge} />
        <input type="email" placeholder='Digite seu email' name='email' ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div className="card" key={user.id}>
          <div className="user-info">
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button className="delete-button" onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="Delete" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
