import { useDispatch } from 'react-redux';

import { setFlowElements } from '../features/demoSlice';

export default function (data) {
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
          {tableName}
          <span>{field}</span>
        </p>
      );
    }
    console.log('fields', fields);
  }
}
