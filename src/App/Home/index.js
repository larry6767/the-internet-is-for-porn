import React from 'react'

// TODO FIXME refactor this temporary hack for SSR
//import css from './assets/_.module.scss'
const css = {}

export const Home = () => <div className={css.page}>
    <h1>Home</h1>
</div>

export default Home
