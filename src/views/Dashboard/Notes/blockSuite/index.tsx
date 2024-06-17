import { useEffect, useRef, useState } from 'react';

import { EditorProvider } from './components/EditorProvider';
import EditorContainer from './components/EditorContainer';
import AIInputComponent from './aipanel/ai-input';
import AILoadingComponent from './aipanel/ai-generating';
import AIAnswerComponent from './aipanel/ai-answer';

import './index.css';
import './aipanel/styles.scss';

const BlockSuite = (setDoc: any) => {
  const [aiState, setAIState] = useState('init');
  const [aiResult, setAIResult] = useState('');
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState(null);
  const [history, setHistory] = useState([]);
  // const [position, setPosition] = useState({ width: 500, left: 200, top: 300 });
  const [position, setPosition] = useState({ width: 0, left: 0, top: 0 });
  const abortControllerRef = useRef(null);

  const askAI = (ele) => {
    const container = ele.querySelector('.affine-block-children-container');
    const left = container.offsetLeft;
    const top = container.offsetTop + container.offsetHeight + 160;
    const width = container.offsetWidth;
    return { left, top, width };
  };

  return (
    <div>
      <EditorProvider>
        <div className="">
          <div className="main-content">
            <EditorContainer
              setState={setAIState}
              state={aiState}
              askAI={askAI}
              setPosition={setPosition}
              setModel={setModel}
            />
          </div>
        </div>
      </EditorProvider>
      <div className="ai-panel" style={position}>
        {aiState == 'input' && (
          <AIInputComponent
            setState={setAIState}
            history={history}
            setAIResult={setAIResult}
            prompt={prompt}
            setPrompt={setPrompt}
            abortControllerRef={abortControllerRef}
          />
        )}
        {aiState == 'generating' && (
          <AILoadingComponent
            setState={setAIState}
            abortControllerRef={abortControllerRef}
            aiResult={aiResult}
          />
        )}
        {aiState == 'result' && (
          <AIAnswerComponent
            history={history}
            setHistory={setHistory}
            aiResult={aiResult}
            setState={setAIState}
            prompt={prompt}
            setPrompt={setPrompt}
            setAIResult={setAIResult}
            abortControllerRef={abortControllerRef}
            model={model}
          />
        )}
      </div>
    </div>
  );
};

export default BlockSuite;
