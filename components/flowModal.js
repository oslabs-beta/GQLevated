import React from 'react';
import ReactFlow, { Background, Controls, Handle, Position } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';

import { setShowFlowModal } from '../features/demoSlice';
import { SQLSchema } from '../pages/api/sampleDB';

function flowModal({ data }) {
  const dispatch = useDispatch();
  const showDemo = useSelector((state) => state.demo.showDemo);
  let flowData = data;

  if (showDemo) flowData = SQLSchema;

  const elements = [];
  const tables = flowData.tables;

  let positionX = 100;
  let positionY = 100;
  let row = 0;

  //Iterate through all tables and
  for (const table in tables) {
    let index = 0;
    const tableName = table;
    const tableFields = tables[table].columns;
    const tableReference = tables[table].referencedBy;

    const fields = [];

    //Iterate through all of the fields within Table
    for (const field in tableFields) {
      const dataType = tableFields[field].dataType;
      fields.push(
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.6rem', width: '30rem', flexWrap: 'nowrap' }}>
          {field}
          <span>{dataType}</span>
        </div>
      );
    }

    if (tableReference) {
      for (const ref in tableReference) {
        const edge = {
          id: tableName + index++,
          source: tableName,
          target: ref,
          animated: true,
          label: ref,
          labelStyle: { fontSize: '1.6rem', fontWeight: 600 },
        };

        elements.push(edge);
      }
    }

    const newNode = {
      id: tableName,
      type: 'special',
      data: {
        label: (
          <div style={customNodeStyle}>
            <div style={titleStyle}>
              <h3 style={{ fontSize: '2rem' }}>{tableName}</h3>
            </div>
            <div style={containerStyle}>{fields}</div>
          </div>
        ),
      },
      position: { x: positionX, y: positionY },
    };

    row += 1;
    positionY += 600;
    if (row % 2 === 0) {
      positionY = 100;
      positionX += 550;
    }

    elements.push(newNode);
  }

  return (
    <div className='modal-overlay' onClick={() => dispatch(setShowFlowModal(false))}>
      <div className='flow-modal' onClick={(event) => event.stopPropagation()}>
        <ReactFlow elements={elements} nodeTypes={nodeTypes} defaultZoom={0.5}>
          <Background style={{ backgroundColor: '#1E1E1E' }} gap={12} size={0.5} color='#121212' />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

const CustomNodeComponent = ({ data }) => {
  return (
    <div style={customNodeStyle}>
      <Handle type='target' position={Position.Left} style={{ borderRadius: 0 }} />
      <div>{data.label}</div>
      <Handle type='source' position={Position.Right} id='a' style={{ top: '30%', borderRadius: 0 }} />
      <Handle type='source' position={Position.Right} id='b' style={{ top: '70%', borderRadius: 0 }} />
    </div>
  );
};

const nodeTypes = {
  special: CustomNodeComponent,
};

const customNodeStyle = {
  color: '#403D39',
  backgroundColor: '#eeeeee',
  fontFamily: 'Montserrat, sans-serif',
  borderRadius: 5,
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: '#8cbbad',
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  width: 'min-content',
};

const titleStyle = {
  background: '#282b2e',
  fontSize: '16px',
  color: 'white',
  TextAlign: 'center',
  padding: '5px 20px',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  fontFamily: 'Montserrat, sans-serif',
};

const containerStyle = {
  padding: 10,
};

export default flowModal;
