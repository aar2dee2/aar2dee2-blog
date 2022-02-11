import { Component } from "react";
import styles from "../styles/global.css"

export default function App({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    )
}