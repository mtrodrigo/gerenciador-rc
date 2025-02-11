import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { FormEvent, useState } from "react"
import { auth } from '../../services/firebaseConection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Logo from '../../assets/logo_fundo_escuro.png'

export function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        if( email === '' || password === ''){
            alert('Preecha todos os campos!')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate('/admin')
            
        })
        .catch(() => {
            setError('Usuário ou senha incorreto')
        })
    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col gap-4">
            <Link to='/'>
                <img className="w-50" src={Logo} alt="Logo" />
            </Link>
            <form className="w-full max-w-xl flex flex-col px-2" onSubmit={handleSubmit}>
                <Input
                placeholder="Digite seu e-mail..."
                type="email"
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
                />
                <Input
                placeholder="Digite sua senha..."
                type="password"
                value={password}
                onChange={ (e) => setPassword(e.target.value)}
                />
                <span className="text-red-600 pb-2.5">{error}</span>
                <button 
                className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
                type="submit"
                >
                    Acessar
                </button>
            </form>
        </div>
    )
}