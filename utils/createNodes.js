import { useDispatch } from 'react-redux';

import { setFlowElements } from '../features/demoSlice';

export default function (data) {
  const dispatch = useDispatch();
  const elements = [];
  const tables = data.tables;
  let positionX = 100;
  let positionY = 250;
  let row = 0;

  //Loop through Tables
  for (const table in tables) {
    const tableName = table;
    const tableFields = tables[table].columns;

    const fields = [];

    for (const field in tableFields) {
      const dataType = tableFields[field].dataType;
      fields.push(
        <p>
          {field}
          <span>{dataType}</span>
        </p>
      );
    }
    console.log('fields', fields);

    const newNode = {
      id: tableName,
      type: 'special',
      data: {
        label: (
          <div style={customNodeStyle}>
            <div style={titleStyle}>
              <h3>tableName</h3>
            </div>
            <div style={containerStyle}>{fields}</div>
          </div>
        ),
      },
      position: { x: positionX, y: positionY },
    };

    // assign table node position
    row += 1;
    positionY += 600;
    if (row % 2 === 0) {
      positionY = 250;
      positionX += 400;
    }

    // append new node to elements array
    console.log('elements array', elements);
    elements.push(newNode);
  }
  dispatch(setFlowElements(elements));
}

const customNodeStyle = {
  color: '#403D39',
  backgroundColor: '#eeeeee',
  fontFamily: 'JetBrains Mono',
  borderRadius: 5,
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: '#8cbbad',
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
};

const titleStyle = {
  background: '#282b2e',
  fontSize: '16px',
  color: '#36acaa',
  TextAlign: 'center',
  padding: '5px 20px',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
};

const containerStyle = {
  padding: 10,
};
