import * as Yup from "yup";

const _default = {
  addressIdentify: Yup.string().required(
    "O campo Identificação do endereço é obrigatório"
  ),
  recipientName: Yup.string().required(
    "O campo Nome do destinatário é obrigatório"
  ),
  phone: Yup.string().required("O campo telefone é obrigatório"),
  cep: Yup.string().required("O campo CEP é obrigatório"),
  neighborhood: Yup.string().required("O campo bairro é obrigatório"),
  number: Yup.string().required("O campo número é obrigatório"),
  complement: Yup.string().required("O campo complemento é obrigatório"),
  address: Yup.string().required("O campo endereço é obrigatório"),
};

export const addressValidationSchemaForm = Yup.object().shape({
  ..._default,
  state: Yup.string().required("O campo estado é obrigatório"),
  city: Yup.string().required("O campo cidade é obrigatório"),
});
export const addressValidationSchema = Yup.object().shape({
  ..._default,
  state: Yup.object().required("O campo estado é obrigatório"),
  city: Yup.object().required("O campo cidade é obrigatório"),
});
