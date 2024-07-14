import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css"; // Import main CSS
import { Loader } from "./Loader";

const Details = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state?.diagnosticResult || null);
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const response = await axios.get('/predict');
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="App">
          <header className="App-header">
            <div className="data-container">
              <h1>Data Details</h1>
              {data ? (
                <div className="data">
                  <p>System Diagnostic Analysis Result: {data}</p>
                  {data === "healthy" && (
                    <ul className="recommendation-list">
                      <li>Maintain a balanced diet rich in fruits, vegetables, and lean proteins.</li>
                      <li>Engage in low-impact exercises like walking or swimming.</li>
                      <li>Keep a healthy weight to minimize knee strain.</li>
                      <li>Practice good posture and proper body mechanics to prevent injury.</li>
                    </ul>
                  )}
                  {data === "low severity" && (
                    <ol className="recommendation-list">
                      <li>Over-the-counter pain relievers such as aspirin or ibuprofen can alleviate mild discomfort.</li>
                      <li>Topical analgesics like lidocaine patches can provide targeted relief.</li>
                      <li>Supplements like omega-3 fatty acids or turmeric may help reduce inflammation.</li>
                      <li>Muscle relaxants like methocarbamol can ease muscle strain around the knee.</li>
                    </ol>
                  )}
                  {data === "considerable" && (
                    <ol className="recommendation-list">
                      <li>Over-the-counter pain relievers like acetaminophen (Tylenol) can help manage discomfort.</li>
                      <li>Nonsteroidal anti-inflammatory drugs (NSAIDs) like naproxen (Aleve) can reduce pain and inflammation.</li>
                      <li>Topical treatments like menthol creams or patches can offer temporary relief.</li>
                      <li>Glucosamine supplements may support joint health and aid in recovery.</li>
                    </ol>
                  )}
                  {data === "uncertain" && (
                    <ol className="recommendation-list">
                      <li>Mild pain relievers like acetaminophen (Tylenol) can be used until a clearer diagnosis is obtained.</li>
                      <li>Avoid strong prescription medications until the diagnosis is confirmed.</li>
                      <li>Topical treatments like capsaicin cream can provide temporary relief without systemic effects.</li>
                      <li>Natural remedies like arnica gel may offer mild pain relief and reduce bruising.</li>
                    </ol>
                  )}
                  {data === "high severity" && (
                    <ol className="recommendation-list">
                      <li>Consult a doctor for prescription pain relievers like oxycodone.</li>
                      <li>Anti-inflammatory drugs such as ibuprofen can help reduce swelling.</li>
                      <li>Muscle relaxants like cyclobenzaprine can ease muscle tension around the knee.</li>
                      <li>Topical analgesic creams like diclofenac gel can provide localized pain relief.</li>
                    </ol>
                  )}
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </header>
        </div>
      )}
    </>
  );
};

export default Details;
