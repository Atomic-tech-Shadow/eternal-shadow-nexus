import React from "react";
import styled from "styled-components";

const Button = styled.button`
    background-color: #ff4500;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #ff6347;
    }
`;

const AnimatedButton = ({ children, onClick }) => {
    return <Button onClick={onClick}>{children}</Button>;
};

export default AnimatedButton;
