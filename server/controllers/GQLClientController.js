/* FUNCTION TO COMBINE ALL TABLES FROM EACH DB */
const createCombinedTables = (databases) => {
  let num = 0;
  const tablesCombined = {};
  for (const databaseIndex in databases) {
    const database = databases[databaseIndex];
    for (const index in database.tables) {
      tablesCombined[num] = database.tables[index];
      num++;
    }
  }
  return tablesCombined;
};

const tab = `  `;

const Controller = {};

/* ****************** BUILD CLIENT QUERIES BELOW ****************** */

/* MAIN FUNCTION TO CONVERT TO GQL CLIENT QUERIES THAT CALLS ALL OTHER HELPER FUNCTIONS */
Controller.convertToGQLClientQueriesCode = (req, res, next) => {
  try {
    // GET ALL TABLES FROM res.locals.preppedForGQL
    const tables = createCombinedTables(res.locals.preppedForGQL);

    let query = "import { gql } from 'apollo-boost';\n\n";
    const exportNames = [];

    for (const tableId in tables) {
      query += buildClientQueryAll(tables[tableId]);
      exportNames.push(`queryEvery${tables[tableId].type}`);

      if (!!tables[tableId].fields[0]) {
        query += buildClientQueryById(tables[tableId]);
        exportNames.push(`query${tables[tableId].type}ById `);
      }
    }

    let endString = 'export {';
    exportNames.forEach((name, i) => {
      if (i) {
        endString += `, ${name}`;
      } else {
        endString += ` ${name}`;
      }
    });

    // return (query += `${endString}};`);
    res.locals.GQLClientQueriesCode = query += `${endString}};`;
    return next();
  } catch (error) {
    const errObj = {
      log: `Error in server middleware @ convertToGQLClientQueriesCode: ${error}`,
      status: 400,
      message: {
        err: 'Unable to parse Graphql Client Queries Code',
      },
    };
    return next(errObj);
  }
};

/* HELPER FUNC FOR Controller.convertToGQLClientQueriesCode */
function buildClientQueryAll(table) {
  let string = `const queryEvery${table.type} = gql\`\n`;
  string += `${tab}{\n`;
  string += `${tab}${tab}every${toTitleCase(table.type)} {\n`;

  for (const fieldId in table.fields) {
    string += `${tab}${tab}${tab}${table.fields[fieldId].name}\n`;
  }

  return (string += `${tab}${tab}}\n${tab}}\n\`\n\n`);
}
/* HELPER FUNC FOR Controller.convertToGQLClientQueriesCode */
function toTitleCase(refTypeName) {
  let name = refTypeName[0].toUpperCase();
  name += refTypeName.slice(1).toLowerCase();
  return name;
}
/* HELPER FUNC FOR Controller.convertToGQLClientQueriesCode */
function buildClientQueryById(table) {
  let string = `const query${table.type}ById = gql\`\n`;
  string += `${tab}query($${table.fields[0].name}: ${table.fields[0].type}!) {\n`;
  string += `${tab}${tab}${table.type.toLowerCase()}(${table.fields[0].name}: $${table.fields[0].name}) {\n`;

  for (const fieldId in table.fields) {
    string += `${tab}${tab}${tab}${table.fields[fieldId].name}\n`;
  }

  return (string += `${tab}${tab}}\n${tab}}\n\`\n\n`);
}

/* ****************** BUILD CLIENT MUTATIONS BELOW ****************** */

/* MAIN FUNCTION TO CONVERT TO GQL CLIENT MUTATIONS THAT CALLS ALL OTHER HELPER FUNCTIONS */
Controller.convertToGQLClientMutationsCode = (req, res, next) => {
  try {
    // GET ALL TABLES FROM res.locals.preppedForGQL
    const tables = createCombinedTables(res.locals.preppedForGQL);

    let query = "import { gql } from 'apollo-boost';\n\n";
    const exportNames = [];

    // Build mutations
    for (const tableId in tables) {
      // Build add mutations
      query += buildMutationParams(tables[tableId], 'add');
      query += buildTypeParams(tables[tableId], 'add');
      query += buildReturnValues(tables[tableId]);
      exportNames.push(`add${tables[tableId].type}Mutation`);

      // Build delete and update mutations if there is an unique id
      if (tables[tableId].fields[0]) {
        // update mutations
        query += buildMutationParams(tables[tableId], 'update');
        query += buildTypeParams(tables[tableId], 'update');
        query += buildReturnValues(tables[tableId]);
        exportNames.push(`update${tables[tableId].type}Mutation`);
        // delete mutations
        query += buildDeleteMutationParams(tables[tableId]);
        query += buildReturnValues(tables[tableId]);
        exportNames.push(`delete${tables[tableId].type}Mutation`);
      }
    }

    let endString = `export {\n`;
    exportNames.forEach((name, i) => {
      if (i === 0) {
        endString += `${tab}${name},\n`;
      } else {
        endString += `${tab}${name},\n`;
      }
    });

    // return (query += `${endString}};`);
    res.locals.GQLClientMutationsCode = query += `${endString}};`;
    return next();
  } catch (error) {
    const errObj = {
      log: `Error in server middleware @ convertToGQLClientMutationsCode: ${error}`,
      status: 400,
      message: {
        err: 'Unable to parse Graphql Client Mutations Code',
      },
    };
    return next(errObj);
  }
};

