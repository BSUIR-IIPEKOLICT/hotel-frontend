import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheets } from '@mui/styles';
import { ServerStyleSheet } from 'styled-components';

const __webpack_nonce__ = process.env.nonce || '';

export default class MainDocument extends Document {
  static async getInitialProps(
    context: DocumentContext
  ): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            materialSheets.collect(
              styledComponentsSheet.collectStyles(<App {...props} />)
            ),
        });

      const initialProps = await Document.getInitialProps(context);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style
              id="jss-server-side"
              nonce={process.env.nonce}
              dangerouslySetInnerHTML={{ __html: materialSheets.toString() }}
            />
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head nonce={process.env.nonce}>
          <script
            nonce={process.env.nonce}
            dangerouslySetInnerHTML={{
              __html: `window.__webpack_nonce__ = '${process.env.nonce}'`,
            }}
          />
          <meta property="csp-nonce" content={process.env.nonce} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body>
          <Main />
          <NextScript nonce={process.env.nonce} />
        </body>
      </Html>
    );
  }
}
