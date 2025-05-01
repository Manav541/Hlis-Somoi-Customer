export const regex = {
    mobile: /^[0-9]{8,15}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
    email: /^[a-z._][a-z0-9._]+@[a-z0-9.]+\.[a-z]{2,5}$/,
    fullName: /^([a-zA-Z]+\s?)*$/,
    validFullName: /^[A-Za-z]+ [A-Za-z]+$/,
    state: /^([a-zA-Z]+\s?)*$/,
    number: /^[0-9]*$/,
    username: /^[A-Za-z0-9_.]+$/,
    address: /^([a-zA-Z0-9\,\-\.\/]+\s?)*$/,
    firstname: /^[a-zA-Z]*$/,
    lastname: /^[a-zA-Z]*$/,
    numberCharacter: /^[a-zA-Z0-9]*$/,
    indianNumberPlate: /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{4}$/,
    bankName: /^([a-zA-Z\-\.\&]+\s?)*$/,
    zero: /^0+$/,
  };
  