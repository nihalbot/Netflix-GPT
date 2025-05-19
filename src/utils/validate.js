export const cheekValidEmail = (email)=>{
    console.log(email.length);
  const isEmailValid = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(
    email
  );

  if (email.length == 0) return "Please enter a valid email or phone number.";
  if(!isEmailValid) return "Email is not valid";
 
}

export const cheekValidPassword = (password)=>{
    const isPasswordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (password.length == 0)
      return "Your password must contain 8 characters with capital letter and special chareter.";
    if (!isPasswordValid) return "Password is not valid";

    return null;
}

export const cheekValidFullName = (name) => {
  const fullName = /^[A-Z][a-z]+(?: [A-Z][a-z]+)+$/.test(name);
  if (fullName.length == 0)
    return "Enter Name";
  if (!fullName) return "Enter Full Name";

  return null;
};