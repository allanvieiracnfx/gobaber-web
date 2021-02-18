import React from 'react';
import { Container } from './styles';
import { IToastMessage } from '../../hooks/ToastContext';
import Toast from './Toast';
import { useTransition } from 'react-spring';

interface IToastContainerProps {
    messages: IToastMessage[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
    const messagesWithTransitions = useTransition(
        messages,
        message => message.id,
        {
            from: { right: '-120%', opacity: 0 },
            enter: { right: '0%', opacity: 1 },
            leave: { right: '-120%', opacity: 0 },
        }
    )
    return (
        <Container>
            {messagesWithTransitions.map(({ item, key, props }) => (
                <Toast key={key} style={props}  message={item}></Toast>
            ))}

        </Container>
    )
}

export default ToastContainer;