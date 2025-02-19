import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { getFileList } from "../api/devuploads";

const DownloadContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff4c29;
  margin-bottom: 20px;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 800px;
`;

const FileItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 75, 43, 0.2);
  }
`;

const FileName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const DownloadButton = styled.a`
  background: #ff4c29;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  &:hover {
    background: #d93d1f;
    transform: scale(1.05);
  }
`;

const Download = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchFiles() {
      const data = await getFileList();
      if (data && data.files) {
        setFiles(data.files);
      }
    }
    fetchFiles();
  }, []);

  return (
    <DownloadContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Title>📂 Téléchargements</Title>
      <FileList>
        {files.length > 0 ? (
          files.map((file) => (
            <FileItem key={file.file_code} whileHover={{ scale: 1.02 }}>
              <FileName>{file.file_name}</FileName>
              <DownloadButton href={file.download_url} target="_blank">
                <FaDownload /> Télécharger
              </DownloadButton>
            </FileItem>
          ))
        ) : (
          <p>Aucun fichier disponible pour le moment.</p>
        )}
      </FileList>
    </DownloadContainer>
  );
};

export default Download;
