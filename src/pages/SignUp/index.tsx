import React, {useCallback,useRef} from 'react';
import { FiMail, FiLock, FiUser, FiArrowDownLeft } from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import { Form } from '@unform/web'
import * as Yup from 'yup';
import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErros from '../../utils/getValidationsErros';

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    console.log(formRef);
    const handleSubmit = useCallback(async (data: object) => {
        try {

            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required().email('E-mail obrigatório'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data,{
                abortEarly: false,
            });
        } catch (err) {

            const errors = getValidationErros(err)
            formRef.current?.setErrors(errors)
        }
    },[])
    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />

                    <Button type="submit">Cadastrar</Button>


                </Form>

                <a href="signup">
                    <FiArrowDownLeft />
                    Voltar para logon
                </a>
            </Content>


        </Container>
    );
}

export default SignUp;