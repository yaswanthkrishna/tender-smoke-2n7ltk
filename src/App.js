import React, { useEffect, useState } from "react";

function App() {
  const [flag, setFlag] = useState("");
  const [displayedFlag, setDisplayedFlag] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetch(
        "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/727562"
      )
        .then((response) => response.text())
        .then((fetchedFlag) => {
          setFlag(fetchedFlag);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching the flag:", error);
          setIsLoading(false);
        });
    }, 1000);

    return () => clearTimeout(delayFetch);
  }, []);

  useEffect(() => {
    if (!isLoading && flag) {
      const displayNextCharacter = (index) => {
        if (index < flag.length) {
          setDisplayedFlag((prev) => [...prev, flag.charAt(index)]);
          setTimeout(() => displayNextCharacter(index + 1), 500);
        }
      };
      displayNextCharacter(0);
    }
  }, [isLoading, flag]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {displayedFlag.map((char, idx) => (
        <li key={idx}>{char}</li>
      ))}
    </ul>
  );
}

export default App;

/*
const urlCharacters = [];

document.querySelectorAll('code[data-class^="23"]').forEach((codeElement) => {
  const divElement = codeElement.querySelector('div[data-tag$="93"]');
  
  if (divElement) {
    const spanElement = divElement.querySelector('span[data-id*="21"]');
    
    if (spanElement) {
      const charElement = spanElement.querySelector('i.char');
      
      if (charElement && charElement.getAttribute("value")) {
        urlCharacters.push(charElement.getAttribute("value"));
      }
    }
  }
});

const hiddenUrl = urlCharacters.join('');
console.log("Hidden URL:", hiddenUrl);
*/
