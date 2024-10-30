import Joi from "joi";

export interface LoginRequestDto {
    username: string;
    password: string;
}

const LoginRequestSchema = Joi.object<LoginRequestDto>({
    username: Joi.string().not('').required(),
    password: Joi.string().required()
})

export default LoginRequestSchema;