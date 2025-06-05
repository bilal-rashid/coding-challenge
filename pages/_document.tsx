import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link 
          rel="icon" 
          href="https://cdn.prod.website-files.com/5edfb37892e6a635a29ae550/5f1548a03cd0e652c1e0e7de_favicon-32x32.png" 
          type="image/png"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
