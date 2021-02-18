import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationsErrors';
import { Link, useHistory } from 'react-router-dom';
import logImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';

interface ISignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SingUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: ISignUpFormData) => {
        formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            console.log('aquiiiiii');

            await api.post('/users', data);

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no GoBaber',
            });

            history.push('/');

        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErros(err);
                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer cadastro.',
            });

        }
    }, [addToast, history]);

    return (
        <Container>
            <Background />

            <Content>
                <img src={logImg} alt="Logo GoBaber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="Email" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Cadastrar</Button>

                </Form>

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para logon
                </Link>
            </Content>
        </Container>
    )
}

export default SingUp;