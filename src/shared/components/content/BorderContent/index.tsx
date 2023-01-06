import { ReactNode } from "react"
import './style/style.css'

export type Border = {
    children:ReactNode
} 

const BorderContent = ({children}:Border):JSX.Element =>{
    return<div className="borderShadow" style={{background:'#fff'}}>
    {children}
    </div>
}

export {BorderContent}