/* HELPER FUNC FOR Controller.convertToGQLClientMutationsCode */
// builds params for either add or update mutations
function buildMutationParams(table, mutationType) {
  let query = `const ${mutationType}${table.type}Mutation = gql\`\n${tab}mutation(`;

  let firstLoop = true;
  for (const fieldId in table.fields) {
    // if there's an unique id and creating an update mutation, then take in ID
    if (fieldId === '0' && mutationType === 'update') {
      if (!firstLoop) query += ', ';
      firstLoop = false;

      query += `$${table.fields[fieldId].name}: ${table.fields[fieldId].type}!`;
    }
    if (fieldId !== '0') {
      if (!firstLoop) query += ', ';
      firstLoop = false;

      query += `$${table.fields[fieldId].name}: ${checkForMultipleValues(table.fields[fieldId].multipleValues, 'front')}`;
      query += `${checkFieldType(table.fields[fieldId].type)}${checkForMultipleValues(table.fields[fieldId].multipleValues, 'back')}`;
      query += `${checkForRequired(table.fields[fieldId].required)}`;
    }
  }
  return (query += `) {\n${tab}`);
}

/* HELPER FUNC FOR Controller.convertToGQLClientMutationsCode */
// in case the inputed field type is Number, turn to Int to work with GraphQL
function checkFieldType(fieldType) {
  if (fieldType === 'Number') return 'Int';
  else return fieldType;
}

/* HELPER FUNC FOR Controller.convertToGQLClientMutationsCode */
function buildDeleteMutationParams(table) {
  const idName = table.fields[0].name;
  let query = `const delete${table.type}Mutation = gql\`\n`;
  query += `${tab}mutation($${idName}: ${table.fields[0].type}!){\n`;
  query += `${tab}${tab}delete${table.type}(${idName}: $${idName}){\n`;
  return query;
}

/* HELPER FUNC FOR Controller.convertToGQLClientMutationsCode */
function checkForMultipleValues(multipleValues, position) {
  if (multipleValues) {
    if (position === 'front') {
      return '[';
    }
    return ']';
  }
  return '';
}

/* HELPER FUNC FOR Controller.convertToGQLClientMutationsCode */
function checkForRequired(required) {
  if (required) {
    return '!';
  }
  return '';
}

/* HELPER FUNC FOR Controller.convertToGQLClientMutationsCode */
function buildTypeParams(table, mutationType) {
  let query = `${tab}${mutationType}${table.type}(`;

  let firstLoop = true;
  for (const fieldId in table.fields) {
    // if there's an unique id and creating an update mutation, then take in ID
    if (fieldId === '0' && mutationType === 'update') {
      if (!firstLoop) query += ', ';
      firstLoop = false;
      query += `${table.fields[fieldId].name}: $${table.fields[fieldId].name}`;
    }
    if (fieldId !== '0') {
      if (!firstLoop) query += ', ';
      firstLoop = false;

      query += `${table.fields[fieldId].name}: $${table.fields[fieldId].name}`;
    }
  }
  return (query += `) {\n`);
}

/* HELPER FUNC FOR Controller.convertToGQLClientMutationsCode */
function buildReturnValues(table) {
  let query = '';

  for (const fieldId in table.fields) {
    query += `${tab}${tab}${tab}${table.fields[fieldId].name}\n`;
  }

  return (query += `${tab}${tab}}\n${tab}}\n\`\n\n`);
}

module.exports = Controller;
