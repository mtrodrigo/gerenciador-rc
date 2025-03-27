import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { db } from "../../services/firebaseConection"
import { setDoc, doc, getDoc } from "firebase/firestore"

export function Network(){

    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [linkedin, setLinkedin] = useState("")

    useEffect(() => {
        function loadLinks(){
            const docref = doc(db, "social", "link")
            getDoc(docref)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setLinkedin(snapshot.data()?.linkedin)
                }
            }) 
        }
        loadLinks()
    },[])

    function handleRegister(e: FormEvent){
        e.preventDefault()
        setDoc(doc(db, "social", "link"),{
           facebook: facebook,
           instagram: instagram,
           linkedin: linkedin, 
        })
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>
            <form className="flex flex-col max-w-xl w-full" onChange={handleRegister}>
                <label className="text-white font-medium my-2">Link Facebook</label>
                <Input 
                    type="url"
                    placeholder="Digite a URL do Facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />
                <label className="text-white font-medium my-2">Link Instagram</label>
                <Input 
                    type="url"
                    placeholder="Digite a URL do Instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />
                <label className="text-white font-medium my-2">Link Linkedin</label>
                <Input 
                    type="url"
                    placeholder="Digite a URL do Linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                />
                <button
                className="text-white bg-blue-600 h-9 rounded-md flex items-center justify-center font-medium mb-7" 
                type="submit">
                    Cadastrar links
                </button>
            </form>
        </div>
    )
}