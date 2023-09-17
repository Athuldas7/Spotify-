import { useCallback, useState } from 'react';
import './App.scss';
import { ProfileBar, SongsLists } from './modules';

function App() {
  const [accentData, setAccentData] = useState(null);

  const handleAccentData = useCallback((data) => {
    setAccentData(data);
}, []);


  return (
    <div className={`App${accentData ? ' with-transition' : ''}`} style={{ background: `linear-gradient(108deg, ${accentData} 2.46%, #000 99.84%)` }}>
      <ProfileBar />
      <SongsLists onAccentData={handleAccentData} />
    </div>
  );
}

export default App;
