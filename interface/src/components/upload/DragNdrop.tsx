// Code inspired by https://medium.com/@dprincecoder/creating-a-drag-and-drop-file-upload-component-in-react-a-step-by-step-guide-4d93b6cc21e0
// (c) Prince Azubuike
import { type ChangeEvent, useRef, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button } from '@mui/material';

import { useI18nContext } from 'i18n/i18n-react';

import './drag-drop.css';

const DragNdrop = ({ onFileSelected }) => {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { LL } = useI18nContext();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
    e.target.value = ''; // this is to allow the same file to be selected again
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
    }
  };

  const handleRemoveFile = (event) => {
    event.stopPropagation();
    setFile(undefined);
  };

  const handleUploadClick = (event) => {
    event.stopPropagation();
    onFileSelected(file);
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`document-uploader ${file ? 'upload-box active' : 'upload-box'}`}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      onClick={handleBrowseClick}
    >
      <div className="upload-info">
        <CloudUploadIcon sx={{ marginRight: 4 }} color="primary" fontSize="large" />
        {/* TODO translate */}
        <p>drag and drop a file here or click to select one</p>
      </div>

      <input
        type="file"
        hidden
        onChange={handleFileChange}
        ref={inputRef}
        accept=".json,.txt,.csv,.bin"
        multiple={false}
        style={{ display: 'none' }}
      />

      {file && (
        <>
          <div className="file-info">
            <p>{file.name}</p>
          </div>
          <Box>
            <Button
              startIcon={<CancelIcon />}
              variant="outlined"
              color="error"
              onClick={(e) => handleRemoveFile(e)}
            >
              {LL.CANCEL()}
            </Button>
            <Button
              sx={{ ml: 2 }}
              startIcon={<UploadIcon />}
              variant="outlined"
              color="primary"
              onClick={handleUploadClick}
            >
              {LL.UPLOAD()}
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default DragNdrop;
