import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc, } from "firebase/firestore";

interface LinksProps{
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}


export function Admin(){
    const [nameInput, setnameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgroundInput, setBackgroundInput] = useState("#121212")
    const [link, setLinks] = useState<LinksProps[]>([])

    useEffect(() => {
        const linkRef = collection(db, "links")
        const queryRef = query(linkRef, orderBy("created", "asc"))
        
        const unSub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinksProps[]
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })
            setLinks(lista)
        })
        return () => {
            unSub()
        }
    },[])

    function handleRegister(e: FormEvent) {
        e.preventDefault()
        
        if(nameInput === "" || urlInput === ""){
            alert('Preecha todos os campos!')
            return;
        }
        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            setnameInput("")
            setUrlInput("")
        })
    }
    async function handleDeleteLink(id: string){
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            <form 
                className="flex flex-col mt-8 w-full max-w-xl"
                onSubmit={handleRegister}
            >
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input
                    placeholder="Digite o nome do link..."
                    value={nameInput}
                    onChange={ (e) => setnameInput(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
                <Input
                    type="url"
                    placeholder="Digite a URL do link..."
                    value={urlInput}
                    onChange={ (e) => setUrlInput(e.target.value)}
                />
                <section className="flex my-4 gap-5">
                    <div className="flex gap-1 items-center">
                        <label className="text-white font-medium mt-2 mb-2">Texto do Link</label>
                        <input 
                            type="color"
                            value={textColorInput}
                            onChange={ (e) => setTextColorInput(e.target.value)} 
                        /> 
                    </div>
                    <div className="flex gap-1 items-center">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                        <input 
                            type="color"
                            value={backgroundInput}
                            onChange={ (e) => setBackgroundInput(e.target.value)} 
                        /> 
                    </div>
                </section>
                {nameInput !== '' && (
                    <div className="flex flex-col items-center justify-center mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-3">Veja como está ficando</label> 
                        <article 
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3"
                            style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundInput }}
                        >
                            <p className="font-medium" style={{color: textColorInput}}>{nameInput}</p>
                        </article>
                    </div>
                )}
                <button 
                    className="bg-blue-600 mb-7 h-9 rounded-md text-white font-medium gap-4 flex items-center justify-center"
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>
            <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>
            {link.map((link) => (
                <article key={link.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                style={{backgroundColor: link.bg, color: link.color}}>
                    <p>{link.name}</p>
                    <div>
                        <button
                            className="border border-dashed p-1 bg-neutral-900"
                            onClick={() => handleDeleteLink(link.id)}
                        >
                            <FiTrash size={18} color="white"/>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}