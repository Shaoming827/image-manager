import React, { useState } from 'react';

function downloadBase64Image(base64Data, setAssetUrl,fileName) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  const byteArray = new Uint8Array(byteArrays);
  const blob = new Blob([byteArray], { type: 'image/png' });
  const url = URL.createObjectURL(blob);
  console.log("Blog ready,start preview")
  //preview
  const reader = new FileReader();
  reader.onload = function (event) {
    const dataURL = event.target.result;
    const img = new Image();
    img.src = dataURL;
    setAssetUrl(dataURL)
  };
  reader.readAsDataURL(blob);
  console.log("Preview done, start download");
  //download
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  console.log("Download done");
  URL.revokeObjectURL(url);
}


function Download() {
  const [assetId, setAssetId] = useState('');
  const [assetUrl, setAssetUrl] = useState('');

  const handleInputChange = (e) => {
    setAssetId(e.target.value);
  };

  const handleDownload = async () => {
    try {
      const apiUrl = `https://project-02-server-shaomingxu.cs-310-spring-2023.repl.co/download/${assetId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      const image_encoding = data.data;
      const image_name = data.asset_name;
      downloadBase64Image(image_encoding, setAssetUrl,image_name);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  return (
    <div>
      <input type="text" value={assetId} onChange={handleInputChange} placeholder="Enter Asset ID" />
      <button onClick={handleDownload}>Download Asset</button>

      {assetUrl && (
        <div>
          <h3>Asset Preview</h3>
          <img src={assetUrl} alt="Asset" style={{width:'100%',height:'auto'}}/>
        </div>
      )}
    </div>
  );
}

export default Download;
