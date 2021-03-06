import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationsErrors';
import { Link, useHistory } from 'react-router-dom';

import logImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

interface ISignInFormData {
    email: string;
    password: string;
}

const SingIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: ISignInFormData) => {
        formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });

            history.push('/dashboard');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErros(err);
                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, verifique suas credências.',
            });
        }
    }, [signIn, addToast, history]);

    return (
        <Container>
            <Content>
                <img src={logImg} alt="Logo GoBaber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="Email" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <Link to="/signup">
                    <FiLogIn />
                    Criar conta
                </Link>
            </Content>
            <Background />
        </Container>
    )
}

export default SingIn;