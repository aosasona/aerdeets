import Head from "next/head";
import React, { FunctionComponent } from "react";

type Props = {
  title: string | undefined;
  desc: string | undefined;
  keywords?: string | undefined;
  image: string | undefined;
};

const Meta: FunctionComponent<Props> = ({ title, desc, keywords, image }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#121212" />
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.aerdeets.com" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.aerdeets.com" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:image" content={image} />

      <meta property="og:site_name" content="https://www.aerdeets.com" />
      <meta property="og:site" content="https://www.aerdeets.com" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content="https://www.aerdeets.com" />
      <meta property="og:url" content={image} />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "AerDeets",
  keywords:
    "aerdeets, tech, blog, ayodeji, osasona, space, web3, coding, javascript, python, deets, aer",
  desc: "All things tech!",
  image: "/img/preview.jpg",
};

export default Meta;
