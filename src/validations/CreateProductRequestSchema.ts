import Joi from "joi";

export interface CreateProductDto {
  name: string;
  price: number;
  categoryId: number;
  factoryId: number;
}

const CreateProductRequestSchema = Joi.object<CreateProductDto>({
  name: Joi.string().not("").required(),
  price: Joi.number().required(),
  categoryId: Joi.number().required(),
  factoryId: Joi.number().required(),
});

export default CreateProductRequestSchema;
