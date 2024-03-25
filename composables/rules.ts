type Rule = (input: string) => true | string;

export const phoneRules: Ref<Rule[]> = ref([
  (phone: string) => {
    if (!phone || phone.trim() === "") {
      return "Phone number cannot be empty!";
    }
    const regex = /^\d{10}$/;
    return regex.test(phone)
      ? true
      : "Wrong phone number format! Please use a 10-digit number.";
  },
]);

export const nameRules: Ref<Rule[]> = ref([
  (name: string) => {
    if (!name || name.trim() === "") {
      return "Name cannot be empty!";
    }
    const regex = /[^a-zA-Z\u00C0-\u1EF9\s]/;
    return regex.test(name) ? "Wrong name format!" : true;
  },
]);

export const dateRules: Ref<Rule[]> = ref([
  (date: string) => {
    if (!date || date.trim() === "") {
      return "Date cannot be empty!";
    }
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(date)
      ? true
      : "Wrong date format! Please use 'yyyy-mm-dd'.";
  },
]);

export const nonEmptyRules: Ref<Rule[]> = ref([
  (name: string) => {
    if (!name || name.trim() === "") {
      return "Name cannot be empty!";
    }
    return true;
  },
]);
