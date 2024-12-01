import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { Label } from "./ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "should be of minimum length of 5 characters",
  }),
  password: z.string().min(5, {
    message: "should be of minimum length of 5 characters",
  }),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Arjun",
      password: "password",
    },
  });

  const handleRegister: SubmitHandler<z.infer<typeof formSchema>> = async (
    data
  ) => {
    try {
      await new Promise(() => {
        setTimeout(() => {
          console.log(data);
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className=" w-3/4 space-y-4">
      <div className=" space-y-1">
        <Label className=" font-normal">
          {" "}
          <span className=" text-red-200">*</span> Username
        </Label>
        <Input {...register("username", { required: true })} className=" p-5" />
        {errors.username && (
          <span className=" font-normal text-red-400">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className=" space-y-1">
        <Label className=" font-normal">
          <span className=" text-red-200">*</span> Password
        </Label>
        <Input {...register("password", { required: true })} className=" p-5" />
        {errors.password && (
          <span className=" font-normal text-red-400">
            {errors.password.message}
          </span>
        )}
      </div>
      <div>
        <Button className=" bg-blue-700 flex justify-center w-full hover:bg-blue-600">
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
