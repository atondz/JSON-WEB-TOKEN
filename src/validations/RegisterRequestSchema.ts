import Joi from "joi";

export interface RegisterRequestDto {
    username: string;
    password: string;
    phone_number: string;
    address: string;
  }

const RegisterRequestSchema = Joi.object<RegisterRequestDto>({
    username: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.string(),
    address: Joi.string()
})

export default RegisterRequestSchema;