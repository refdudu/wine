import { Dropdown } from "@/components/Dropdown";
import { Form } from "@/components/Form";
import { Layout } from "@/components/Layout";
import classNames from "classnames";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  name: string;
  country: string;
  quantity: string;
  price: string;
  partnerPrice: string;
  description: string;
}

export function ProductPage() {
  const [isOpenedCountryDropdown, setIsOpenedCountryDropdown] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    clearErrors,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <Layout>
      {/* <div className="w-full py-10 mx-auto px-3 overflow-auto h-full" id='products-grid'> */}
      <div className="py-10 max-w-[1120px] flex justify-center mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col bg-white p-4 relative h-32">
            <input
              id="name"
              className="border-b border-custom-gray focus:border-custom-tannat p-2 outline-none peer"
              {...register("name", {
                required: true,
              })}
            />
            <Form.Label hasValue={Boolean(watch("name"))} htmlFor="name">
              Nome:
            </Form.Label>
            {errors.name && <span>É obrigatório</span>}
          </div>
          <div className="flex flex-col bg-white p-4 relative h-32">
            <Form.Input
              id="name"
              {...register("name", {
                required: true,
              })}
            />
            <Form.Label hasValue={Boolean(watch("name"))} htmlFor="name">
              Nome:
            </Form.Label>
            {errors.name && <span>É obrigatório</span>}
          </div>
          <div className="flex flex-col bg-white p-4 relative h-32">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Dropdown
                  //   selectedOption={}
                  onChange={({ id }) => setValue(field.name, id)}
                  options={[
                    {
                      id: "1",
                      label: "Brasil",
                    },
                    {
                      id: "2",
                      label: "Estados Unidos",
                    },
                  ]}
                />
              )}
            />

            {errors.country && <span>É obrigatório</span>}
          </div>
          <div className="flex flex-col bg-white p-4 relative h-32">
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Dropdown
                  //   selectedOption={}
                  onChange={({ id }) => setValue(field.name, id)}
                  options={[
                    {
                      id: "1",
                      label: "187.5",
                    },
                    {
                      id: "2",
                      label: "375",
                    },
                    {
                      id: "3",
                      label: "750",
                    },
                    {
                      id: "4",
                      label: "1500",
                    },
                    {
                      id: "5",
                      label: "3000",
                    },
                    {
                      id: "6",
                      label: "4500",
                    },
                    {
                      id: "7",
                      label: "6000",
                    },
                    {
                      id: "8",
                      label: "9000",
                    },
                  ]}
                />
              )}
            />

            {errors.country && <span>É obrigatório</span>}
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
      {/* </div> */}
    </Layout>
  );
}
