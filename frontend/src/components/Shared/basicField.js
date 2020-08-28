import styled from 'styled-components';
import React from 'react';

//Style component

const BasicTextField = styled.input`
    width: 340px;
    height: 52px;
    border: 1px solid #EBEBEB;
    background-color: white;
    padding-left: 23px;
    border-radius: 3px;
`;

//React component

const BasicField = (props) => {
    return (
    <BasicTextField placeholder={props.inputTitle} />
    )
}
export default BasicField
