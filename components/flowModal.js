import React from 'react';
import ReactFlow, { Background, Controls, Handle } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';

import { setShowFlowModal } from '../features/demoSlice';

const elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];

function flowModal() {
  const dispatch = useDispatch();

  return (
    <div className='modal-overlay' onClick={() => dispatch(setShowFlowModal(false))}>
      <div className='flow-modal' onClick={(event) => event.stopPropagation()}>
        <ReactFlow elements={elements}>
          <Background style={{ backgroundColor: '#121212' }} variant='none' gap={12} size={0.5} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default flowModal;
