import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html,
    body {
        min-height: 100vh;
        min-width: 320px;
    }

    html {
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    * {
        box-sizing: border-box;
    }

    *::before,
    *::after {
        transition-duration: .2s;
        transition-timing-function: ease;
    }

    .page {
        min-height: calc(100vh - 373px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
export default GlobalStyle
