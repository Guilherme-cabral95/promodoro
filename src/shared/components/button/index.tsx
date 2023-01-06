import { ButtonHTMLAttributes } from "react";
import './style/index.css';


export interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

function Button(props: buttonProps) {
    return <button {...props} className={'componentButton'}>{props.children}</button>
}

export { Button }