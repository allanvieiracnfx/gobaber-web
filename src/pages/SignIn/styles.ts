import styled from 'styled-components';
import signInBackground from '../../assets/sign-in-background.png';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;

`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 700px;

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1{
            margin-bottom: 24px;
        }
        
        a {
            color: #F4EDE8; 
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover{
                color: ${shade(0.2, '#F4EDE8')};
            }
        }
    }

    > a {
        color: #ff9000;
        display: flex;
        align-items: center;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        &:hover{
            color: ${shade(0.2, '#ff9000')};
        }

        svg {
            margin-right: 16px;
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signInBackground}) no-repeat center;
    background-size: cover;
`;