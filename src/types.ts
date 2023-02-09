import { MouseEventHandler, ReactNode } from "react";

export interface CardInterface {
    children: ReactNode;
}

export interface ButtonInterface {
    onClick: MouseEventHandler<HTMLButtonElement>,
    children: string;
}