import * as Yup from "yup";

export const orderSchema = Yup.object().shape({
  userUid: Yup.string().required("O usuário é obrigatório"),
  items: Yup.array(
    Yup.object().shape({
      productId: Yup.string().required("O ID do produto é obrigatório"),
      amount: Yup.number()
        .min(1, "A quantidade deve ser pelo menos 1")
        .required("A quantidade é obrigatória"),
    })
  ),
  
});
