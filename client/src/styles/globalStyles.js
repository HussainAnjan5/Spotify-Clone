import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	:root {
		--color-brand: #1ed760;
		--color-brand-press: #169C46;
		
		--color-black: #121212;
		--color-highlight: #1a1a1a;
		--color-press: #000;
		
		--color-gray: #b3b3b3;
		--color-text-sub: #a7a7a7;

    --toastify-toast-width: 32rem;
    --toastify-toast-min-height: 5.8rem;
	}

  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Montserrat", sans-serif, monospace;
    font-size: 16px;
    color: var(--color-gray);
    background-color: #000;
  }
  
  a,
  a:link,
  a:visited {
	  color: inherit;
	  text-decoration: none;
  }
  
  button {
	  font-family: inherit;
    border: 0;
  }
  
  ul {
	  list-style: none;
  }

  // TEMP
  .main {
    height: 100vh;

    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    position: relative;
    overflow: hidden;
  }
	
  .note {
    max-width: 80vw;
    padding: 1rem;

    position: absolute;
    bottom: 3rem;

    font-size: 1.4rem;
    background-color: #121212;
    border-radius: 3px;
  }

`;
export default GlobalStyles;
