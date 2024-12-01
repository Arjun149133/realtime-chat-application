import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  return (
    <div className=" grid grid-cols-12 h-screen">
      <div className=" col-span-4 ">
        <h1 className=" md:text-xl font-normal m-2 mx-4">Chat-App</h1>
        <div className=" flex flex-col items-center space-y-7 justify-center my-10">
          <h1 className=" md:text-2xl font-semibold">Sign In</h1>
          <RegisterForm />
        </div>
      </div>
      <div className=" col-span-8 bg-gray-900"> </div>
    </div>
  );
};

export default Register;
