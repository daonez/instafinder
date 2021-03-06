import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  list-style:none;
  background:#FFFFFF;
  font-family: 'Ubuntu',sans-serif;
}
p{
  margin:0;
}

`

export default GlobalStyle
