import React, { useReducer } from 'react';
import styled from 'styled-components';
import reducer, { initialState } from './reducer';
import Table from './components/Table';
import { Context } from './context';

const AppStyle = styled.div`
  padding: 1rem;
  text-align: center;
`;

const DataSection = styled.div`
  display: flex;
  padding: 1rem;
`;

const JsonSection = styled.div`
  padding: 1rem 5rem;
`;

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <AppStyle>
        <Table />
      </AppStyle>
      <DataSection>
        <JsonSection>
          <h3>Row data</h3>
          <pre>{JSON.stringify(state.rowData, null, 2)}</pre>
        </JsonSection>
        <JsonSection>
          <h3>Column data</h3>
          <pre>{JSON.stringify(state.columnData, null, 2)}</pre>
        </JsonSection>
      </DataSection>
    </Context.Provider>
  );
};

export default App;
