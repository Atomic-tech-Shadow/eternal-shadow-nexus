import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1a1a1a;
`;

const ShimmerBox = styled.div`
  width: 200px;
  height: 50px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1));
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 10px;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <ShimmerBox />
    </LoaderContainer>
  );
};

export default Loader;
