import { Html, Head, Main, NextScript } from 'next/document';

const MODE_STORAGE_KEY = 'moa:landing-mode';

// Runs before hydration so non-MDX pages and iframe preview routes start in the stored mode.
const bootstrapMode = `(function(){try{var m=localStorage.getItem('${MODE_STORAGE_KEY}');if(m!=='dark'&&m!=='light')return;var r=document.documentElement;r.classList.toggle('dark',m==='dark');r.dataset.theme=m;r.dataset.colorMode=m;}catch(e){}})();`;

export default function Document() {
  return (
    <Html>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapMode }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
