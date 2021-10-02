import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic';
import light from 'react-syntax-highlighter/dist/esm/styles/prism/material-light';

import '../assets/css/markdown.css';

const components = (darkTheme, children) => ({
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');

    return !inline && match ? (
      <SyntaxHighlighter
        style={!darkTheme ? light : dark}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code className={`${className} rounded-lg`} {...props}>
        {children}
      </code>
    );
  },
  a: (props) => {
    return (
      <a
        href={props.href}
        className={`outline-none w-full text-xs sm:text-base font-semibold font-spartan opacity-35 hover:opacity-65 focus:opacity-65`}
      >
        {children}
      </a>
    );
  },
});

export default function Parser({ center, smaller, children, darkTheme }) {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={components(darkTheme)}
      className={`w-full markdown-body ${
        !darkTheme ? 'text-gray-900' : 'text-gray-100'
      } list-disc ${center && 'text-center'} ${
        smaller ? 'text-xs' : 'text-sm'
      } lg:text-base z-10`}
    >
      {children}
    </ReactMarkdown>
  );
}
