import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';

import Parser from '../processors/markdownEngine';
import { LocalContext } from '../wrappers/LocalContext';
import { convert } from '../utils/timestamp.';

export default function View() {
  const { API_URL, currentSnippet, darkTheme } = useContext(LocalContext);
  const { snippetLink } = useParams();
  const history = useHistory();
  const alert = useAlert();

  const [isLoading, setIsLoading] = useState(true);
  const [didOnce, setDidOnce] = useState(false);
  const [foundSnippet, setFoundSnippet] = useState(null);

  useEffect(() => {
    let timer = setTimeout(() => setIsLoading(false), 4000);

    if (!snippetLink) {
      history.push('/');
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!didOnce && snippetLink) {
    setDidOnce(true);

    if (currentSnippet && currentSnippet.link === snippetLink) {
      setFoundSnippet(currentSnippet);
    } else {
      const data = {
        link: snippetLink,
      };

      axios.post(`${API_URL}/snippet/fetch/one`, data).then((res) => {
        if (res.data.error === 0) {
          alert.success('Snippet found!');
          setFoundSnippet(res.data.snippet['_doc']);
        } else {
          alert.error(res.data.message);
          setIsLoading(false);
        }
      });
    }
  }

  return (
    <div className="w-full pt-24">
      {!foundSnippet && (
        <div className="w-full">
          {isLoading ? (
            <div
              className={`blink w-full text-xl lg:text-2xl font-semibold font-spartan text-green-500 text-center`}
            >
              Loading...
            </div>
          ) : (
            <div className="w-full flex flex-col">
              <div
                className={`w-full text-xl lg:text-2xl font-semibold font-spartan text-red-500 text-center`}
              >
                That snippet was not found :(
              </div>

              <div className="w-full flex justify-center mt-2">
                <button
                  className={`w-full lg:w-1/2 p-2 bg-transparent
              hover:bg-purple-500 focus:bg-purple-500
            border-2 border-purple-500 rounded-lg ${
              !darkTheme ? 'text-gray-900' : 'text-gray-100'
            } font-bold font-sans tracking-wider text-2xl duration-300 ease-in-out uppercase ml-1`}
                  onClick={() => history.push('/')}
                >
                  Post a snippet now!
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {foundSnippet && (
        <div className="w-full flex flex-col items-center">
          <div
            className={`p-2 ${
              !darkTheme ? 'bg-gray-200' : 'bg-gray-800'
            } rounded w-full lg:w-4/5`}
          >
            <Parser darkTheme={darkTheme}>{foundSnippet.content}</Parser>
          </div>

          <div
            className={`flex w-full lg:w-4/5 font-spartan text-base lg:text-lg ${
              !darkTheme ? 'text-gray-900' : 'text-gray-100'
            } items-end mt-4`}
          >
            <p className="font-bold text-purple-500">ID: </p>
            <p className="ml-2 text-sm lg:text-base">
              {foundSnippet.snippetID}
            </p>
          </div>

          <div
            className={`flex w-full lg:w-4/5 font-spartan text-base lg:text-lg ${
              !darkTheme ? 'text-gray-900' : 'text-gray-100'
            } items-end`}
          >
            <p className="font-bold text-purple-500">Posted at: </p>
            <p className="ml-2 text-sm lg:text-base">
              {convert(foundSnippet.posted_on, true)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
