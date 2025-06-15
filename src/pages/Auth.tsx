
import ProfileAuthForm from "@/components/ProfileAuthForm";

const Auth = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Authentication</h1>
        <ProfileAuthForm />
      </div>
    </div>
  );
};

export default Auth;
