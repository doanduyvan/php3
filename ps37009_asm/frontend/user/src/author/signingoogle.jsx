import { GoogleIcon } from "../SvgComponent";

function SignInGoogle() {


  return (
    <>
      <button className="flex justify-center items-center gap-3 border w-full p-2 rounded-lg">
        <GoogleIcon className="w-6 h-6" />
        <span>Google</span>
      </button>
    </>
  );
}

export default SignInGoogle;