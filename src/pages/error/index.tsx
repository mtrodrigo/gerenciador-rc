import { Link } from "react-router-dom"
export function Error(){
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center text-white gap-3 border border-dotted border-white p-8">
                <h1 className="text-5xl">404</h1>
                <h1 className="text-3xl">Página não encontrada</h1>
                <h2 className="text-xl italic">Esta página não existe</h2>
                <div className="border border-white p-1 rounded hover:bg-white hover:text-black">
                    <Link to="/">Página inicial</Link>
                </div>
            </div>
        </div>
    )
}