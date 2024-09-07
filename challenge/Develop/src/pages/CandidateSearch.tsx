// import { useState, useEffect } from 'react';
// import { searchGithub, searchGithubUser } from '../api/API';

// const CandidateSearch = () => {
//   return (
//     <>
//       <h1>CandidateSearch</h1>
//       <h2>Search for Candidates</h2>
//       <button onClick={searchGithub}>Search</button>
//       <h2>Search for a Specific Candidate</h2>
//       <input type="text" />
//       <button onClick={searchGithubUser}>Search</button>
//       <h2>Results</h2>
//       <ul>
//         <li>Result 1</li>
//         <li>Result 2</li>
//         <li>Result 3</li>
//       </ul>
//     </>
//   );
// };

// export default CandidateSearch;

import { useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [results, setResults] = useState([]);
  const [specificCandidate, setSpecificCandidate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGithubSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithub();
      setResults(data);
    } catch (err) {
      setError('Error fetching candidates');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubUserSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithubUser(specificCandidate);
      setResults(data);
    } catch (err) {
      setError('Error fetching specific candidate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>CandidateSearch</h1>
      <h2>Search for Candidates</h2>
      <button onClick={handleGithubSearch}>Search</button>
      
      <h2>Search for a Specific Candidate</h2>
      <input
        type="text"
        value={specificCandidate}
        onChange={(e) => setSpecificCandidate(e.target.value)}
      />
      <button onClick={handleGithubUserSearch}>Search</button>
      
      <h2>Results</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </>
  );
};

export default CandidateSearch;

