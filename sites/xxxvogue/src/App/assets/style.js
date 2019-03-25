import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html,
    body {
        min-height: 100vh;
        min-width: 320px;
        background-color: #f5f5f680;
        overflow-x: hidden;
    }

    html {
        font-family: 'Montserrat', 'Arial', 'Helvetica', sans-serif;
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
