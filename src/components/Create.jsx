import React, { useContext, useState } from 'react';
import { useAlert } from 'react-alert';

import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';

import { LocalContext } from '../wrappers/LocalContext';
import Parser from '../processors/markdownEngine';

export default function Create() {
  const { API_URL, REACT_URL, darkTheme, currentSnippet, setCurrentSnippet } =
    useContext(LocalContext);

  const [content, setContent] = useState('');
  const [mode, setMode] = useState('edit');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const alert = useAlert();

  const createSnippet = () => {
    setSubmitting(true);
    setSubmitted(false);
    setContent('');

    const data = {
      content: content.trim(),
    };

    axios.post(`${API_URL}/snippet/create`, data).then((res) => {
      setSubmitting(false);

      if (res.data.error === 0) {
        setSubmitted(true);
        alert.success('Snippet created successfully!');

        setCurrentSnippet({
          snippetID: res.data.snippetID,
          content: data.content,
          posted_on: res.data.timestamp,
          link: res.data.link,
        });
      } else {
        setSubmitted(false);
        alert.error(res.data.message);
      }
    });
  };

  return (
    <div
      className={`w-full pt-20 ${
        !darkTheme ? 'bg-gray-100' : 'bg-gray-900'
      } duration-500 ease-in-out flex flex-col items-center px-2 lg:px-4`}
    >
      <div
        className={`my-6 text-center pb-2 ${
          !darkTheme ? 'text-gray-900' : 'text-gray-100'
        } font-bold font-spartan ml-2 text-xl lg:text-4xl border-b-2 border-purple-500 ${
          (submitting || submitted) && 'hidden'
        }`}
      >
        Paste and share something now! 📋
      </div>

      <div
        className={`w-full lg:w-4/5 ${(submitting || submitted) && 'hidden'}`}
      >
        <button
          className={`w-full p-2 bg-transparent hover:bg-green-400 focus:bg-green-400 border-2 border-green-400 rounded-lg ${
            !darkTheme ? 'text-gray-900' : 'text-gray-100'
          } font-bold font-sans tracking-wider text-2xl duration-300 ease-in-out uppercase mb-4`}
          onClick={() =>
            setMode((prev) => (prev === 'edit' ? 'preview' : 'edit'))
          }
        >
          Toggle Edit / Preview
        </button>

        {mode === 'edit' ? (
          <MDEditor
            value={content}
            onChange={setContent}
            visiableDragbar={true}
            preview="edit"
            height="500"
          />
        ) : (
          <div
            className={`p-2 ${
              darkTheme ? 'bg-gray-200' : 'bg-gray-800'
            } rounded`}
          >
            <Parser darkTheme={darkTheme}>{content}</Parser>
          </div>
        )}

        <div className="w-full flex justify-between mt-4 mb-8">
          <button
            className={`w-full p-2 bg-transparent ${
              content.length > 0
                ? 'hover:bg-blue-400 focus:bg-blue-400'
                : 'text-opacity-50 bg-opacity-50'
            } border-2 border-blue-400 rounded-lg ${
              !darkTheme ? 'text-gray-900' : 'text-gray-100'
            } font-bold font-sans tracking-wider text-2xl duration-300 ease-in-out uppercase mr-1`}
            onClick={() => setContent('')}
          >
            Clear
          </button>

          <button
            className={`w-full p-2 bg-transparent ${
              content.length > 0
                ? 'hover:bg-purple-500 focus:bg-purple-500'
                : 'text-opacity-50 bg-opacity-50'
            } border-2 border-purple-500 rounded-lg ${
              !darkTheme ? 'text-gray-900' : 'text-gray-100'
            } font-bold font-sans tracking-wider text-2xl duration-300 ease-in-out uppercase ml-1`}
            onClick={() => createSnippet()}
          >
            Post
          </button>
        </div>
      </div>

      <div className={`w-full lg:w-4/5 ${!submitting && 'hidden'}`}>
        <div
          className={`blink my-6 text-center pb-2 text-green-500 font-bold font-spartan ml-2 text-xl lg:text-4xl border-b-2 border-green-500`}
        >
          Submitting...
        </div>
      </div>

      {submitted && currentSnippet && (
        <div className={`w-full lg:w-4/5`}>
          <div
            className={`my-6 text-center pb-2 ${
              !darkTheme ? 'text-gray-900' : 'text-gray-100'
            } font-bold font-spartan text-xl lg:text-4xl border-b-2 border-purple-500`}
          >
            Snippet posted successfully!
          </div>

          <div
            className={`flex flex-col w-full justify-center font-spartan text-xl lg:text-3xl ${
              !darkTheme ? 'text-gray-900' : 'text-gray-100'
            } mt-4 mb-2`}
          >
            <p className="font-bold text-purple-500 text-center">
              To view the snippet, go on the following link:
            </p>
            <div className="w-full flex justify-center mt-2">
              <a
                href={`${REACT_URL}/snp/${currentSnippet.link}`}
                className={`text-xs lg:text-lg ${
                  !darkTheme ? 'bg-gray-200' : 'bg-gray-800'
                } pb-2 rounded-lg pt-3 px-2 duration-500 ease-in-out`}
              >
                {REACT_URL}/snp/{currentSnippet.link}
              </a>
            </div>
          </div>

          <div className="w-full flex justify-center my-4">
            <button
              className={`w-full lg:w-1/2 p-2 bg-transparent
              hover:bg-purple-500 focus:bg-purple-500
            border-2 border-purple-500 rounded-lg ${
              !darkTheme ? 'text-gray-900' : 'text-gray-100'
            } font-bold font-sans tracking-wider text-2xl duration-300 ease-in-out uppercase ml-1`}
              onClick={() => setSubmitted(false)}
            >
              Post another snippet
            </button>
          </div>

          <div
            className={`flex font-spartan text-base lg:text-lg ${
              !darkTheme ? 'text-gray-900' : 'text-gray-100'
            } items-end`}
          >
            <p className="font-bold text-purple-500">ID: </p>
            <p className="ml-2 text-sm lg:text-base">
              {currentSnippet.snippetID}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
