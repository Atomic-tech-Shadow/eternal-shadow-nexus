import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaDownload } from "react-icons/fa";

const DownloadContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  width: 90%;
  max-width: 800px;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FileName = styled.span`
  font-size: 1.2rem;
`;

const DownloadButton = styled.a`
  color: #ff4b2b;
  text-decoration: none;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Download = () => {
  const [files, setFiles] = useState([]);
  const API_KEY = "1l5ftrilhllgwx2bo";

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `https://devuploads.com/api/file/list?key=${API_KEY}&page=1&per_page=10&public=1`
        );
        const data = await response.json();

        if (data.status === 200) {
          setFiles(data.result);
        } else {
          console.error("Erreur API:", data.msg);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <DownloadContainer>
      <Title>Téléchargements Disponibles</Title>
      <FileList>
        {files.length > 0 ? (
          files.map((file, index) =>
            file.status === 200 ? (
              <FileItem key={index}>
                <FileName>{file.name}</FileName>
                <DownloadButton
                  href={`https://devuploads.com/${file.filecode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload />
                </DownloadButton>
              </FileItem>
            ) : null
          )
        ) : (
          <p>Aucun fichier disponible.</p>
        )}
      </FileList>
    </DownloadContainer>
  );
};

export default Download;
