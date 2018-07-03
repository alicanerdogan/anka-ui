import { injectGlobal, css } from "emotion";

export function injectGlobalStyles(): any {
  injectGlobal`
    ${FontFaces}
    ${GlobalRules}
  `;
}

const GlobalRules = css`
  * {
    box-sizing: border-box;
  }

  html {
    min-height: 100%;
  }

  body {
    font-family: "Roboto Condensed", sans-serif;
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    text-align: left;
    margin: 0 auto;
    max-width: 900px;
    background: #f0f0f0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-top: 0;
    font-weight: 500;
  }
`;

const FontFaces = css`
  /* cyrillic-ext */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 300;
    src: local("Roboto Condensed Light"), local("RobotoCondensed-Light"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCkYb8td.woff2)
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 300;
    src: local("Roboto Condensed Light"), local("RobotoCondensed-Light"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCAYb8td.woff2)
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek-ext */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 300;
    src: local("Roboto Condensed Light"), local("RobotoCondensed-Light"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCgYb8td.woff2)
        format("woff2");
    unicode-range: U+1F00-1FFF;
  }
  /* greek */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 300;
    src: local("Roboto Condensed Light"), local("RobotoCondensed-Light"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCcYb8td.woff2)
        format("woff2");
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 300;
    src: local("Roboto Condensed Light"), local("RobotoCondensed-Light"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCsYb8td.woff2)
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 300;
    src: local("Roboto Condensed Light"), local("RobotoCondensed-Light"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCoYb8td.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 300;
    src: local("Roboto Condensed Light"), local("RobotoCondensed-Light"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZGCQYbw.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto Condensed"), local("RobotoCondensed-Regular"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVl2ZhZI2eCN5jzbjEETS9weq8-19-7DRs5.woff2)
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto Condensed"), local("RobotoCondensed-Regular"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVl2ZhZI2eCN5jzbjEETS9weq8-19a7DRs5.woff2)
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek-ext */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto Condensed"), local("RobotoCondensed-Regular"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVl2ZhZI2eCN5jzbjEETS9weq8-1967DRs5.woff2)
        format("woff2");
    unicode-range: U+1F00-1FFF;
  }
  /* greek */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto Condensed"), local("RobotoCondensed-Regular"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVl2ZhZI2eCN5jzbjEETS9weq8-19G7DRs5.woff2)
        format("woff2");
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto Condensed"), local("RobotoCondensed-Regular"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVl2ZhZI2eCN5jzbjEETS9weq8-1927DRs5.woff2)
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto Condensed"), local("RobotoCondensed-Regular"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVl2ZhZI2eCN5jzbjEETS9weq8-19y7DRs5.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Roboto Condensed";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto Condensed"), local("RobotoCondensed-Regular"),
      url(https://fonts.gstatic.com/s/robotocondensed/v16/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQ.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
`;
