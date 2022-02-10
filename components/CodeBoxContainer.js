import React from 'react';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Button } from '@nextui-org/react';

import qtCreator from '../node_modules/react-syntax-highlighter/dist/esm/styles/hljs/qtcreator_dark';
import styles from '../styles/CodeBoxContainer.module.css';
import { SampleGQLServerCode, SampleGQLClientQueriesCode, SampleGQLClientMutationsCode } from '../pages/api/sampleDB';

function CodeBoxContainer() {
  const showDemo = useSelector((state) => state.demo.showDemo);
  const data = useSelector((state) => state.demo.queries);

  const uriDataGQLServerCode = data ? data.GQLServerCode : '';
  const uriDataGQLClientMutationsCode = data ? data.GQLClientMutationsCode : '';
  const uriDataGQLClientQueriesCode = data ? data.GQLClientQueriesCode : '';

  /* EXPORT GQL SERVER CODE */
  const exportGQLServerCode = () => {
    if (showDemo) {
      saveAs(new File([`${SampleGQLServerCode}`], 'GQLServerCode.js', { type: 'text/plain;charset=utf-8' }));
    }
    if (!showDemo && uriDataGQLServerCode !== '') {
      saveAs(new File([`${uriDataGQLServerCode}`], 'GQLServerCode.js', { type: 'text/plain;charset=utf-8' }));
    }
  };

  /* EXPORT GQL CLIENT MUTATIONS CODE */
  const exportGQLClientMutationsCode = () => {
    if (showDemo) {
      saveAs(new File([`${SampleGQLClientMutationsCode}`], 'GQLClientMutationsCode.js', { type: 'text/plain;charset=utf-8' }));
    }
    if (!showDemo && uriDataGQLClientMutationsCode !== '') {
      saveAs(new File([`${uriDataGQLClientMutationsCode}`], 'GQLClientMutationsCode.js', { type: 'text/plain;charset=utf-8' }));
    }
  };

  /* EXPORT GQL CLIENT QUERIES CODE */
  const exportGQLClientQueriesCode = () => {
    if (showDemo) {
      saveAs(new File([`${SampleGQLClientQueriesCode}`], 'GQLClientQueriesCode.js', { type: 'text/plain;charset=utf-8' }));
    }
    if (!showDemo && uriDataGQLClientQueriesCode !== '') {
      saveAs(new File([`${uriDataGQLClientQueriesCode}`], 'GQLClientQueriesCode.js', { type: 'text/plain;charset=utf-8' }));
    }
  };

  return (
    <div className={styles.codebox}>
      <div className={styles.clientWrapper}>
        <div className={styles.clientMutation}>
          <div className={styles.exportWrapper}>
            <h3> GraphQL Client Mutations</h3>
            <Button
              auto
              clickable={true}
              color='default'
              rounded='false'
              size='sm'
              css={{ px: '$4', height: '$10' }}
              onClick={() => {
                exportGQLClientMutationsCode();
              }}
            >
              Export Code
            </Button>
          </div>
          <SyntaxHighlighter language='javascript' style={qtCreator} className={styles.syntaxHighlighter}>
            {showDemo ? SampleGQLClientMutationsCode : uriDataGQLClientMutationsCode}
          </SyntaxHighlighter>
        </div>
        <div className={styles.clientQuery}>
          <div className={styles.exportWrapper}>
            <h3> GraphQL Client Queries</h3>
            <Button
              auto
              clickable={true}
              color='default'
              rounded='false'
              size='sm'
              css={{ px: '$4', height: '$10' }}
              onClick={() => {
                exportGQLClientQueriesCode();
              }}
            >
              Export Code
            </Button>
          </div>
          <SyntaxHighlighter language='javascript' style={qtCreator} className={styles.syntaxHighlighter}>
            {showDemo ? SampleGQLClientQueriesCode : uriDataGQLClientQueriesCode}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className={styles.gqldata}>
        <div className={styles.exportWrapper}>
          <h3> GraphQL Types, Root Queries, & Mutations </h3>
          <Button
            auto
            clickable={true}
            color='default'
            rounded='false'
            size='sm'
            css={{ px: '$4', height: '$10' }}
            onClick={() => {
              exportGQLServerCode();
            }}
          >
            Export Code
          </Button>
        </div>
        <SyntaxHighlighter language='javascript' style={qtCreator} className={styles.syntaxHighlightGraph}>
          {showDemo ? SampleGQLServerCode : uriDataGQLServerCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBoxContainer;
