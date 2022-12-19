import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useEffect } from 'react';

export default class MyDocument extends Document {
  override render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="__portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
