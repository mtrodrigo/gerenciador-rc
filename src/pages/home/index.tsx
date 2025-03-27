import { Social } from "../../components/social"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../services/firebaseConection";
import { getDocs, collection, orderBy, query, doc, getDoc  } from "firebase/firestore";
import { useEffect, useState } from "react";
import Logo from '../../assets/logo_fundo_escuro.png'

interface LinksProps{
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}
interface SocialLinkProps{
    facebook: string,
    instagram: string,
    linkedin: string
}

export function Home(){
    console.log(db);
    
    const [links, setLinks] = useState<LinksProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinkProps>()

    useEffect(() => {
       function loadLinks(){
        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"))
        getDocs(queryRef)
        .then((snapshot) => {
            let lista = [] as LinksProps[]
            snapshot.forEach((doc) =>{
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
        }
        loadLinks()   
    },[])
    useEffect(() => {
        function loadSocialLinks(){
            const docRef = doc(db, "social", "link")
        getDoc(docRef)
        .then((snapshot) => {
            if(snapshot.data() !== undefined){
                setSocialLinks({
                    facebook: snapshot.data()?.facebook,
                    instagram: snapshot.data()?.facebook,
                    linkedin: snapshot.data()?.linkedin
                })
            }
        })
        }
        loadSocialLinks()
    },[])

    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <Link to='/'>
                <img className="w-50" src={Logo} alt="Logo" />
            </Link>
            <span className="text-gray-50 mb-5 mt-3">Meus links</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center items-center justify-center">
                {links.map((link) => (
                    <section key={link.id} className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105"
                    style={{backgroundColor: link.bg}}>
                    <a href={link.url} target="_blank">
                        <p className="text-base md:text-lg" style={{color: link.color}}>
                            {link.name}
                        </p>
                    </a>
                </section>
                ))}
                {socialLinks && Object.keys(socialLinks).length > 0 &&(
                    <footer className="flex justify-center gap-3 my-4">
                    <Social url={socialLinks?.instagram}>
                        <FaInstagram size={35} color="#fff" />
                    </Social>
                    <Social url={socialLinks?.facebook}>
                        <FaFacebook size={35} color="#fff" />
                    </Social>
                    <Social url={socialLinks?.linkedin}>
                        <FaLinkedin size={35} color="#fff" />
                    </Social>
                </footer>
                )}
                <section>
                    <Link to="/admin">Admin</Link>
                </section>
            </main>
        </div>
    )
}