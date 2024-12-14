import { useState } from 'react'
import './App.css'
import Routes from './Routes'
import BannerToast from './Components/Toast';

function App() {
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });

  const showToast = (message, type = "info") => {
    setToast({ visible: true, message, type });

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "info" });
    }, 3000);
  };


  return (
    <>
      <div>
        {toast.visible && (
          <BannerToast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ visible: false, message: "", type: "info" })}
          />
        )}
        <Routes showToast={showToast} />
      </div>
    </>
  )
}

export default App
