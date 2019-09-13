/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import api from './api';
import { useAsync } from 'react-async';
import usePageAddress from './usePageAddress';

const App: React.FC = () => {
  const [query, setQuery] = useState();

  const ac = useAsync({
    deferFn: query => api.get(`/autocomplete?query=${query}`),
  });

  const status = useAsync({
    deferFn: place => api.get(`/status/${place}`),
  });

  if (
    ac.isFulfilled &&
    ac.data.data &&
    ac.data.data.suggestions.length === 1 &&
    !status.isLoading &&
    !status.isFulfilled
  ) {
    status.run(ac.data.data.suggestions[0].id);
  }

  const preAddress = usePageAddress();
  if (preAddress && ac.counter === 0) {
    console.warn({ preAddress });
    ac.run(preAddress);
  }

  return (
    <div className="App">
      <header className="App-header">
        {!preAddress && (
          <input value={query} onChange={e => setQuery(e.target.value)} />
        )}

        {!ac.isLoading && !ac.isFulfilled && ac.counter === 0 && (
          <button onClick={() => ac.run(query)}>🏃‍♂️💨</button>
        )}

        {ac.isFulfilled &&
          status.counter === 0 &&
          ac.data.data.suggestions.map(d => (
            <p onClick={() => status.run(d.id)}>{d.formattedAddress}</p>
          ))}

        {!!status.data && (
          <div>
            {status.data.data.addressDetail.techType}
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
