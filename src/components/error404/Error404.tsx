import React from 'react'
import style from './Error404.module.css'


function Error404() {
    return (
        <div className={style.error404Page}>
            <div>404</div>
            <div>Page not found!</div>
        </div>
    )
}

export default Error404